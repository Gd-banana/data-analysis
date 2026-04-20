import React from 'react';
import { FileText, BookOpen, Presentation, Settings, ChevronRight } from 'lucide-react';

const Tools: React.FC = () => {
  const tools = [
    {
      icon: FileText,
      title: '数据分析报告自动生成',
      description: '利用SOLO Content能力，一键生成专业的数据分析报告，包含数据概况、分析结论、业务建议等完整内容。',
      features: ['自动生成报告结构', '支持多种图表插入', '业务建议智能生成', '可导出为Markdown/PDF'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: BookOpen,
      title: '文献综述一键生成',
      description: '利用SOLO Web Reading能力，自动阅读和分析行业文献，生成完整的文献综述和研究现状分析。',
      features: ['批量阅读行业论文', '自动提取核心观点', '生成研究现状综述', '支持多源文献汇总'],
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Presentation,
      title: '项目PPT自动导出',
      description: '自动将分析结果和数据可视化整理成专业的PPT演示文稿，支持多种主题和模板。',
      features: ['自动生成PPT大纲', '图表自动排版', '支持多种主题风格', '一键导出为PPTX'],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Settings,
      title: '代码环境一键配置',
      description: '在SOLO中一键配置Python数据分析环境，预装常用库，无需手动安装，快速开始项目。',
      features: ['预装pandas/numpy', '配置scikit-learn', '自动安装seaborn', '一键启动Jupyter'],
      color: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">SOLO专属工具聚合</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">深度整合SOLO平台原生能力，一键提升工作效率</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-br ${tool.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-12 h-12 text-white/90" />
                    <ChevronRight className="w-8 h-8 text-white/70" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">核心功能：</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                    <span>立即使用</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">SOLO能力完整整合</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            所有工具都深度整合SOLO平台原生能力，包括：
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">SOLO Auto Model</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">项目自动生成</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="font-bold text-green-600 dark:text-green-400 mb-1">Web Reading</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">文献自动阅读</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">Research</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">研究分析报告</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="font-bold text-orange-600 dark:text-orange-400 mb-1">Content Creation</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">内容自动生成</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
