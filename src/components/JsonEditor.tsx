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
  return (
    <CodeEditor
      className={`bg-amber-100 text-base h-[600px] border-8 rounded-xl`}
      value={value}
      language="json"
      aria-label={placeholder}
      placeholder={placeholder}
      onPaste={(e) => onChange?.(e.clipboardData.getData('Text'))}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        ...cssAttributes,
        overflow: 'scroll',
        fontFamily:
          'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  )
}
