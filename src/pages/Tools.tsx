import { Wrench, ExternalLink, Github } from 'lucide-react'
import Footer from '../components/Footer'

const tools = [
  {
    id: 1,
    title: 'SOLO 平台',
    description: '专为数据科学家打造的在线编程环境，支持 Python、R 等语言，集成常用数据分析库。',
    link: 'https://solo.trae.cn',
    icon: Wrench,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 2,
    title: 'GitHub 仓库',
    description: '查看完整的项目代码、学习资料和示例数据，欢迎 Star 和 Fork。',
    link: 'https://github.com',
    icon: Github,
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 3,
    title: 'NumPy 官方文档',
    description: '数值计算基础库，提供高性能的数组操作和数学函数。',
    link: 'https://numpy.org/doc/stable/',
    icon: ExternalLink,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 4,
    title: 'Pandas 官方文档',
    description: '数据处理和分析的必备库，提供 DataFrame 等强大数据结构。',
    link: 'https://pandas.pydata.org/docs/',
    icon: ExternalLink,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Matplotlib 官方文档',
    description: '数据可视化基础库，支持绘制各种静态、动态图表。',
    link: 'https://matplotlib.org/stable/contents.html',
    icon: ExternalLink,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 6,
    title: 'Seaborn 官方文档',
    description: '基于 Matplotlib 的高级统计可视化库，提供更美观的图表样式。',
    link: 'https://seaborn.pydata.org/',
    icon: ExternalLink,
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 7,
    title: 'Scikit-learn 官方文档',
    description: '机器学习必备库，提供分类、回归、聚类等常用算法的实现。',
    link: 'https://scikit-learn.org/stable/',
    icon: ExternalLink,
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 8,
    title: 'Kaggle 平台',
    description: '全球最大的数据科学社区，提供丰富的数据集、竞赛和学习资源。',
    link: 'https://www.kaggle.com/',
    icon: ExternalLink,
    color: 'from-indigo-500 to-indigo-600',
  },
]

const Tools = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">工具聚合</h1>
          <p className="text-xl text-purple-100">SOLO 平台相关工具链接，提升开发效率</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <a
                key={tool.id}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                    <span>访问链接</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <div className="mt-12 bg-slate-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-slate-800 mb-2 text-blue-600">零基础入门</h3>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• Excel 基础操作</li>
                <li>• 统计基础概念</li>
                <li>• Python 语法入门</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-slate-800 mb-2 text-green-600">中级进阶</h3>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• Pandas 数据处理</li>
                <li>• Matplotlib 可视化</li>
                <li>• 基础机器学习算法</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-slate-800 mb-2 text-purple-600">高级应用</h3>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• 时间序列分析</li>
                <li>• 模型调优</li>
                <li>• 项目实战</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Tools
