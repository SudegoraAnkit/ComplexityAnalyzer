import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike'; // For Java and C-like languages
import 'codemirror/mode/python/python'; // For Python

const CodeEditor = ({ value, onChange, language }) => {
  const getMode = () => {
    switch (language) {
      case 'java':
        return 'text/x-java';
      case 'python':
        return 'python';
      case 'c':
        return 'text/x-csrc';
      default:
        return 'javascript';
    }
  };

  return (
    <div className="code-editor">
      <CodeMirror
        value={value}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        options={{
          mode: getMode(),
          theme: 'material',
          lineNumbers: true,
          autofocus: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
