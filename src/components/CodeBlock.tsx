import { useEffect, useRef, useState } from 'react'
import { Copy, Play, Check } from 'lucide-react'
import hljs from 'highlight.js'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('python', python)

interface CodeBlockProps {
  code: string
  language?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRunInSolo = () => {
    window.open('https://solo.trae.cn', '_blank')
  }

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
          <a
            href="https://solo.trae.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#165DFF] hover:bg-[#0f4cdb] text-white text-xs font-medium rounded-md transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>在 SOLO 中运行</span>
          </a>
        </div>
      </div>
      <pre className="!mt-0 !rounded-t-none overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

export default CodeBlock
