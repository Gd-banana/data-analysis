import React from 'react';
import { Search, BookOpen, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

const Controversies: React.FC = () => {
  const controversies = [
    {
      id: 1,
      title: '传统统计分析 VS 机器学习挖掘',
      coreQuestion: '做业务数据分析，优先用「分组、交叉、相关性」等传统统计方法，还是直接上「聚类、随机森林、关联规则」等机器学习挖掘方法？',
      proArgument: '可解释性极强：比如「同比增长10%」「客单价与复购率正相关（r=0.8）」，业务人员能快速理解，便于落地策略；简单稳定、成本低：无需复杂的数据预处理、模型调参，用pandas就能实现，新手易上手，且结果不易出错；覆盖80%业务场景：大部分业务分析（如销量对比、结构占比、指标关联），用传统统计就能解决，无需过度复杂。',
      conArgument: '能挖掘隐藏规律：传统统计无法发现「无标签数据的分群」「商品间的隐性关联」（如啤酒和尿布），机器学习可实现；适配复杂场景：当数据维度多（如10+个特征）、关系非线性（如广告费与销量不是正比），传统统计效果差，随机森林、聚类等更适配；可扩展性强：能从「描述分析」升级到「预测分析」，比如用回归预测销量，用聚类做用户生命周期管理，支撑长期决策。',
      suggestions: '优先用传统统计：新手入门、简单业务场景（如月度销量对比、品类占比）、需要快速出结论、业务人员需理解分析逻辑；优先用机器学习挖掘：无标签数据（如用户分群）、复杂关联（如购物车分析）、预测场景（如销量预估）、高维度数据（10+特征）；最佳实践：先做传统统计（描述、对比、相关），找到基础规律，再用机器学习挖掘深层价值（分群、预测），两者结合。'
    },
    {
      id: 2,
      title: '模型可解释性 VS 预测精度',
      coreQuestion: '选择模型时，优先保证「可解释性」（如线性回归、决策树），还是优先追求「预测精度」（如随机森林、梯度提升树）？',
      proArgument: '业务落地性强：可解释的模型（如线性回归）能明确「每个特征对结果的影响程度」（如广告费每增加1元，销量增加0.5元），业务人员能据此制定具体策略；风险可控：出现预测偏差时，能快速定位问题（如某特征异常影响结果），便于调整模型；符合业务决策逻辑：企业决策需要「明确的因果关系」，而非「黑盒预测」，可解释性模型能提供因果支撑。',
      conArgument: '业务价值更高：预测精度高意味着「决策更准确」，比如销量预测误差从10%降到5%，能减少库存积压、提升营收；适配复杂数据：现实业务中，变量关系多为非线性（如用户消费行为），黑盒模型（随机森林、XGBoost）能捕捉更复杂的规律；可通过辅助方法弥补可解释性：比如用「特征重要性」「部分依赖图」，让黑盒模型的结果变得可理解，无需完全牺牲精度。',
      suggestions: '可解释性优先：业务策略落地（如运营活动设计）、风险控制（如异常检测）、需要向老板/业务方汇报分析逻辑；精度优先：纯预测场景（如销量预测、用户流失预测）、无需向业务方解释模型逻辑、数据复杂且非线性；最佳实践：先用可解释模型（线性回归、决策树）搭建基础，再用高精度模型（随机森林）优化预测结果，用特征重要性、可视化等方法提升可解释性。'
    },
    {
      id: 3,
      title: '通用挖掘模型 VS 垂直业务专属模型',
      coreQuestion: '直接使用「通用算法模型」（如通用KMeans、通用Apriori），还是结合具体行业（电商/零售）定制模型阈值、权重、分群逻辑？',
      proArgument: '高效快捷：通用模型无需定制，直接调用库就能实现，节省开发/学习时间，新手易上手；通用性强：同一模型（如KMeans）可用于电商用户分群、零售商品分群，无需重新学习新模型；基础效果有保障：通用模型经过大量验证，能满足大部分基础挖掘需求，无需过度定制。',
      conArgument: '贴合业务实际：不同行业的核心指标、业务逻辑不同，通用模型的阈值（如KMeans的k值、Apriori的支持度）不适用；结果更有价值：比如电商RFM分层，需结合「客单价、复购周期」定制阈值，通用阈值会导致分群偏差，无法落地运营；避免「为模型而模型」：专属模型能聚焦业务痛点，比如零售行业的「商品关联规则」，需排除「刚需商品+附属商品」的无效关联。',
      suggestions: '通用模型优先：新手入门、快速验证想法、无明确业务痛点、基础挖掘需求（如简单用户分群）；业务专属模型优先：有明确业务目标（如电商捆绑销售、零售用户唤醒）、行业特性明显、需要落地具体策略；最佳实践：先用通用模型搭建基础框架，再结合业务逻辑调整阈值、权重、分群规则，让模型结果贴合业务需求。'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">3大业内硬核争议</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">正反双方硬核论据+适用场景+选型建议</p>
        </div>

        <div className="space-y-10">
          {controversies.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{item.id}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h2>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{item.coreQuestion}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800/30">
                    <div className="flex items-center gap-3 mb-4">
                      <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-bold text-green-800 dark:text-green-400">正方论据</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{item.proArgument}</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800/30">
                    <div className="flex items-center gap-3 mb-4">
                      <ThumbsDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                      <h3 className="text-lg font-bold text-red-800 dark:text-red-400">反方论据</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{item.conArgument}</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400">适用场景 & 选型建议</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{item.suggestions}</p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors">
                    <Search className="w-5 h-5" />
                    <span>用SOLO Research生成行业分析报告</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <BookOpen className="w-5 h-5" />
                    <span>用SOLO Web Reading阅读行业文献</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controversies;
