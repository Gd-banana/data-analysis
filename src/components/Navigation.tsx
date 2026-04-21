import { Link, useLocation } from 'react-router-dom'
import { Home, BrainCircuit, MessageSquare, FolderKanban, Wrench } from 'lucide-react'

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/thinking-models', label: '思维模型', icon: BrainCircuit },
  { path: '/controversies', label: '行业争议', icon: MessageSquare },
  { path: '/projects', label: '实战项目', icon: FolderKanban },
  { path: '/tools', label: '工具聚合', icon: Wrench },
]

const Navigation = () => {
  const location = useLocation()

  return (
    <>
      {/* 桌面端左侧导航 */}
      <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl z-50">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-[#165DFF]">数据分析学习平台</h1>
        </div>
        <div className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#165DFF] text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <a
            href="https://solo.trae.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FF9A47] hover:bg-[#ff8a2d] rounded-lg font-medium transition-colors"
          >
            <span>在 SOLO 中运行代码</span>
          </a>
        </div>
      </nav>

      {/* 移动端/平板端顶部导航 */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-[#165DFF]">数据分析学习</h1>
        </div>
        <div className="flex justify-around py-2 border-t border-slate-700">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#165DFF] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* 内容区偏移 */}
      <div className="lg:ml-64 pt-24 lg:pt-0" />
    </>
  )
}

export default Navigation
