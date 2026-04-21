import { Link } from 'react-router-dom'
import { Star, BrainCircuit, MessageSquare, FolderKanban, Wrench, ArrowRight, TrendingUp, Database, BarChart3, Layers } from 'lucide-react'
import Footer from '../components/Footer'

const learningStages = [
  {
    id: 1,
    title: '零基础入门',
    difficulty: 1,
    description: '数据分析基础、Excel基础操作、描述性统计概念',
    color: 'from-green-400 to-green-600',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: '工具进阶',
    difficulty: 2,
    description: 'Python基础、Pandas/Numpy、MySQL基础查询、数据清洗',
    color: 'from-blue-400 to-blue-600',
    icon: Database,
  },
  {
    id: 3,
    title: '实战应用',
    difficulty: 3,
    description: '数据可视化、多数据源整合、简易分析报告撰写',
    color: 'from-purple-400 to-purple-600',
    icon: BarChart3,
  },
  {
    id: 4,
    title: '高级应用',
    difficulty: 4,
    description: '假设检验、回归分析、Python自动化、实战项目',
    color: 'from-orange-400 to-orange-600',
    icon: Layers,
  },
]

const quickAccess = [
  {
    title: '思维模型',
    description: '5个全领域专家共识核心思维模型',
    icon: BrainCircuit,
    path: '/thinking-models',
    color: 'text-[#165DFF]',
  },
  {
    title: '行业争议',
    description: '3个业内专家硬核争议，帮你做出正确选择',
    icon: MessageSquare,
    path: '/controversies',
    color: 'text-[#FF9A47]',
  },
  {
    title: '实战项目',
    description: '10个全覆盖实操实训项目，从入门到精通',
    icon: FolderKanban,
    path: '/projects',
    color: 'text-green-600',
  },
  {
    title: '工具聚合',
    description: 'SOLO平台相关工具链接，提升开发效率',
    icon: Wrench,
    path: '/tools',
    color: 'text-purple-600',
  },
]

const Home = () => {
  const renderStars = (count: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#165DFF] to-[#0f4cdb] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              数据分析学习平台
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              从零基础到高级应用，一站式数据分析技术学习
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/thinking-models"
                className="px-8 py-3 bg-white text-[#165DFF] font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                开始学习
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 bg-[#FF9A47] text-white font-semibold rounded-lg hover:bg-[#ff8a2d] transition-colors shadow-lg"
              >
                查看项目
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            学习路径
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            从零基础到高级应用，阶梯式学习，循序渐进
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningStages.map((stage) => {
              const Icon = stage.icon
              return (
                <div
                  key={stage.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">{stage.title}</h3>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {renderStars(stage.difficulty)}
                  </div>
                  <p className="text-slate-600 text-sm">{stage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            快速入口
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            直达核心内容，高效学习
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickAccess.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  to={item.path}
                  className="group bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-[#165DFF]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-slate-100 ${item.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#165DFF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{item.description}</p>
                      <div className="flex items-center gap-2 text-[#165DFF] font-medium">
                        <span>查看详情</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
