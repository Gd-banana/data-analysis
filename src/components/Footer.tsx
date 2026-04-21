import { Github, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">数据分析学习平台</h3>
            <p className="text-sm">一站式数据分析技术学习平台，从零基础到高级应用</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">相关链接</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#165DFF] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://solo.trae.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#165DFF] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>SOLO 平台</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">学习路径</h4>
            <ul className="space-y-2 text-sm">
              <li>零基础入门</li>
              <li>工具进阶</li>
              <li>实战项目</li>
              <li>高级应用</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} 数据分析学习平台. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
