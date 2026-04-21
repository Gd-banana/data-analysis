import React from 'react';
import { BookOpen, Code, Database, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnHome: React.FC = () => {
  const stages = [
    {
      id: 1,
      level: '入门',
      title: '数据分析基础',
      description: '学习数据定义、类型、Excel 基础操作、描述性统计概念',
      difficulty: '🌟',
      color: 'from-blue-500 to-blue-600',
      icon: BookOpen,
      lessons: 5,
      duration: '3-5小时'
    },
    {
      id: 2,
      level: '进阶',
      title: 'Python 数据处理',
      description: 'Python 基础、Pandas/Numpy、MySQL 查询、数据清洗',
      difficulty: '🌟🌟',
      color: 'from-purple-500 to-purple-600',
      icon: Code,
      lessons: 6,
      duration: '6-8小时'
    },
    {
      id: 3,
      level: '实战',
      title: '数据分析实战',
      description: '数据可视化、多数据源整合、分析报告撰写',
      difficulty: '🌟🌟🌟',
      color: 'from-green-500 to-green-600',
      icon: Database,
      lessons: 8,
      duration: '10-12小时'
    },
    {
      id: 4,
      level: '高级',
      title: '高级应用',
      description: '假设检验、回归分析、Python 自动化、项目实战',
      difficulty: '🌟🌟🌟🌟',
      color: 'from-orange-500 to-orange-600',
      icon: TrendingUp,
      lessons: 10,
      duration: '15-20小时'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            数据分析全链路学习
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            从零基础入门到高级应用，一站式数据分析学习平台，配套实战项目和在线代码编辑器
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <Link
                key={stage.id}
                to={`/learn/stage-${stage.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${stage.color} p-6`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {stage.level}
                    </span>
                    <span className="text-xl">{stage.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {stage.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{stage.lessons} 节课</span>
                    <span>{stage.duration}</span>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    开始学习
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">在线代码编辑器</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">无需安装环境，直接在浏览器中编写和运行 Python 代码</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">实战项目</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">10个阶梯式实战项目，涵盖数据分析全流程</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">慢引导教学</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">每一步操作都有详细解释，新手也能轻松上手</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnHome;
