import React from 'react';
import { FileText, AlertTriangle, Database, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      level: '入门',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      title: '数据预处理高阶版（铺垫所有算法前置能力）',
      coreKnowledge: '缺失值/重复值/异常值高阶处理、特征分桶、离散化、类别编码、数据标准化/归一化。',
      businessScenario: '电商用户行为数据预处理，为后续聚类、回归、关联规则等算法做准备。',
    },
    {
      id: 2,
      level: '入门',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      title: '多维统计 + 深度相关性分析',
      coreKnowledge: '描述统计、皮尔逊相关系数、斯皮尔曼相关系数、相关性热力图、多因子关联研判。',
      businessScenario: '电商营收影响因子分析，找到「哪些指标影响营收」，为后续运营决策提供支撑。',
    },
    {
      id: 3,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      title: '购物车关联规则挖掘（Apriori算法）',
      coreKnowledge: 'Apriori算法、频繁项集、关联规则（支持度、置信度、提升度）、商品组合分析。',
      businessScenario: '电商购物车分析，挖掘「哪些商品经常一起被加入购物车」，为捆绑销售提供策略支撑。',
    },
    {
      id: 4,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      title: 'KMeans 聚类分析实战（用户+商品双场景）',
      coreKnowledge: 'KMeans聚类算法、数据标准化、肘部法则、聚类可视化、聚类结果解读、业务落地。',
      businessScenario: '电商用户分群+商品分群，实现「精准运营+商品优化」。',
    },
    {
      id: 5,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      title: 'RFM 模型用户分层（企业通用运营模型）',
      coreKnowledge: 'RFM模型、分位数分箱、用户分层逻辑、业务策略落地。',
      businessScenario: '电商用户生命周期管理，区分高价值、潜力、流失用户，制定差异化运营策略。',
    },
    {
      id: 6,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '一元 + 多元线性回归（销量影响因子量化）',
      coreKnowledge: '一元线性回归、多元线性回归、模型训练与评估、回归系数解读、多重共线性处理。',
      businessScenario: '电商销量预测与影响因子分析，量化「广告费、活动次数、客单价」等指标对销量的影响。',
    },
    {
      id: 7,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '随机森林 回归 + 特征重要性（非线性预测）',
      coreKnowledge: '随机森林回归、特征重要性、模型调参、模型评估、非线性关系挖掘。',
      businessScenario: '电商销量精准预测，解决「线性回归无法捕捉非线性关系」的问题。',
    },
    {
      id: 8,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '时间序列完整分析（趋势 + 周期 + 预测）',
      coreKnowledge: '时间序列预处理、移动平均、趋势分析、周期识别、简易时序预测（ARIMA）。',
      businessScenario: '电商月度销量时间序列分析，识别销量的趋势、周期，预测未来3个月的销量。',
    },
    {
      id: 9,
      level: '高阶',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      title: '综合异常检测（统计 + 模型结合）',
      coreKnowledge: '统计异常检测、模型异常检测、异常值解读、业务异常定位。',
      businessScenario: '电商订单异常检测，识别「异常订单」「异常用户」，降低业务风险。',
    },
    {
      id: 10,
      level: '综合',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      title: '全流程综合大项目（完整分析师交付闭环）',
      coreKnowledge: '整合所有前期知识点，完整覆盖「数据→分析→建模→结论→落地」全链路。',
      businessScenario: '电商综合数据分析，解决「如何提升营收」的核心业务问题，输出完整的分析报告。',
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        数据分析实战项目
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.color}`}>
                {project.level}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>{project.coreKnowledge}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Database className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{project.businessScenario}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;