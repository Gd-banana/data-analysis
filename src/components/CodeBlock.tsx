import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';
import OnlineCodeEditor from './OnlineCodeEditor';

hljs.registerLanguage('python', python);

interface CodeBlockProps {
  code: string;
  language?: string;
  showEditor?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', showEditor = false }) => {
  const [copied, setCopied] = useState(false);
  const [showInlineEditor, setShowInlineEditor] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightedCode = hljs.highlight(code, { language }).value;

  if (showEditor || showInlineEditor) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">代码示例</span>
          </div>
        </div>
        <OnlineCodeEditor initialCode={code} />
      </div>
    );
  }

  return (
    <div className="relative group mb-6">
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded-md transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
        <button
          onClick={() => setShowInlineEditor(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-md transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>在编辑器中运行</span>
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed">
        <code
          className="language-python"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
      {showInlineEditor && (
        <div className="mt-4">
          <OnlineCodeEditor initialCode={code} />
          <button
            onClick={() => setShowInlineEditor(false)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            收起编辑器
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
