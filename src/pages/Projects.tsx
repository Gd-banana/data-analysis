import React, { useState } from 'react';
import { FileText, AlertTriangle, Database, Sparkles, ArrowRight, Code } from 'lucide-react';
import OnlineCodeEditor from '@/components/OnlineCodeEditor';

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showEditor, setShowEditor] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      level: '入门',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      title: '数据预处理高阶版（铺垫所有算法前置能力）',
      coreKnowledge: '缺失值/重复值/异常值高阶处理、特征分桶、离散化、类别编码（LabelEncoder/OneHotEncoder）、数据标准化/归一化。',
      businessScenario: '电商用户行为数据预处理，为后续聚类、回归、关联规则等算法做准备（数据质量直接影响模型效果）。',
      tasks: '1. 读取模拟数据（user_behavior.csv），包含字段：用户ID、消费金额、消费频次、最近消费天数、性别、地区、注册时间、浏览时长；2. 缺失值处理：消费金额/频次缺失用「中位数」填充（避免均值受异常值影响），性别/地区缺失用「未知」填充，注册时间缺失直接删除；3. 异常值处理：用「箱线图+3σ原则」识别消费金额、浏览时长的异常值，采用「中位数替换」（不删除数据，避免样本损失）；4. 特征处理：① 消费金额分桶（低/中/高）；② 浏览时长离散化（短/中/长）；③ 性别/地区做OneHotEncoder编码；④ 注册时间提取「注册月份」特征；5. 数据标准化：对消费金额、消费频次、最近消费天数做StandardScaler标准化，保存处理后的数据（processed_data.csv）。',
      pitfalls: '用均值填充含异常值的字段（导致数据失真）；对所有类别字段都做OneHotEncoder（高基数字段如地区，会导致维度爆炸）；忘记标准化数据（后续聚类、回归模型会受量纲影响，结果偏差）。',
      deliverables: '① 预处理代码文件（preprocess.py）；② 处理前后的数据对比表（Excel）；③ 预处理总结（100字，说明处理逻辑和避免的问题）。',
      initialCode: `# 项目1：数据预处理高阶版
# 模拟电商用户行为数据预处理

print("=== 数据预处理高阶版")
print("=" * 50)

# 1. 创建模拟数据
data = [
    {"用户ID": 1, "消费金额": 1000, "消费频次": 5, "最近消费天数": 2, "性别": "男", "地区": "北京", "注册时间": "2024-01-15", "浏览时长": 30},
    {"用户ID": 2, "消费金额": 2000, "消费频次": 10, "最近消费天数": 1, "性别": "女", "地区": "上海", "注册时间": "2024-02-20", "浏览时长": 60},
    {"用户ID": 3, "消费金额": None, "消费频次": None, "最近消费天数": 5, "性别": None, "地区": None, "注册时间": None, "浏览时长": 45},
    {"用户ID": 4, "消费金额": 1500, "消费频次": 8, "最近消费天数": 3, "性别": "男", "地区": "广州", "注册时间": "2024-01-10", "浏览时长": 55},
    {"用户ID": 5, "消费金额": 99999, "消费频次": 999, "最近消费天数": 0, "性别": "女", "地区": "深圳", "注册时间": "2023-12-01", "浏览时长": 9999},
    {"用户ID": 6, "消费金额": 1800, "消费频次": 12, "最近消费天数": 1, "性别": "男", "地区": "北京", "注册时间": "2024-02-28", "浏览时长": 40},
    {"用户ID": 7, "消费金额": 1200, "消费频次": 6, "最近消费天数": 4, "性别": "女", "地区": "上海", "注册时间": "2024-01-20", "浏览时长": 35},
    {"用户ID": 1, "消费金额": 1000, "消费频次": 5, "最近消费天数": 2, "性别": "男", "地区": "北京", "注册时间": "2024-01-15", "浏览时长": 30},  # 重复数据
]

print("原始数据:")
for row in data:
    print(row)

# 2. 删除重复数据
print("\\n=== 2. 删除重复数据")
unique_data = []
seen_ids = set()
for row in data:
    if row["用户ID"] not in seen_ids:
        unique_data.append(row)
        seen_ids.add(row["用户ID"])
print(f"去重后数据量: {len(unique_data)}")

# 3. 缺失值处理
print("\\n=== 3. 缺失值处理")
amounts = [row["消费金额"] for row in unique_data if row["消费金额"] is not None]
freqs = [row["消费频次"] for row in unique_data if row["消费频次"] is not None
median_amount = sorted(amounts)[len(amounts) // 2]
median_freq = sorted(freqs)[len(freqs) // 2]

for row in unique_data:
    # 缺失值处理
    if row["消费金额"] is None:
        row["消费金额"] = median_amount
    if row["消费频次"] is None:
        row["消费频次"] = median_freq
    if row["性别"] is None:
        row["性别"] = "未知"
    if row["地区"] is None:
        row["地区"] = "未知"

# 删除注册时间为空的记录
clean_data = [row for row in unique_data if row["注册时间"] is not None]

print("缺失值处理后:")
for row in clean_data:
    print(row)

# 4. 异常值处理
print("\\n=== 4. 异常值处理")
# 使用IQR方法
amounts_clean = [row["消费金额"] for row in clean_data]
view_times = [row["浏览时长"] for row in clean_data]

# 消费金额异常值处理
sorted_amounts = sorted(amounts_clean)
q1_a = sorted_amounts[len(sorted_amounts) // 4]
q3_a = sorted_amounts[len(sorted_amounts) * 3 // 4]
iqr_a = q3_a - q1_a
lower_a = q1_a - 1.5 * iqr_a
upper_a = q3_a + 1.5 * iqr_a

for row in clean_data:
    if row["消费金额"] < lower_a or row["消费金额"] > upper_a:
        print(f"发现消费金额异常值: {row['消费金额']}, 用中位数替换")
        row["消费金额"] = median_amount

print("异常值处理完成")

# 5. 特征处理
print("\\n=== 5. 特征处理")
for row in clean_data:
    # 消费金额分桶
    if row["消费金额"] < 1300:
        row["消费金额等级"] = "低"
    elif row["消费金额"] < 1800:
        row["消费金额等级"] = "中"
    else:
        row["消费金额等级"] = "高"
    
    # 浏览时长离散化
    if row["浏览时长"] < 40:
        row["浏览时长等级"] = "短"
    elif row["浏览时长"] < 55:
        row["浏览时长等级"] = "中"
    else:
        row["浏览时长等级"] = "长"

    # 提取注册月份
    if row["注册时间"]:
        row["注册月份"] = int(row["注册时间"].split("-")[1])

print("特征处理后:")
for row in clean_data:
    print(row)

print("\\n✅ 预处理完成！")
`
    },
    {
      id: 2,
      level: '入门',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      title: '多维统计 + 深度相关性分析',
      coreKnowledge: '描述统计（均值/中位数/分位数）、皮尔逊相关系数、斯皮尔曼相关系数、相关性热力图、多因子关联研判。',
      businessScenario: '电商营收影响因子分析，找到「哪些指标影响营收」，为后续运营决策提供支撑。',
      tasks: '1. 读取项目1处理后的数据（processed_data.csv），新增「营收」字段（营收=消费金额×消费频次）；2. 做描述统计：计算营收、消费金额、消费频次、浏览时长的均值、中位数、四分位数、标准差，分析数据分布特征；3. 相关性分析：① 计算所有数值型字段（营收、消费金额等）的皮尔逊相关系数和斯皮尔曼相关系数；② 绘制相关性热力图（用seaborn）；4. 关联研判：分析「哪些指标与营收强相关（|r|>=0.7）」「哪些指标之间存在多重共线性（|r|>=0.8）」；5. 得出结论：明确影响营收的核心指标（至少2个），说明相关性方向（正/负相关）。',
      pitfalls: '混淆皮尔逊和斯皮尔曼相关系数（皮尔逊适用于线性关系，斯皮尔曼适用于非线性/有序分类关系）；误将「相关性」当作「因果关系」（如「浏览时长与营收正相关，不代表「增加浏览时长就能提升营收」）；热力图不调整颜色、不标注相关系数，导致无法清晰判断关联强度。',
      deliverables: '① 相关性分析代码文件（correlation_analysis.py）；② 描述统计表+相关性热力图；③ 关联分析结论（150字）。',
      initialCode: `# 项目2：多维统计 + 深度相关性分析
import math

print("=== 多维统计与相关性分析")
print("=" * 50)

# 使用项目1处理后的数据
data = [
    {"消费金额": 1000, "消费频次": 5, "最近消费天数": 2, "浏览时长": 30},
    {"消费金额": 2000, "消费频次": 10, "最近消费天数": 1, "浏览时长": 60},
    {"消费金额": 1500, "消费频次": 8, "最近消费天数": 3, "浏览时长": 55},
    {"消费金额": 1800, "消费频次": 12, "最近消费天数": 1, "浏览时长": 40},
    {"消费金额": 1200, "消费频次": 6, "最近消费天数": 4, "浏览时长": 35},
    {"消费金额": 2200, "消费频次": 15, "最近消费天数": 1, "浏览时长": 65},
    {"消费金额": 1300, "消费频次": 7, "最近消费天数": 3, "浏览时长": 45},
    {"消费金额": 1600, "消费频次": 9, "最近消费天数": 2, "浏览时长": 50},
]

# 计算营收
for row in data:
    row["营收"] = row["消费金额"] * row["消费频次"]

print("数据（含营收）:")
for i, row in enumerate(data):
    print(f"{i+1}. {row}")

# 1. 描述统计
print("\\n=== 1. 描述统计")
fields = ["消费金额", "消费频次", "最近消费天数", "浏览时长", "营收"]
for field in fields:
    values = [row[field] for row in data]
    n = len(values)
    mean = sum(values) / n
    sorted_v = sorted(values)
    median = sorted_v[n//2] if n % 2 else (sorted_v[n//2-1] + sorted_v[n//2]) / 2
    variance = sum((x - mean) ** 2 for x in values) / n
    std_dev = math.sqrt(variance)
    
    print(f"\\n{field}:")
    print(f"  均值: {mean:.2f}")
    print(f"  中位数: {median:.2f}")
    print(f"  标准差: {std_dev:.2f}")
    print(f"  最小值: {min(values)}, 最大值: {max(values)}")

# 2. 相关性分析
print("\\n=== 2. 相关性分析")

def pearson_corr(x, y):
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    numerator = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))
    denominator = math.sqrt(sum((xi - mean_x) ** 2 for xi in x) * sum((yi - mean_y) ** 2 for yi in y))
    return numerator / denominator if denominator != 0 else 0

print("\\n  营收与各指标的皮尔逊相关系数:")
revenue = [row["营收"] for row in data]
for field in ["消费金额", "消费频次", "浏览时长"]:
    values = [row[field] for row in data]
    corr = pearson_corr(revenue, values)
    print(f"    营收 & {field}: {corr:.4f}")
    if abs(corr) >= 0.7:
        print(f"      => 强相关！")
    elif abs(corr) >= 0.3:
        print(f"      => 中等相关")
    else:
        print(f"      => 弱相关或无相关")

print("\\n  各指标之间的相关性:")
fields_compare = [("消费金额", "消费频次"), ("消费金额", "浏览时长"), ("消费频次", "浏览时长")]
for field1, field2 in fields_compare:
    x = [row[field1] for row in data]
    y = [row[field2] for row in data]
    corr = pearson_corr(x, y)
    print(f"    {field1} & {field2}: {corr:.4f}")
    if abs(corr) >= 0.8:
        print(f"      => 可能存在多重共线性！")

print("\\n✅ 相关性分析完成！")
print("结论: 消费金额和消费频次对营收影响最大，呈正相关。")
`
    },
    {
      id: 3,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      title: '购物车关联规则挖掘（Apriori算法）',
      coreKnowledge: 'Apriori算法、频繁项集、关联规则（支持度、置信度、提升度）、商品组合分析、捆绑销售挖掘。',
      businessScenario: '电商购物车分析，挖掘「哪些商品经常一起被加入购物车」，为捆绑销售、商品陈列提供策略支撑（经典「啤酒尿布」场景）。',
      tasks: '1. 读取模拟购物车数据（cart_data.csv），包含字段：订单ID、商品名称（如「手机、耳机、充电器」）；2. 数据预处理：将每个订单的商品拆分，转换成one-hot编码格式（每行一个订单，每列一个商品，1=包含该商品，0=不包含）；3. 用Apriori算法挖掘频繁项集：设置最小支持度=0.05（频繁项集即「经常一起出现的商品组合」）；4. 生成关联规则：设置最小置信度=0.7，计算每条规则的支持度、置信度、提升度；5. 筛选有价值的规则：提升度>1（说明商品组合有协同效应），筛选出Top10关联规则；6. 业务建议：基于关联规则，给出3条捆绑销售建议（如「手机+耳机」捆绑打折）。',
      pitfalls: '支持度设置过高（导致没有频繁项集）或过低（导致频繁项集过多，无价值）；不筛选提升度，误将「无关商品组合」当作有效规则（如「矿泉水+手机」，提升度<=1）；商品名称有重复（如「耳机」和「无线耳机」被当作不同商品，影响关联结果）。',
      deliverables: '① 关联规则挖掘代码文件（apriori_analysis.py）；② Top10关联规则表（包含支持度、置信度、提升度）；③ 捆绑销售策略建议（200字）。',
      initialCode: `# 项目3：购物车关联规则挖掘（简化版Apriori）

print("=== 购物车关联规则挖掘")
print("=" * 50)

# 模拟购物车数据
cart_data = [
    {"订单ID": 1, "商品": ["手机", "耳机", "充电器"]},
    {"订单ID": 2, "商品": ["电脑", "充电器", "鼠标"]},
    {"订单ID": 3, "商品": ["手机", "耳机"]},
    {"订单ID": 4, "商品": ["手机", "耳机", "手机壳"]},
    {"订单ID": 5, "商品": ["电脑", "鼠标", "键盘"]},
    {"订单ID": 6, "商品": ["手机", "充电器", "手机壳"]},
    {"订单ID": 7, "商品": ["耳机", "充电器"]},
    {"订单ID": 8, "商品": ["手机", "耳机", "充电器"]},
    {"订单ID": 9, "商品": ["电脑", "鼠标"]},
    {"订单ID": 10, "商品": ["手机", "耳机"]},
]

print("购物车数据:")
for cart in cart_data:
    print(f"订单{cart['订单ID']}: {cart['商品']}")

# 1. 提取所有商品
all_items = set()
for cart in cart_data:
    for item in cart["商品"]:
        all_items.add(item)
all_items = sorted(all_items)
print(f"\\n所有商品: {all_items}")

# 2. 计算单个商品的支持度
n_transactions = len(cart_data)
print(f"\\n总订单数: {n_transactions}")

single_support = {}
for item in all_items:
    count = sum(1 for cart in cart_data if item in cart["商品"])
    support = count / n_transactions
    single_support[item] = support

print("\\n单个商品支持度:")
for item, support in single_support.items():
    print(f"  {item}: {support:.2%} (支持度)")

# 3. 计算商品组合的支持度
print("\\n=== 3. 商品组合分析")
pairs = []
for i in range(len(all_items)):
    for j in range(i+1, len(all_items)):
        pairs.append((all_items[i], all_items[j]))

pair_support = {}
for item1, item2 in pairs:
    count = sum(1 for cart in cart_data if item1 in cart["商品"] and item2 in cart["商品"])
    support = count / n_transactions
    pair_support[(item1, item2)] = support

# 筛选最小支持度0.2的组合
min_support = 0.2
freq_pairs = [(items, support in pair_support.items() if support >= min_support]

print(f"\\n频繁商品组合 (支持度>=20%):")
for (item1, item2), support in freq_pairs:
    print(f"  {item1} + {item2}: {support:.2%}")

# 4. 计算关联规则
print("\\n=== 4. 关联规则")
min_confidence = 0.5
rules = []

for (item1, item2), support_ab in freq_pairs:
    support_a = single_support[item1]
    confidence = support_ab / support_a
    lift = confidence / single_support[item2]
    rules.append((item1, item2, support_ab, confidence, lift)

# 按提升度排序
rules_sorted = sorted(rules, key=lambda x: x[4], reverse=True)[:5]

print("\\nTop关联规则 (按提升度排序):")
print("规则".ljust(30) + "支持度".ljust(12) + "置信度".ljust(12) + "提升度")
print("-" * 70)
for item1, item2, supp, conf, lift in rules_sorted:
    rule_str = f"{item1} => {item2}"
    print(f"{rule_str.ljust(30)}{supp:.2%}{' '.ljust(8)}{conf:.2%}{' '.ljust(8)}{lift:.2f}")
    if lift > 1:
        print(f"  => 正相关！适合捆绑销售！")

print("\\n✅ 关联规则挖掘完成！")
print("建议: 手机和耳机提升度最高，强烈建议捆绑销售！")
`
    },
    {
      id: 4,
      level: '入门',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      title: 'KMeans 聚类分析实战（用户+商品双场景）',
      coreKnowledge: 'KMeans聚类算法、数据标准化、肘部法则（确定k值）、聚类可视化、聚类结果解读、业务落地。',
      businessScenario: '电商用户分群+商品分群，实现「精准运营+商品优化」，比如对高价值用户推送专属福利，对爆款商品加大库存。',
      tasks: '1. 用户聚类：① 读取项目1处理后的数据，选择特征：消费金额、消费频次、最近消费天数、浏览时长；② 标准化数据；③ 用肘部法则确定最优k值（k=3~5）；④ 用KMeans聚类，给用户打上分群标签；⑤ 分析每个分群的用户特征（如「分群1：高消费、高频次、最近消费近」）；2. 商品聚类：① 读取模拟商品数据（goods_data.csv），包含字段：商品ID、销量、客单价、好评率、库存；② 标准化数据；③ 确定最优k值，KMeans聚类；④ 分析每个分群的商品特征（如「分群1：高销量、高客单价、高好评率」）；3. 可视化：用PCA降维，绘制用户聚类、商品聚类的可视化图表（标注分群标签）；4. 业务落地：针对每个用户分群、商品分群，各给出2条运营/优化建议。',
      pitfalls: '聚类前不标准化数据（如消费金额（万元级）和浏览时长（分钟级），量纲差异导致聚类偏差）；盲目设置k值（不做肘部法则，直接设k=4，导致分群无业务意义）；只做聚类，不解读分群特征、不落地业务建议（沦为「炫技」，无实际价值）。',
      deliverables: '① 聚类分析代码文件（kmeans_analysis.py）；② 肘部法则图、聚类可视化图；③ 分群特征解读+业务建议（300字）。',
      initialCode: `# 项目4：KMeans聚类分析实战（简化版）
import math
import random

print("=== KMeans 用户分群")
print("=" * 50)

# 用户数据
user_data = [
    {"用户ID": 1, "消费金额": 1000, "消费频次": 5, "最近消费天数": 2},
    {"用户ID": 2, "消费金额": 2000, "消费频次": 10, "最近消费天数": 1},
    {"用户ID": 3, "消费金额": 500, "消费频次": 2, "最近消费天数": 10},
    {"用户ID": 4, "消费金额": 1500, "消费频次": 8, "最近消费天数": 3},
    {"用户ID": 5, "消费金额": 300, "消费频次": 1, "最近消费天数": 15},
    {"用户ID": 6, "消费金额": 2500, "消费频次": 15, "最近消费天数": 1},
    {"用户ID": 7, "消费金额": 800, "消费频次": 3, "最近消费天数": 7},
    {"用户ID": 8, "消费金额": 1800, "消费频次": 12, "最近消费天数": 2},
    {"用户ID": 9, "消费金额": 400, "消费频次": 2, "最近消费天数": 12},
    {"用户ID": 10, "消费金额": 2200, "消费频次": 14, "最近消费天数": 1},
]

print("用户数据:")
for user in user_data:
    print(user)

# 1. 数据标准化
print("\\n=== 1. 数据标准化")
fields = ["消费金额", "消费频次", "最近消费天数"]

# 计算均值和标准差
means = {}
stds = {}
for field in fields:
    values = [user[field] for user in user_data]
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    std = math.sqrt(variance)
    means[field] = mean
    stds[field] = std

# 标准化数据
normalized_data = []
for user in user_data:
    norm_user = {"用户ID": user["用户ID"]}
    for field in fields:
        norm_user[field] = (user[field] - means[field]) / stds[field]
    normalized_data.append(norm_user)

print("标准化完成")

# 2. KMeans聚类实现
print("\\n=== 2. KMeans聚类 (k=3)")

def euclidean_distance(p1, p2):
    return math.sqrt(sum((p1[f] - p2[f]) ** 2 for f in fields))

k = 3
# 随机初始化中心
random.seed(42)
centroids = random.sample(normalized_data, k)
centroids = [{f: c[f] for f in fields} for c in centroids]

max_iter = 10
for iteration in range(max_iter):
    # 分配到簇
    clusters = [[] for _ in range(k)]
    for user in normalized_data:
        distances = [euclidean_distance(user, centroid) for centroid in centroids]
        cluster_idx = distances.index(min(distances))
        clusters[cluster_idx].append(user["用户ID"])
    
    # 更新中心
    new_centroids = []
    for i in range(k):
        cluster_users = [user for user in normalized_data if user["用户ID"] in clusters[i]]
        if cluster_users:
            new_centroid = {}
            for field in fields:
                new_centroid[field] = sum(user[field] for user in cluster_users) / len(cluster_users)
            new_centroids.append(new_centroid)
        else:
            new_centroids.append(centroids[i])
    
    if new_centroids == centroids:
        break
    centroids = new_centroids

print(f"迭代{iteration + 1}次后收敛")

# 3. 结果分析
print("\\n=== 3. 聚类结果分析")
for i in range(k):
    print(f"\\n分群 {i+1}:")
    cluster_users = [user for user in user_data if user["用户ID"] in clusters[i]]
    print(f"用户数量: {len(cluster_users)}")
    if cluster_users:
        avg_amount = sum(u["消费金额"] for u in cluster_users) / len(cluster_users)
        avg_freq = sum(u["消费频次"] for u in cluster_users) / len(cluster_users)
        avg_days = sum(u["最近消费天数"] for u in cluster_users) / len(cluster_users)
        print(f"平均消费金额: {avg_amount:.0f}")
        print(f"平均消费频次: {avg_freq:.1f}")
        print(f"平均最近消费天数: {avg_days:.1f}")
        
        # 业务标签
        if avg_amount > 1500 and avg_freq > 8:
            print("=> 高价值用户 - 推送专属福利！")
        elif avg_days > 7:
            print("=> 沉睡用户 - 需要激活！")
        else:
            print("=> 普通用户 - 保持关注")

print("\\n✅ 聚类分析完成！")
`
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">10个阶梯式实战项目</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">从入门到综合，覆盖所有重点分析方法</p>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`${project.color} px-3 py-1 rounded-lg text-sm font-semibold`}>{project.level}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.id}. {project.title}
                      </h2>
                    </div>
                  </div>
                  <span className="text-gray-400 text-2xl">{expandedId === project.id ? '−' : '+'}</span>
                </div>
              </div>

              {expandedId === project.id && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        核心知识点
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{project.coreKnowledge}</p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-400 mb-2 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        业务场景
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{project.businessScenario}</p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                      <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">详细任务要求</h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{project.tasks}</p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
                      <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        新手必踩坑
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{project.pitfalls}</p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        最终交付物
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{project.deliverables}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => setShowEditor(showEditor === project.id ? null : project.id)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                      >
                        <Code className="w-5 h-5" />
                        <span>{showEditor === project.id ? '收起代码编辑器' : '打开代码编辑器'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {showEditor === project.id && (
                      <div className="mt-4">
                        <OnlineCodeEditor initialCode={project.initialCode} height="600px" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
`
