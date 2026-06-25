import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function CodeEditor({ value, onChange, readOnly = false, height = "100%", className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <CodeMirror
        value={value}
        height={height}
        extensions={[json()]}
        onChange={onChange}
        readOnly={readOnly}
        theme="dark"
        className="text-sm"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          bracketMatching: true,
          closeBrackets: true,
          foldGutter: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}
