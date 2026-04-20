import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded-md transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-md transition-colors">
          <Play className="w-3.5 h-3.5" />
          <span>在SOLO中运行</span>
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed">
        <code
          className="language-python"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
