import { CSSProperties } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'

type JsonEditorProps = {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  cssAttributes?: CSSProperties
}

export const JsonEditor = ({
  value,
  onChange,
  placeholder,
  cssAttributes,
}: JsonEditorProps) => {
  const borderColor =
    cssAttributes?.borderColor !== undefined
      ? `border-${cssAttributes?.borderColor}-500`
      : ''

  return (
    <>
      <CodeEditor
        className={`bg-amber-100 p-6 text-base w-[800px] h-[600px] border-4 overflow-scroll ${borderColor} rounded`}
        value={value}
        language="json"
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </>
  )
}
