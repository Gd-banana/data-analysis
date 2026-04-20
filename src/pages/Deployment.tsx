import React from 'react';
import { ArrowRight, Github, Cloud, Globe, Zap } from 'lucide-react';

const Deployment: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'SOLO中项目创建',
      description: '在SOLO平台中完成项目开发，确保所有功能正常运行，代码测试通过。',
      details: ['完成所有实战项目', '确保代码可正常运行', '准备部署文件清单']
    },
    {
      number: 2,
      title: 'GitHub仓库同步',
      description: '将SOLO项目推送到GitHub仓库，配置好仓库权限和分支设置。',
      details: ['创建GitHub仓库', '初始化Git仓库', '推送代码到main分支', '配置.gitignore文件']
    },
    {
      number: 3,
      title: 'Cloudflare Pages配置',
      description: '在Cloudflare Pages中创建项目，连接GitHub仓库，配置构建参数。',
      details: ['登录Cloudflare Dashboard', '创建Pages项目', '连接GitHub仓库', '配置构建命令和输出目录']
    },
    {
      number: 4,
      title: '域名绑定与解析',
      description: '配置自定义域名或使用SOLO提供的子域名，完成DNS解析设置。',
      details: ['添加自定义域名', '配置DNS记录', '启用HTTPS', '验证域名所有权']
    },
    {
      number: 5,
      title: '自动部署设置',
      description: '配置代码推送自动触发构建和部署，实现CI/CD流程自动化。',
      details: ['设置自动部署触发', '配置预览分支', '设置部署环境变量', '配置部署通知']
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">全流程部署指南</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">从SOLO项目到上线，一步一引导，零额外学习成本</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white text-center">
            <Github className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">GitHub</div>
            <div className="text-sm text-white/80">代码托管</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white text-center">
            <Cloud className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">Cloudflare</div>
            <div className="text-sm text-white/80">部署平台</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-2xl text-white text-center">
            <Globe className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">自定义域名</div>
            <div className="text-sm text-white/80">品牌展示</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white text-center">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <div className="font-bold text-lg">自动部署</div>
            <div className="text-sm text-white/80">CI/CD流程</div>
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center pb-2">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-800/30">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            Cloudflare Pages配置参数
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">构建命令</div>
              <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">npm run build</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">输出目录</div>
              <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">dist</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">框架预设</div>
              <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">Vite</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Node版本</div>
              <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">&gt;=18</div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">部署检查清单</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">代码已推送到GitHub</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">确保所有变更都已提交并推送</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">构建命令配置正确</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">npm run build和输出目录dist</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">HTTPS已启用</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cloudflare自动提供SSL证书</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">自动部署已设置</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">推送代码自动触发部署</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
