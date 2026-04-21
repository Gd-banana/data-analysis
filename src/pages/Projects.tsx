import { useState } from 'react'
import { FolderKanban, ChevronDown, ChevronUp, Star, AlertTriangle, FileText } from 'lucide-react'
import Footer from '../components/Footer'

const projects = [
  {
    id: 1,
    title: '数据预处理高阶版（铺垫所有算法前置能力）',
    difficulty: 2,
    coreKnowledge: '缺失值/重复值/异常值高阶处理、特征分桶、离散化、类别编码（LabelEncoder/OneHotEncoder）、数据标准化/归一化。',
    businessScenario: '电商用户行为数据预处理，为后续聚类、回归、关联规则等算法做准备（数据质量直接影响模型效果）。',
    tasks: [
      '读取模拟数据（user_behavior.csv），包含字段：用户ID、消费金额、消费频次、最近消费天数、性别、地区、注册时间、浏览时长',
      '缺失值处理：消费金额/频次缺失用"中位数"填充（避免均值受异常值影响），性别/地区缺失用"未知"填充，注册时间缺失直接删除',
      '异常值处理：用"箱线图+3σ原则"识别消费金额、浏览时长的异常值，采用"中位数替换"（不删除数据，避免样本损失）',
      '特征处理：① 消费金额分桶（低/中/高）；② 浏览时长离散化（短/中/长）；③ 性别/地区做OneHotEncoder编码；④ 注册时间提取"注册月份"特征',
      '数据标准化：对消费金额、消费频次、最近消费天数做StandardScaler标准化，保存处理后的数据（processed_data.csv）',
    ],
    pitfalls: [
      '用均值填充含异常值的字段（导致数据失真）',
      '对所有类别字段都做OneHotEncoder（高基数字段如地区，会导致维度爆炸）',
      '忘记标准化数据（后续聚类、回归模型会受量纲影响，结果偏差）',
    ],
    deliverables: '① 预处理代码文件（preprocess.py）；② 处理前后的数据对比表（Excel）；③ 预处理总结（100字，说明处理逻辑和避免的问题）。',
  },
  {
    id: 2,
    title: '多维统计 + 深度相关性分析',
    difficulty: 2,
    coreKnowledge: '描述统计（均值/中位数/分位数）、皮尔逊相关系数、斯皮尔曼相关系数、相关性热力图、多因子关联研判。',
    businessScenario: '电商营收影响因子分析，找到"哪些指标影响营收"，为后续运营决策提供支撑。',
    tasks: [
      '读取项目1处理后的数据（processed_data.csv），新增"营收"字段（营收=消费金额×消费频次）',
      '做描述统计：计算营收、消费金额、消费频次、浏览时长的均值、中位数、四分位数、标准差，分析数据分布特征',
      '相关性分析：① 计算所有数值型字段（营收、消费金额等）的皮尔逊相关系数和斯皮尔曼相关系数；② 绘制相关性热力图（用seaborn）',
      '关联研判：分析"哪些指标与营收强相关（|r|≥0.7）""哪些指标之间存在多重共线性（|r|≥0.8）"',
      '得出结论：明确影响营收的核心指标（至少2个），说明相关性方向（正/负相关）。',
    ],
    pitfalls: [
      '混淆皮尔逊和斯皮尔曼相关系数（皮尔逊适用于线性关系，斯皮尔曼适用于非线性/有序分类关系）',
      '误将"相关性"当作"因果关系"（如"浏览时长与营收正相关"，不代表"增加浏览时长就能提升营收"）',
      '热力图不调整颜色、不标注相关系数，导致无法清晰判断关联强度。',
    ],
    deliverables: '① 相关性分析代码文件（correlation_analysis.py）；② 描述统计表+相关性热力图；③ 关联分析结论（150字）。',
  },
  {
    id: 3,
    title: '购物车关联规则挖掘（Apriori算法）',
    difficulty: 3,
    coreKnowledge: 'Apriori算法、频繁项集、关联规则（支持度、置信度、提升度）、商品组合分析、捆绑销售挖掘。',
    businessScenario: '电商购物车分析，挖掘"哪些商品经常一起被加入购物车"，为捆绑销售、商品陈列提供策略支撑（经典"啤酒尿布"场景）。',
    tasks: [
      '读取模拟购物车数据（cart_data.csv），包含字段：订单ID、商品名称（如"手机、耳机、充电器"）',
      '数据预处理：将每个订单的商品拆分，转换成one-hot编码格式（每行一个订单，每列一个商品，1=包含该商品，0=不包含）',
      '用Apriori算法挖掘频繁项集：设置最小支持度=0.05（频繁项集即"经常一起出现的商品组合"）',
      '生成关联规则：设置最小置信度=0.7，计算每条规则的支持度、置信度、提升度',
      '筛选有价值的规则：提升度>1（说明商品组合有协同效应），筛选出Top10关联规则',
      '业务建议：基于关联规则，给出3条捆绑销售建议（如"手机+耳机"捆绑打折）。',
    ],
    pitfalls: [
      '支持度设置过高（导致没有频繁项集）或过低（导致频繁项集过多，无价值）',
      '不筛选提升度，误将"无关商品组合"当作有效规则（如"矿泉水+手机"，提升度≤1）',
      '商品名称有重复（如"耳机"和"无线耳机"被当作不同商品，影响关联结果）。',
    ],
    deliverables: '① 关联规则挖掘代码文件（apriori_analysis.py）；② Top10关联规则表（包含支持度、置信度、提升度）；③ 捆绑销售策略建议（200字）。',
  },
  {
    id: 4,
    title: 'KMeans 聚类分析实战（用户+商品双场景）',
    difficulty: 3,
    coreKnowledge: 'KMeans聚类算法、数据标准化、肘部法则（确定k值）、聚类可视化、聚类结果解读、业务落地。',
    businessScenario: '电商用户分群+商品分群，实现"精准运营+商品优化"，比如对高价值用户推送专属福利，对爆款商品加大库存。',
    tasks: [
      '用户聚类：① 读取项目1处理后的数据，选择特征：消费金额、消费频次、最近消费天数、浏览时长；② 标准化数据；③ 用肘部法则确定最优k值（k=3~5）；④ 用KMeans聚类，给用户打上分群标签；⑤ 分析每个分群的用户特征（如"分群1：高消费、高频次、最近消费近"）。',
      '商品聚类：① 读取模拟商品数据（goods_data.csv），包含字段：商品ID、销量、客单价、好评率、库存；② 标准化数据；③ 确定最优k值，KMeans聚类；④ 分析每个分群的商品特征（如"分群1：高销量、高客单价、高好评率"）。',
      '可视化：用PCA降维，绘制用户聚类、商品聚类的可视化图表（标注分群标签）。',
      '业务落地：针对每个用户分群、商品分群，各给出2条运营/优化建议。',
    ],
    pitfalls: [
      '聚类前不标准化数据（如消费金额（万元级）和浏览时长（分钟级），量纲差异导致聚类偏差）',
      '盲目设置k值（不做肘部法则，直接设k=4，导致分群无业务意义）',
      '只做聚类，不解读分群特征、不落地业务建议（沦为"炫技"，无实际价值）。',
    ],
    deliverables: '① 聚类分析代码文件（kmeans_analysis.py）；② 肘部法则图、聚类可视化图；③ 分群特征解读+业务建议（300字）。',
  },
  {
    id: 5,
    title: 'RFM 模型用户分层（企业通用运营模型）',
    difficulty: 3,
    coreKnowledge: 'RFM模型（Recency/Frequency/Monetary）、分位数分桶、用户分层逻辑、业务策略落地。',
    businessScenario: '电商用户生命周期管理，区分高价值、潜力、流失用户，制定差异化运营策略，提升用户留存和营收。',
    tasks: [
      '读取项目1处理后的数据，提取RFM三个核心指标：① R（最近消费天数）；② F（消费频次）；③ M（消费金额）',
      '指标分桶：用分位数（qcut）将R、F、M各分为5个等级（1=最差，5=最好），其中R指标"值越小越好"（最近消费天数越少，用户越活跃），需反向打分',
      '计算RFM总分（总分=R分+F分+M分），并进行用户分层，至少分为4类：高价值用户、潜力用户、一般用户、流失用户（可自定义分层标准）',
      '统计各分层用户的数量、占比、总消费金额占比',
      '运营策略：针对每类用户，制定具体的运营动作（如流失用户：推送唤醒优惠券；高价值用户：专属客服+积分翻倍）。',
    ],
    pitfalls: [
      'R指标打分错误（没有反向，导致"最近消费天数越多，分数越高"，与业务逻辑相悖）',
      '分层标准过于随意（如总分≥10为高价值用户，未结合业务实际调整）',
      '运营策略同质化（所有用户用同一套策略，未体现分层价值）。',
    ],
    deliverables: '① RFM分层代码文件（rfm_analysis.py）；② 各分层用户统计表格；③ 分层运营策略方案（300字）。',
  },
  {
    id: 6,
    title: '一元 + 多元线性回归（销量影响因子量化）',
    difficulty: 3,
    coreKnowledge: '一元线性回归、多元线性回归、模型训练与评估（R²、MAE、MSE）、回归系数解读、多重共线性处理。',
    businessScenario: '电商销量预测与影响因子分析，量化"广告费、活动次数、客单价"等指标对销量的影响，为广告投放、活动策划提供数据支撑。',
    tasks: [
      '读取模拟销量数据（sales_data.csv），包含字段：日期、销量、广告费、活动次数、客单价、竞品价格',
      '一元线性回归：以"广告费"为特征，"销量"为目标变量，训练回归模型，解读回归系数（如"广告费每增加1元，销量增加多少"），评估模型效果（R²）',
      '多元线性回归：以"广告费、活动次数、客单价、竞品价格"为特征，"销量"为目标变量，训练模型',
      '模型优化：检测多重共线性（用VIF值），删除共线性强的特征（VIF>10），重新训练模型',
      '模型评估与解读：计算R²、MAE、MSE，解读各特征的回归系数，明确"哪些特征对销量影响最大"',
      '预测应用：给定一组特征值（如广告费=1000元、活动次数=3次），预测销量。',
    ],
    pitfalls: [
      '忽略多重共线性（如"客单价"和"消费金额"高度相关，导致回归系数失真）',
      '盲目追求高R²，忽略模型的业务意义（如R²=0.9，但某特征的回归系数与业务逻辑相悖）',
      '未评估模型误差（如MAE过大，模型预测精度低，无法用于实际决策）。',
    ],
    deliverables: '① 回归分析代码文件（regression_analysis.py）；② 模型评估指标表、回归系数表；③ 影响因子解读+预测示例（250字）。',
  },
  {
    id: 7,
    title: '随机森林 回归 + 特征重要性（非线性预测）',
    difficulty: 4,
    coreKnowledge: '随机森林回归、特征重要性、模型调参（n_estimators、max_depth）、模型评估、非线性关系挖掘。',
    businessScenario: '电商销量精准预测，解决"线性回归无法捕捉非线性关系"的问题（如广告费增加到一定程度，销量增长放缓），同时筛选核心影响特征。',
    tasks: [
      '沿用项目6的销量数据（sales_data.csv），特征和目标变量不变',
      '数据拆分：将数据按7:3拆分为训练集和测试集',
      '随机森林回归训练：设置n_estimators=100，max_depth=5，训练模型',
      '模型调参：调整n_estimators（50/100/200）、max_depth（3/5/7），对比不同参数的模型效果（R²、MAE），选择最优参数',
      '特征重要性分析：输出各特征的重要性排序，筛选出Top3核心影响特征',
      '对比分析：将随机森林模型与项目6的多元线性回归模型对比，说明两者的优缺点和适用场景。',
    ],
    pitfalls: [
      '模型参数设置过于极端（如max_depth=20，导致模型过拟合，测试集精度低）',
      '不做参数调参，直接使用默认参数（导致模型效果不佳）',
      '误将"特征重要性高"当作"因果关系"（如"竞品价格重要性高"，不代表"降低竞品价格就能提升销量"）。',
    ],
    deliverables: '① 随机森林代码文件（random_forest_analysis.py）；② 不同参数模型效果对比表、特征重要性排序图；③ 模型对比分析报告（250字）。',
  },
  {
    id: 8,
    title: '时间序列完整分析（趋势 + 周期 + 预测）',
    difficulty: 4,
    coreKnowledge: '时间序列预处理（日期格式转换、重采样）、移动平均、趋势分析、周期识别、简易时序预测（ARIMA）。',
    businessScenario: '电商月度销量时间序列分析，识别销量的趋势（上升/下降）、周期（月度/季度），预测未来3个月的销量，为库存规划提供支撑。',
    tasks: [
      '读取模拟时序数据（time_series_sales.csv），包含字段：日期、销量',
      '预处理：将日期字段转换为datetime格式，设置为索引，按"月度"重采样（计算每月总销量）',
      '趋势分析：计算3个月移动平均，绘制"原始销量+移动平均"折线图，识别销量长期趋势（上升/下降/平稳）',
      '周期识别：绘制月度销量热力图，分析是否存在季节性周期（如"每年6月、11月销量偏高"）',
      '时序预测：用ARIMA模型（p=1,d=1,q=1），基于历史数据预测未来3个月的销量',
      '结果评估：计算预测值与历史实际值的MAE，分析预测误差，给出库存规划建议。',
    ],
    pitfalls: [
      '未做日期格式转换，无法进行重采样和时序分析',
      '移动平均窗口设置不合理（如窗口=1，无法体现趋势；窗口=12，过度平滑）',
      '盲目使用ARIMA模型，不分析数据的平稳性（导致预测结果偏差极大）。',
    ],
    deliverables: '① 时序分析代码文件（time_series_analysis.py）；② 趋势图、周期热力图、预测结果图；③ 预测评估+库存建议（200字）。',
  },
  {
    id: 9,
    title: '综合异常检测（统计 + 模型结合）',
    difficulty: 4,
    coreKnowledge: '统计异常检测（3σ原则、箱线图）、模型异常检测（孤立森林）、异常值解读、业务异常定位。',
    businessScenario: '电商订单异常检测，识别"异常订单"（如刷单、恶意下单、系统误录）、"异常用户"（如高频下单但不付款），降低业务风险。',
    tasks: [
      '读取模拟订单数据（order_data.csv），包含字段：订单ID、用户ID、订单金额、下单时间、支付状态、收货地址',
      '统计异常检测：用3σ原则和箱线图，识别订单金额的异常值（如单笔订单金额远超均值10倍）',
      '模型异常检测：用孤立森林算法，以"订单金额、下单频次、支付时长"为特征，识别异常订单',
      '异常合并与解读：合并两种方法识别的异常订单，分析异常类型（如"高金额未支付订单""高频小额订单"）',
      '业务处理：针对不同类型的异常，给出处理建议（如"高金额异常订单：人工审核；高频小额订单：限制下单频次"）。',
    ],
    pitfalls: [
      '将"正常极端值"当作异常值（如"高端商品订单金额高"，并非异常）',
      '只检测异常，不解读异常原因、不给出处理建议（无业务价值）',
      '孤立森林参数设置不合理（如n_estimators=10，导致异常检测准确率低）。',
    ],
    deliverables: '① 异常检测代码文件（anomaly_detection.py）；② 异常订单统计表格、异常可视化图；③ 异常解读+处理建议（250字）。',
  },
  {
    id: 10,
    title: '全流程综合大项目（完整分析师交付闭环）',
    difficulty: 5,
    coreKnowledge: '整合所有前期知识点（预处理、关联规则、聚类、回归、可视化），完整覆盖"数据→分析→建模→结论→落地"全链路。',
    businessScenario: '电商综合数据分析，解决"如何提升营收"的核心业务问题，输出完整的分析报告，可直接用于业务决策。',
    tasks: [
      '数据准备：整合前面所有项目的模拟数据（用户、商品、订单、销量、购物车数据），形成综合数据集',
      '数据预处理：完成缺失值、异常值、特征处理，标准化数据，保存处理后的数据',
      '核心分析：① 关联规则挖掘（商品组合）；② KMeans用户聚类+RFM分层；③ 随机森林回归（销量预测+特征重要性）；④ 时序趋势分析',
      '可视化呈现：绘制至少5张核心图表（相关性热力图、聚类图、销量趋势图、特征重要性图、关联规则图）',
      '结论与落地：① 总结核心发现（如"高价值用户主要集中在一线城市""广告费是影响销量的核心因子"）；② 给出3~5条可落地的业务策略（如"捆绑销售+高价值用户精准投放+库存优化"）',
      '输出报告：整理成标准数据分析报告（包含数据概况、分析过程、核心结论、策略建议、附录（代码））。',
    ],
    pitfalls: [
      '数据整合混乱（字段不匹配、数据格式不一致，导致分析无法进行）',
      '分析无重点（堆砌所有方法，未围绕"提升营收"的核心目标）',
      '报告逻辑混乱，无数据支撑结论（如"建议提升广告费"，但未给出广告费与销量的关联数据）。',
    ],
    deliverables: '① 全流程代码文件（comprehensive_analysis.py）；② 所有核心可视化图表；③ 完整数据分析报告（800~1000字，含附录代码）。',
  },
]

const Projects = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
    ))
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">实战项目</h1>
          <p className="text-xl text-green-100">10个全覆盖实操实训项目，从入门到精通</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <FolderKanban className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-800">{project.title}</h2>
                      <span className="text-sm text-slate-500">项目{project.id}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-slate-600">难度：</span>
                      <div className="flex items-center gap-1">
                        {renderStars(project.difficulty)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{project.coreKnowledge}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {expandedId === project.id ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedId === project.id && (
                <div className="px-6 pb-6 border-t border-slate-200">
                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        业务场景
                      </h3>
                      <p className="text-slate-700">{project.businessScenario}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">📋 详细任务要求</h3>
                      <ul className="space-y-2 ml-2">
                        {project.tasks.map((task, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">{index + 1}.</span>
                            <span className="text-slate-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        ⚠️ 新手必踩坑
                      </h3>
                      <ul className="space-y-2 ml-2">
                        {project.pitfalls.map((pitfall, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold mt-1">•</span>
                            <span className="text-slate-700">{pitfall}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h3 className="text-lg font-semibold text-green-700 mb-2">🎯 最终交付物</h3>
                      <p className="text-slate-700">{project.deliverables}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Projects
