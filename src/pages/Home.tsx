import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Scale, FolderKanban, Wrench, Sparkles, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const learningPath = [
    { 
      id: 1, 
      level: '入门', 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', 
      items: ['思维模型', '项目1-2']
    },
    { 
      id: 2, 
      level: '基础', 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', 
      items: ['业内争议', '项目3-5']
    },
    { 
      id: 3, 
      level: '进阶', 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', 
      items: ['项目6-8']
    },
    { 
      id: 4, 
      level: '高阶', 
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400', 
      items: ['项目9']
    },
    { 
      id: 5, 
      level: '综合', 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', 
      items: ['项目10']
    }
  ];

  const features = [
    {
      title: '代码+业务+实战',
      description: '三位一体的学习体系，不止有代码，还有业务落地逻辑',
      icon: Sparkles
    },
    {
      title: '可直接运行代码',
      description: '所有代码均适配SOLO环境，无需额外配置，一键运行',
      icon: BrainCircuit
    },
    {
      title: '10个完整项目',
      description: '由浅入深，覆盖所有重点分析方法',
      icon: FolderKanban
    }
  ];

  const quickLinks = [
    { title: '5大核心思维模型', path: '/thinking-models', icon: BrainCircuit, color: 'from-blue-500 to-blue-600' },
    { title: '3大业内硬核争议', path: '/controversies', icon: Scale, color: 'from-purple-500 to-purple-600' },
    { title: '10个实战项目', path: '/projects', icon: FolderKanban, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                不止于代码
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
                More Than Coding
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              SOLO平台专属Python数据分析全栈学习网站，提供「代码+业务+实战」三位一体的阶梯式学习体系
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <span>开始学习</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <span>下载学习包</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">核心价值</h2>
            <p className="text-gray-600 dark:text-gray-400">完整适配SOLO平台原生能力</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">阶梯式学习路径</h2>
            <p className="text-gray-600 dark:text-gray-400">从入门到综合，循序渐进</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {learningPath.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center font-bold text-xl shadow-lg mb-4`}>
                    {step.id}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.level}</h3>
                  <div className="text-center">
                    {step.items.map((item, i) => (
                      <p key={i} className="text-sm text-gray-600 dark:text-gray-400">{item}</p>
                    ))}
                  </div>
                </div>
                {index < learningPath.length - 1 && (
                  <div className="hidden md:block text-gray-400">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">快速开始</h2>
            <p className="text-gray-600 dark:text-gray-400">点击直达对应模块</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link to={link.path} key={index} className="group">
                  <div className={`bg-gradient-to-br ${link.color} p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{link.title}</h3>
                        <p className="text-white/80">点击进入 -&gt;</p>
                      </div>
                      <Icon className="w-12 h-12 text-white/90" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <Link to="/tools" className="group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">SOLO专属工具聚合</h3>
                    <p className="text-white/80">报告生成、文献综述、PPT导出</p>
                  </div>
                  <Wrench className="w-12 h-12 text-white/90" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;