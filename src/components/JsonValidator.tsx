import { useReducer } from 'react'

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
      value: ''
    }
  | {
      type: JsonValidatorStateType.VALID
      value: string
      message: 'Is valid'
    }
  | {
      type: JsonValidatorStateType.INVALID
      value: string
      message: 'Is not valid'
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
      return isValidJson(action.entry)
        ? {
            type: JsonValidatorStateType.VALID,
            value: state.value,
            message: 'Is valid',
          }
        : {
            type: JsonValidatorStateType.INVALID,
            value: state.value,
            message: 'Is not valid',
          }
    }
  }
}

const JsonValidator = () => {
  const [state, dispatch] = useReducer(jsonValidatorReducer, {
    type: JsonValidatorStateType.INITIAL,
    value: '',
  })

  return (
    <form>
      <label htmlFor="json-validator-input">Enter your json:</label>
      <input
        type="text"
        id="json-validator-input"
        value={state.value}
        onChange={(e) =>
          dispatch({
            type: JsonValidatorActionType.ON_TYPING,
            entry: e.target.value,
          })
        }
      />
      {state.type !== JsonValidatorStateType.INITIAL ? (
        <p>{state.message}</p>
      ) : (
        <></>
      )}
    </form>
  )
}

export default JsonValidator
