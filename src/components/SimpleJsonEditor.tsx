import { useCallback, useReducer } from 'react'
import { JsonEditor } from '@/components/JsonEditor.tsx'
import { compressJson, isValidJson, prettifyJson } from '@/utils/json-utils.ts'
import toast, { Toaster } from 'react-hot-toast'

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
  ON_PRETTY_BUTTON_CLICK,
  ON_COMPRESS_BUTTON_CLICK,
  ON_CLEAR_BUTTON_CLICK,
}

type SimpleJsonEditorAction =
  | {
      action: SimpleJsonEditorActions.ON_TYPING
      entry: string
    }
  | {
      action: SimpleJsonEditorActions.ON_PRETTY_BUTTON_CLICK
    }
  | {
      action: SimpleJsonEditorActions.ON_COMPRESS_BUTTON_CLICK
    }
  | {
      action: SimpleJsonEditorActions.ON_CLEAR_BUTTON_CLICK
    }

const simpleJsonEditorReducer = (
  state: SimpleJsonEditorState,
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
    case SimpleJsonEditorActions.ON_PRETTY_BUTTON_CLICK:
      return {
        state: SimpleJsonEditorStates.VALID,
        value: prettifyJson(state.value),
      }
    case SimpleJsonEditorActions.ON_COMPRESS_BUTTON_CLICK:
      return {
        state: SimpleJsonEditorStates.VALID,
        value: compressJson(state.value),
      }
    case SimpleJsonEditorActions.ON_CLEAR_BUTTON_CLICK:
      return {
        state: SimpleJsonEditorStates.INITIAL,
        value: '',
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

  const onPrettyButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_PRETTY_BUTTON_CLICK,
    })

    toast('Prettified')
  }, [])

  const onCompressButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_COMPRESS_BUTTON_CLICK,
    })

    toast('Compressed')
  }, [])

  const onCopyButtonClickedHandler = useCallback(() => {
    navigator.clipboard.writeText(state.value)

    toast.success('Copied to clipboard!')
  }, [state])

  const onClearButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_CLEAR_BUTTON_CLICK,
    })

    toast('Cleared')
  }, [])

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
            onClick={() => onPrettyButtonClickedHandler()}
          >
            Pretty
          </button>
          <button
            aria-label="Compress"
            disabled={state.state !== SimpleJsonEditorStates.VALID}
            onClick={() => onCompressButtonClickedHandler()}
          >
            Compress
          </button>
          <button
            aria-label="Copy"
            disabled={state.state !== SimpleJsonEditorStates.VALID}
            onClick={() => onCopyButtonClickedHandler()}
          >
            Copy
          </button>
          <button
            aria-label="Clear"
            disabled={state.state !== SimpleJsonEditorStates.VALID}
            onClick={() => onClearButtonClickedHandler()}
          >
            Clear
          </button>
          <ValidationStatus {...state} />
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
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
