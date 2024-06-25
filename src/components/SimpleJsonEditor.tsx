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
): { color: string; emoji: string } => {
  switch (state.state) {
    case SimpleJsonEditorStates.INITIAL:
      return { color: 'rgb(113 113 122)', emoji: '🤘' }
    case SimpleJsonEditorStates.VALID:
      return { color: 'rgb(132 204 22)', emoji: '👍' }
    case SimpleJsonEditorStates.INVALID:
      return { color: 'rgb(239 68 68)', emoji: '👎' }
  }
}

export const SimpleJsonEditor = () => {
  const [state, dispatch] = useReducer(simpleJsonEditorReducer, {
    state: SimpleJsonEditorStates.INITIAL,
    value: '',
  })

  const { color, emoji } = getPresentationStyle(state)

  const onPrettyButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_PRETTY_BUTTON_CLICK,
    })

    toast('Prettified!', { icon: '💅' })
  }, [])

  const onCompressButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_COMPRESS_BUTTON_CLICK,
    })

    toast('Compressed!', { icon: '🤖' })
  }, [])

  const onCopyButtonClickedHandler = useCallback(() => {
    navigator.clipboard.writeText(state.value)

    toast.success('Copied to clipboard!')
  }, [state])

  const onClearButtonClickedHandler = useCallback(() => {
    dispatch({
      action: SimpleJsonEditorActions.ON_CLEAR_BUTTON_CLICK,
    })
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-amber-200 p-10">
      <p className="mb-7 text-center text-6xl">{emoji}</p>
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
      <div className="grid grid-flow-row sm:grid-flow-col gap-4 sm:max-w-[400px] my-4">
        <SimpleJsonEditorButton
          text="Pretty"
          disabled={state.state !== SimpleJsonEditorStates.VALID}
          onClick={() => onPrettyButtonClickedHandler()}
        />
        <SimpleJsonEditorButton
          text="Compress"
          disabled={state.state !== SimpleJsonEditorStates.VALID}
          onClick={() => onCompressButtonClickedHandler()}
        />
        <SimpleJsonEditorButton
          text="Copy"
          disabled={state.state !== SimpleJsonEditorStates.VALID}
          onClick={() => onCopyButtonClickedHandler()}
        />
        <SimpleJsonEditorButton
          text="Clear"
          disabled={false}
          onClick={() => onClearButtonClickedHandler()}
        />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

const SimpleJsonEditorButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string
  disabled: boolean
  onClick?: () => void
}) => (
  <button
    className="bg-blue-500 text-white active:bg-blue-500 hover:bg-blue-500 disabled:bg-blue-400 disabled:text-gray-50 font-bold py-2 px-4 border-b-4 border-r-4 border-blue-700 hover:border-blue-500 rounded"
    aria-label={text}
    disabled={disabled}
    onClick={() => onClick?.()}
  >
    {text}
  </button>
)
