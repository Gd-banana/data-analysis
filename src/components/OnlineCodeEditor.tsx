import React, { useState, useEffect, useRef } from 'react';
import { Play, Copy, Check, Terminal, X } from 'lucide-react';

interface OnlineCodeEditorProps {
  initialCode?: string;
  height?: string;
}

const OnlineCodeEditor: React.FC<OnlineCodeEditorProps> = ({ 
  initialCode = `# Python 数据分析学习环境
# 点击运行按钮执行代码

import sys

print("🎉 欢迎来到数据分析学习平台！")
print("✅ 环境已准备好")
print(f"Python 版本: {sys.version}")
`,
  height = '400px'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    loadPyodide();
  }, []);

  const loadPyodide = async () => {
    try {
      // 检查 Pyodide 是否已加载
      if (typeof window !== 'undefined' && !window.pyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.onload = async () => {
          try {
            // @ts-ignore
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
            });
            pyodideRef.current = pyodide;
            setPyodideReady(true);
            setOutput('🚀 Pyodide 已加载完成！点击运行按钮开始编码。\n');
          } catch (error) {
            console.error('Failed to load Pyodide:', error);
            setOutput('❌ 加载 Pyodide 失败，请刷新页面重试。\n');
          }
        };
        script.onerror = (error) => {
          console.error('Script loading failed:', error);
          setOutput('❌ 加载 Pyodide 脚本失败，请检查网络连接。\n');
        };
        document.body.appendChild(script);
      } else if (window.pyodide) {
        pyodideRef.current = window.pyodide;
        setPyodideReady(true);
        setOutput('🚀 Pyodide 已加载完成！点击运行按钮开始编码。\n');
      }
    } catch (error) {
      console.error('Error in loadPyodide:', error);
      setOutput('❌ 加载 Pyodide 失败，请刷新页面重试。\n');
    }
  };

  const handleRun = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('⏳ 正在加载环境，请稍候...\n');
      return;
    }

    setIsRunning(true);
    setOutput('⏳ 运行中...\n');

    try {
      const pyodide = pyodideRef.current;

      // 重定向标准输出
      pyodide.setStdout({ write: (text: string) => {
        setOutput(prev => prev + text);
      }});

      pyodide.setStderr({ write: (text: string) => {
        setOutput(prev => prev + `❌ 错误: ${text}`);
      }});

      // 运行代码
      await pyodide.runPythonAsync(code);

    } catch (error) {
      setOutput(prev => prev + `❌ 运行错误: ${error}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">Python 编辑器</span>
          {pyodideReady && (
            <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
              已就绪
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
            <span>重置</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || !pyodideReady}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-md transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? '运行中...' : '运行'}</span>
          </button>
        </div>
      </div>
      
      {/* 横向布局 */}
      <div className="flex" style={{ height }}>
        <div className="flex-1">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
        
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
          <div className="p-3 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">输出</span>
          </div>
          <div 
            className="p-4 h-[calc(100%-48px)] overflow-y-auto font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
          >
            {output || '运行代码查看输出...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCodeEditor;
