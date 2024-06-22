import { useCallback, useReducer } from 'react'
import { JsonEditor } from '@/components/JsonEditor.tsx'
import { isValidJson, prettifyJson } from '@/utils/json-utils.ts'

enum SimpleJsonEditorStates {
  INITIAL,
  VALID,
  INVALID,
  FORMATTING,
}

type SimpleJsonEditorState =
  | {
      state: SimpleJsonEditorStates.INITIAL
      value: string
    }
  | {
      state: SimpleJsonEditorStates.VALID
      formatted?: boolean
      value: string
    }
  | {
      state: SimpleJsonEditorStates.INVALID
      value: string
    }

enum SimpleJsonEditorActions {
  ON_TYPING,
  ON_FORMAT_BUTTON_CLICK,
}

type SimpleJsonEditorAction =
  | {
      action: SimpleJsonEditorActions.ON_TYPING
      entry: string
    }
  | {
      action: SimpleJsonEditorActions.ON_FORMAT_BUTTON_CLICK
      value: string
    }

const simpleJsonEditorReducer = (
  _: SimpleJsonEditorState,
  action: SimpleJsonEditorAction
): SimpleJsonEditorState => {
  switch (action.action) {
    case SimpleJsonEditorActions.ON_TYPING: {
      if (action.entry.length <= 0)
        return {
          state: SimpleJsonEditorStates.INITIAL,
          value: '',
        }
      return isValidJson(action.entry)
        ? {
            state: SimpleJsonEditorStates.VALID,
            value: action.entry,
          }
        : {
            state: SimpleJsonEditorStates.INVALID,
            value: action.entry,
          }
    }
    case SimpleJsonEditorActions.ON_FORMAT_BUTTON_CLICK:
      return {
        state: SimpleJsonEditorStates.VALID,
        value: prettifyJson(action.value),
      }
  }
}

const getPresentationStyle = (
  state: SimpleJsonEditorState
): { color: string } => {
  switch (state.state) {
    case SimpleJsonEditorStates.INITIAL:
      return { color: 'rgb(113 113 122)' }
    case SimpleJsonEditorStates.VALID:
      return { color: 'rgb(132 204 22)' }
    case SimpleJsonEditorStates.INVALID:
      return { color: 'rgb(239 68 68)' }
  }
}

export const SimpleJsonEditor = () => {
  const [state, dispatch] = useReducer(simpleJsonEditorReducer, {
    state: SimpleJsonEditorStates.INITIAL,
    value: '',
  })

  const { color } = getPresentationStyle(state)

  const onCopyButtonClickedHandler = useCallback(() => {
    navigator.clipboard.writeText(state.value)

    // TODO: show toast?
  }, [state])

  return (
    <div className="flex flex-col w-full">
      <JsonEditor
        placeholder="Type or paste your json here..."
        value={state.value}
        onChange={(entry: string) =>
          dispatch({
            action: SimpleJsonEditorActions.ON_TYPING,
            entry,
          })
        }
        cssAttributes={{ borderColor: color }}
      />
      {state.state !== SimpleJsonEditorStates.INITIAL && (
        <div className="flex items-center">
          <button
            aria-label="Pretty"
            disabled={state.state !== SimpleJsonEditorStates.VALID}
            onClick={() =>
              dispatch({
                action: SimpleJsonEditorActions.ON_FORMAT_BUTTON_CLICK,
                value: state.value,
              })
            }
          >
            Pretty
          </button>
          <button
            aria-label="Copy"
            disabled={state.state !== SimpleJsonEditorStates.VALID}
            onClick={() => onCopyButtonClickedHandler()}
          >
            Copy
          </button>
          <ValidationStatus {...state} />
        </div>
      )}
    </div>
  )
}

const ValidationStatus = ({
  state,
}: {
  state:
    | SimpleJsonEditorStates.VALID
    | SimpleJsonEditorStates.INVALID
    | SimpleJsonEditorStates.FORMATTING
}) => (
  <p className="text-6xl">
    {state === SimpleJsonEditorStates.VALID ? '👍' : '👎'}
  </p>
)
