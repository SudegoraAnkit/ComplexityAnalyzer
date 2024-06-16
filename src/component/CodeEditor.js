import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike'; // For Java, C, C++
import 'codemirror/mode/python/python'; // For Python
import 'codemirror/mode/javascript/javascript'; // For JavaScript
import 'codemirror/mode/ruby/ruby'; // For Ruby
import 'codemirror/mode/go/go'; // For Go
import 'codemirror/mode/swift/swift'; // For Swift
import 'codemirror/mode/rust/rust'; // For Rust
import 'codemirror/mode/php/php'; // For PHP
import 'codemirror/mode/shell/shell'; // For Shell

const CodeEditor = ({ value, onChange, language }) => {
  const getMode = () => {
    switch (language) {
      case 'java':
        return 'text/x-java';
      case 'python':
        return 'python';
      case 'c':
        return 'text/x-csrc';
      case 'cpp':
        return 'text/x-c++src';
      case 'javascript':
        return 'javascript';
      case 'ruby':
        return 'ruby';
      case 'go':
        return 'go';
      case 'swift':
        return 'swift';
      case 'rust':
        return 'rust';
      case 'php':
        return 'php';
      case 'shell':
        return 'shell';
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
