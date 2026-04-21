import { useEffect, useRef, useState } from 'react'
import { Copy, Play, Check, RotateCw } from 'lucide-react'
import hljs from 'highlight.js'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('python', python)

interface CodeBlockProps {
  code: string
  language?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false)
  const [editorCode, setEditorCode] = useState(code)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [pyodide, setPyodide] = useState<any>(null)
  const [error, setError] = useState<string>('')

  // 加载 Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
        });
        // 安装必要的包
        await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);
        setPyodide(pyodide);
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
      }
    };

    if (typeof (window as any).loadPyodide === 'function') {
      loadPyodide();
    } else {
      // 动态加载 Pyodide 脚本
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
      script.onload = loadPyodide;
      document.body.appendChild(script);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(editorCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    if (!pyodide) {
      setError('Pyodide 加载中，请稍后再试');
      return;
    }

    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      // 重定向 stdout
      pyodide.setStdout({ write: (text: string) => setOutput(prev => prev + text) });
      pyodide.setStderr({ write: (text: string) => setError(prev => prev + text) });

      // 执行代码
      await pyodide.runPythonAsync(editorCode);
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative my-4">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-lg">
        <span className="text-slate-400 text-sm font-mono">{language}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#165DFF] hover:bg-[#0f4cdb] text-white text-xs font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? '运行中...' : '运行代码'}</span>
          </button>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-b-lg font-mono text-sm resize-none min-h-[200px]"
          spellCheck={false}
        />
      </div>
      {(output || error) && (
        <div className="mt-2 p-4 bg-slate-100 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">运行结果</h4>
          {output && (
            <pre className="text-sm text-slate-800 whitespace-pre-wrap">{output}</pre>
          )}
          {error && (
            <pre className="text-sm text-red-600 whitespace-pre-wrap">{error}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBlock
