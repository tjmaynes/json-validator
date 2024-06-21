import { useReducer } from 'react'
import { JsonEditor } from '@/components/JsonEditor.tsx'

const isValidJson = (rawValue: string): boolean => {
  try {
    JSON.parse(rawValue)
    return true
  } catch {
    return false
  }
}

enum JsonValidatorStateType {
  INITIAL,
  VALID,
  INVALID,
}

type JsonValidatorState =
  | {
      type: JsonValidatorStateType.INITIAL
      value: string
    }
  | {
      type: JsonValidatorStateType.VALID
      value: string
    }
  | {
      type: JsonValidatorStateType.INVALID
      value: string
    }

enum JsonValidatorActionType {
  ON_TYPING,
}

type JsonValidatorAction = {
  type: JsonValidatorActionType.ON_TYPING
  entry: string
}

const jsonValidatorReducer = (
  state: JsonValidatorState,
  action: JsonValidatorAction
): JsonValidatorState => {
  switch (action.type) {
    case JsonValidatorActionType.ON_TYPING: {
      if (action.entry.length <= 0)
        return {
          type: JsonValidatorStateType.INITIAL,
          value: '',
        }
      return isValidJson(action.entry)
        ? {
            type: JsonValidatorStateType.VALID,
            value: state.value,
          }
        : {
            type: JsonValidatorStateType.INVALID,
            value: state.value,
          }
    }
  }
}

const getPresentationStyle = (
  state: JsonValidatorState
): { color: string; messageText?: string } => {
  switch (state.type) {
    case JsonValidatorStateType.INITIAL:
      return { color: 'white' }
    case JsonValidatorStateType.VALID:
      return { color: 'green', messageText: 'Is valid' }
    case JsonValidatorStateType.INVALID:
      return { color: 'red', messageText: 'Is not valid' }
  }
}

export const JsonValidationEditor = () => {
  const [state, dispatch] = useReducer(jsonValidatorReducer, {
    type: JsonValidatorStateType.INITIAL,
    value: '',
  })

  const { color, messageText } = getPresentationStyle(state)

  return (
    <div>
      <JsonEditor
        placeholder="Type or paste your json here..."
        value={state.value}
        onChange={(entry: string) =>
          dispatch({
            type: JsonValidatorActionType.ON_TYPING,
            entry,
          })
        }
        cssAttributes={{ borderColor: color }}
      />
      {messageText && <p>{messageText}</p>}
    </div>
  )
}
