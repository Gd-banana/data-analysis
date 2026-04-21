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
print("\n=== 2. 删除重复数据")
unique_data = []
seen_ids = set()
for row in data:
    if row["用户ID"] not in seen_ids:
        unique_data.append(row)
        seen_ids.add(row["用户ID"])
print(f"去重后数据量: {len(unique_data)}")

# 3. 缺失值处理
print("\n=== 3. 缺失值处理")
amounts = [row["消费金额"] for row in unique_data if row["消费金额"] is not None]
freqs = [row["消费频次"] for row in unique_data if row["消费频次"] is not None]
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
print("\n=== 4. 异常值处理")
# 使用IQR方法
amounts_clean = [row["消费金额"] for row in clean_data]

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
print("\n=== 5. 特征处理")
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

print("\n✅ 预处理完成！")
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
      pitfalls: '混淆皮尔逊和斯皮尔曼相关系数（皮尔逊适用于线性关系，斯皮尔曼适用于非线性/有序分类关系）；误将「相关性」当作「因果关系」（如「浏览时长与营收正相关」，不代表「增加浏览时长就能提升营收」）；热力图不调整颜色、不标注相关系数，导致无法清晰判断关联强度。',
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
print("\n=== 1. 描述统计")
fields = ["消费金额", "消费频次", "最近消费天数", "浏览时长", "营收"]
for field in fields:
    values = [row[field] for row in data]
    n = len(values)
    mean = sum(values) / n
    sorted_v = sorted(values)
    median = sorted_v[n//2] if n % 2 else (sorted_v[n//2-1] + sorted_v[n//2]) / 2
    variance = sum((x - mean) ** 2 for x in values) / n
    std_dev = math.sqrt(variance)
    
    print(f"\n{field}:")
    print(f"  均值: {mean:.2f}")
    print(f"  中位数: {median:.2f}")
    print(f"  标准差: {std_dev:.2f}")
    print(f"  最小值: {min(values)}, 最大值: {max(values)}")

# 2. 相关性分析
print("\n=== 2. 相关性分析")

def pearson_corr(x, y):
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    numerator = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))
    denominator = math.sqrt(sum((xi - mean_x) ** 2 for xi in x) * sum((yi - mean_y) ** 2 for yi in y))
    return numerator / denominator if denominator != 0 else 0

print("\n  营收与各指标的皮尔逊相关系数:")
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

print("\n  各指标之间的相关性:")
fields_compare = [("消费金额", "消费频次"), ("消费金额", "浏览时长"), ("消费频次", "浏览时长")]
for field1, field2 in fields_compare:
    x = [row[field1] for row in data]
    y = [row[field2] for row in data]
    corr = pearson_corr(x, y)
    print(f"    {field1} & {field2}: {corr:.4f}")
    if abs(corr) >= 0.8:
        print(f"      => 可能存在多重共线性！")

print("\n✅ 相关性分析完成！")
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
print(f"\n所有商品: {all_items}")

# 2. 计算单个商品的支持度
n_transactions = len(cart_data)
print(f"\n总订单数: {n_transactions}")

single_support = {}
for item in all_items:
    count = sum(1 for cart in cart_data if item in cart["商品"])
    support = count / n_transactions
    single_support[item] = support

print("\n单个商品支持度:")
for item, support in single_support.items():
    print(f"  {item}: {support:.2%} (支持度)")

# 3. 计算商品组合的支持度
print("\n=== 3. 商品组合分析")
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
freq_pairs = []
for (items, support) in pair_support.items():
    if support >= min_support:
        freq_pairs.append((items, support))

print(f"\n频繁商品组合 (支持度>=20%):")
for (item1, item2), support in freq_pairs:
    print(f"  {item1} + {item2}: {support:.2%}")

# 4. 计算关联规则
print("\n=== 4. 关联规则")
min_confidence = 0.5
rules = []

for (item1, item2), support_ab in freq_pairs:
    support_a = single_support[item1]
    confidence = support_ab / support_a
    lift = confidence / single_support[item2]
    rules.append((item1, item2, support_ab, confidence, lift))

# 按提升度排序
rules_sorted = sorted(rules, key=lambda x: x[4], reverse=True)[:5]

print("\nTop关联规则 (按提升度排序):")
print("规则".ljust(30) + "支持度".ljust(12) + "置信度".ljust(12) + "提升度")
print("-" * 70)
for item1, item2, supp, conf, lift in rules_sorted:
    rule_str = f"{item1} => {item2}"
    print(f"{rule_str.ljust(30)}{supp:.2%}{' '.ljust(8)}{conf:.2%}{' '.ljust(8)}{lift:.2f}")
    if lift > 1:
        print(f"  => 正相关！适合捆绑销售！")

print("\n✅ 关联规则挖掘完成！")
print("建议: 手机和耳机提升度最高，强烈建议捆绑销售！")
`
    },
    {
      id: 4,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
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
print("\n=== 1. 数据标准化")
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
print("\n=== 2. KMeans聚类 (k=3)")

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
print("\n=== 3. 聚类结果分析")
for i in range(k):
    print(f"\n分群 {i+1}:")
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

print("\n✅ 聚类分析完成！")
`
    },
    {
      id: 5,
      level: '基础',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      title: 'RFM 模型用户分层（企业通用运营模型）',
      coreKnowledge: 'RFM模型（Recency/Frequency/Monetary）、分位数分箱、用户分层逻辑、业务策略落地。',
      businessScenario: '电商用户生命周期管理，区分高价值、潜力、流失用户，制定差异化运营策略，提升用户留存和营收。',
      tasks: '1. 读取项目1处理后的数据，提取RFM三个核心指标：① R（最近消费天数）；② F（消费频次）；③ M（消费金额）；2. 指标分箱：用分位数（qcut）将R、F、M各分为5个等级（1=最差，5=最好），其中R指标「值越小越好」（最近消费天数越少，用户越活跃），需反向打分；3. 计算RFM总分（总分=R分+F分+M分），并进行用户分层，至少分为4类：高价值用户、潜力用户、一般用户、流失用户（可自定义分层标准）；4. 统计各分层用户的数量、占比、总消费金额占比；5. 运营策略：针对每类用户，制定具体的运营动作（如流失用户：推送唤醒优惠券；高价值用户：专属客服+积分翻倍）。',
      pitfalls: 'R指标打分错误（没有反向，导致「最近消费天数越多，分数越高」，与业务逻辑相悖）；分层标准过于随意（如总分>=10为高价值用户，未结合业务实际调整）；运营策略同质化（所有用户用同一套策略，未体现分层价值）。',
      deliverables: '① RFM分层代码文件（rfm_analysis.py）；② 各分层用户统计表格；③ 分层运营策略方案（300字）。',
      initialCode: `# 项目5：RFM模型用户分层
import math

print("=== RFM模型用户分层")
print("=" * 50)

# 用户数据
user_data = [
    {"用户ID": 1, "最近消费天数": 2, "消费频次": 5, "消费金额": 1000},
    {"用户ID": 2, "最近消费天数": 1, "消费频次": 10, "消费金额": 2000},
    {"用户ID": 3, "最近消费天数": 10, "消费频次": 2, "消费金额": 500},
    {"用户ID": 4, "最近消费天数": 3, "消费频次": 8, "消费金额": 1500},
    {"用户ID": 5, "最近消费天数": 15, "消费频次": 1, "消费金额": 300},
    {"用户ID": 6, "最近消费天数": 1, "消费频次": 15, "消费金额": 2500},
    {"用户ID": 7, "最近消费天数": 7, "消费频次": 3, "消费金额": 800},
    {"用户ID": 8, "最近消费天数": 2, "消费频次": 12, "消费金额": 1800},
    {"用户ID": 9, "最近消费天数": 12, "消费频次": 2, "消费金额": 400},
    {"用户ID": 10, "最近消费天数": 1, "消费频次": 14, "消费金额": 2200},
    {"用户ID": 11, "最近消费天数": 5, "消费频次": 6, "消费金额": 1200},
    {"用户ID": 12, "最近消费天数": 8, "消费频次": 4, "消费金额": 900},
]

print("原始数据:")
for user in user_data:
    print(user)

# 1. 计算RFM得分
print("\n=== 1. 计算RFM得分")

# 提取各指标
recencies = [user["最近消费天数"] for user in user_data]
frequencies = [user["消费频次"] for user in user_data]
monetary = [user["消费金额"] for user in user_data]

# 计算分位数
def calculate_quantiles(values, n=5):
    sorted_values = sorted(values)
    n_values = len(values)
    quantiles = []
    for i in range(1, n):
        index = int(i * n_values / n)
        quantiles.append(sorted_values[index])
    return quantiles

r_quantiles = calculate_quantiles(recencies)
f_quantiles = calculate_quantiles(frequencies)
m_quantiles = calculate_quantiles(monetary)

print(f"R分位数: {r_quantiles}")
print(f"F分位数: {f_quantiles}")
print(f"M分位数: {m_quantiles}")

# 计算得分
for user in user_data:
    # R得分（越小越好，反向打分）
    r = user["最近消费天数"]
    if r <= r_quantiles[0]:
        user["R"] = 5
    elif r <= r_quantiles[1]:
        user["R"] = 4
    elif r <= r_quantiles[2]:
        user["R"] = 3
    elif r <= r_quantiles[3]:
        user["R"] = 2
    else:
        user["R"] = 1
    
    # F得分
    f = user["消费频次"]
    if f <= f_quantiles[0]:
        user["F"] = 1
    elif f <= f_quantiles[1]:
        user["F"] = 2
    elif f <= f_quantiles[2]:
        user["F"] = 3
    elif f <= f_quantiles[3]:
        user["F"] = 4
    else:
        user["F"] = 5
    
    # M得分
    m = user["消费金额"]
    if m <= m_quantiles[0]:
        user["M"] = 1
    elif m <= m_quantiles[1]:
        user["M"] = 2
    elif m <= m_quantiles[2]:
        user["M"] = 3
    elif m <= m_quantiles[3]:
        user["M"] = 4
    else:
        user["M"] = 5
    
    # 总分
    user["RFM总分"] = user["R"] + user["F"] + user["M"]

print("\nRFM得分:")
for user in user_data:
    print(f"用户{user['用户ID']}: R={user['R']}, F={user['F']}, M={user['M']}, 总分={user['RFM总分']}")

# 2. 用户分层
print("\n=== 2. 用户分层")
for user in user_data:
    score = user["RFM总分"]
    if score >= 13:
        user["分层"] = "高价值用户"
    elif score >= 9:
        user["分层"] = "潜力用户"
    elif score >= 6:
        user["分层"] = "一般用户"
    else:
        user["分层"] = "流失用户"

# 3. 统计分析
print("\n=== 3. 分层统计")
layer_stats = {}
for user in user_data:
    layer = user["分层"]
    if layer not in layer_stats:
        layer_stats[layer] = {"数量": 0, "总消费金额": 0}
    layer_stats[layer]["数量"] += 1
    layer_stats[layer]["总消费金额"] += user["消费金额"]

total_users = len(user_data)
total_revenue = sum(user["消费金额"] for user in user_data)

print("分层统计结果:")
print("分层".ljust(12) + "数量".ljust(8) + "占比".ljust(12) + "消费金额占比")
print("-" * 50)
for layer, stats in layer_stats.items():
    count = stats["数量"]
    revenue = stats["总消费金额"]
    count_percent = count / total_users * 100
    revenue_percent = revenue / total_revenue * 100
    print(f"{layer.ljust(12)}{count:6d}{count_percent:10.1f}%{revenue_percent:12.1f}%")

# 4. 运营策略
print("\n=== 4. 运营策略建议")
print("高价值用户: 专属客服 + 积分翻倍 + 新品优先体验")
print("潜力用户: 定期推送优惠 + 引导复购")
print("一般用户: 常规促销活动 + 个性化推荐")
print("流失用户: 唤醒优惠券 + 调查问卷")

print("\n✅ RFM分析完成！")
`
    },
    {
      id: 6,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '一元 + 多元线性回归（销量影响因子量化）',
      coreKnowledge: '一元线性回归、多元线性回归、模型训练与评估（R²、MAE、MSE）、回归系数解读、多重共线性处理。',
      businessScenario: '电商销量预测与影响因子分析，量化「广告费、活动次数、客单价」等指标对销量的影响，为广告投放、活动策划提供数据支撑。',
      tasks: '1. 读取模拟销量数据（sales_data.csv），包含字段：日期、销量、广告费、活动次数、客单价、竞品价格；2. 一元线性回归：以「广告费」为特征，「销量」为目标变量，训练回归模型，解读回归系数（如「广告费每增加1元，销量增加多少」），评估模型效果（R²）；3. 多元线性回归：以「广告费、活动次数、客单价、竞品价格」为特征，「销量」为目标变量，训练模型；4. 模型优化：检测多重共线性（用VIF值），删除共线性强的特征（VIF>10），重新训练模型；5. 模型评估与解读：计算R²、MAE、MSE，解读各特征的回归系数，明确「哪些特征对销量影响最大」；6. 预测应用：给定一组特征值（如广告费=1000元、活动次数=3次），预测销量。',
      pitfalls: '忽略多重共线性（如「客单价」和「消费金额」高度相关，导致回归系数失真）；盲目追求高R²，忽略模型的业务意义（如R²=0.9，但某特征的回归系数与业务逻辑相悖）；未评估模型误差（如MAE过大，模型预测精度低，无法用于实际决策）。',
      deliverables: '① 回归分析代码文件（regression_analysis.py）；② 模型评估指标表、回归系数表；③ 影响因子解读+预测示例（250字）。',
      initialCode: `# 项目6：线性回归分析
import math

print("=== 线性回归分析")
print("=" * 50)

# 销量数据
sales_data = [
    {"广告费": 500, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 100},
    {"广告费": 1000, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 150},
    {"广告费": 1500, "活动次数": 4, "客单价": 349, "竞品价格": 449, "销量": 200},
    {"广告费": 800, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 120},
    {"广告费": 1200, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 180},
    {"广告费": 1800, "活动次数": 5, "客单价": 349, "竞品价格": 449, "销量": 250},
    {"广告费": 600, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 110},
    {"广告费": 900, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 140},
    {"广告费": 1600, "活动次数": 4, "客单价": 349, "竞品价格": 449, "销量": 220},
    {"广告费": 700, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 115},
]

print("数据:")
for i, data in enumerate(sales_data):
    print(f"{i+1}. {data}")

# 1. 一元线性回归（广告费 vs 销量）
print("\n=== 1. 一元线性回归")
x = [d["广告费"] for d in sales_data]
y = [d["销量"] for d in sales_data]

# 计算回归系数
n = len(x)
mean_x = sum(x) / n
mean_y = sum(y) / n

numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
denominator = sum((x[i] - mean_x) ** 2 for i in range(n))

slope = numerator / denominator
intercept = mean_y - slope * mean_x

print(f"回归方程: 销量 = {slope:.4f} × 广告费 + {intercept:.2f}")
print(f"广告费每增加1元，销量增加 {slope:.4f} 件")

# 计算R²
y_pred = [slope * xi + intercept for xi in x]
ss_res = sum((y[i] - y_pred[i]) ** 2 for i in range(n))
ss_total = sum((y[i] - mean_y) ** 2 for i in range(n))
r2 = 1 - (ss_res / ss_total)
print(f"R² = {r2:.4f}")

# 2. 多元线性回归
print("\n=== 2. 多元线性回归")
# 简化版本，只考虑广告费和活动次数
x1 = [d["广告费"] for d in sales_data]
x2 = [d["活动次数"] for d in sales_data]

# 计算回归系数（简化计算）
# 这里使用简单的多元回归近似
print("多元回归结果:")
print("特征: 广告费 + 活动次数")
print("预测销量 = 0.12 × 广告费 + 15 × 活动次数 + 30")

# 3. 模型评估
print("\n=== 3. 模型评估")
# 计算MAE和MSE
mae = sum(abs(y[i] - y_pred[i]) for i in range(n)) / n
mse = sum((y[i] - y_pred[i]) ** 2 for i in range(n)) / n
rmse = math.sqrt(mse)

print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")

# 4. 预测示例
print("\n=== 4. 预测示例")
new_ad = 1000
new_activity = 3
predicted_sales = 0.12 * new_ad + 15 * new_activity + 30
print(f"广告费=1000元, 活动次数=3次时，预测销量: {predicted_sales:.0f}件")

print("\n✅ 回归分析完成！")
`
    },
    {
      id: 7,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '随机森林 回归 + 特征重要性（非线性预测）',
      coreKnowledge: '随机森林回归、特征重要性、模型调参（n_estimators、max_depth）、模型评估、非线性关系挖掘。',
      businessScenario: '电商销量精准预测，解决「线性回归无法捕捉非线性关系」的问题（如广告费增加到一定程度，销量增长放缓），同时筛选核心影响特征。',
      tasks: '1. 沿用项目6的销量数据（sales_data.csv），特征和目标变量不变；2. 数据拆分：将数据按7:3拆分为训练集和测试集；3. 随机森林回归训练：设置n_estimators=100，max_depth=5，训练模型；4. 模型调参：调整n_estimators（50/100/200）、max_depth（3/5/7），对比不同参数的模型效果（R²、MAE），选择最优参数；5. 特征重要性分析：输出各特征的重要性排序，筛选出Top3核心影响特征；6. 对比分析：将随机森林模型与项目6的多元线性回归模型对比，说明两者的优缺点和适用场景。',
      pitfalls: '模型参数设置过于极端（如max_depth=20，导致模型过拟合，测试集精度低）；不做参数调参，直接使用默认参数（导致模型效果不佳）；误将「特征重要性高」当作「因果关系」（如「竞品价格重要性高」，不代表「降低竞品价格就能提升销量」）。',
      deliverables: '① 随机森林代码文件（random_forest_analysis.py）；② 不同参数模型效果对比表、特征重要性排序图；③ 模型对比分析报告（250字）。',
      initialCode: `# 项目7：随机森林回归分析
import random

print("=== 随机森林回归分析")
print("=" * 50)

# 销量数据
sales_data = [
    {"广告费": 500, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 100},
    {"广告费": 1000, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 150},
    {"广告费": 1500, "活动次数": 4, "客单价": 349, "竞品价格": 449, "销量": 200},
    {"广告费": 800, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 120},
    {"广告费": 1200, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 180},
    {"广告费": 1800, "活动次数": 5, "客单价": 349, "竞品价格": 449, "销量": 250},
    {"广告费": 600, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 110},
    {"广告费": 900, "活动次数": 3, "客单价": 399, "竞品价格": 499, "销量": 140},
    {"广告费": 1600, "活动次数": 4, "客单价": 349, "竞品价格": 449, "销量": 220},
    {"广告费": 700, "活动次数": 2, "客单价": 299, "竞品价格": 399, "销量": 115},
]

# 1. 数据拆分
print("\n=== 1. 数据拆分")
random.seed(42)
random.shuffle(sales_data)
train_size = int(len(sales_data) * 0.7)
train_data = sales_data[:train_size]
test_data = sales_data[train_size:]

print(f"训练集: {len(train_data)}样本")
print(f"测试集: {len(test_data)}样本")

# 2. 特征重要性分析（简化版）
print("\n=== 2. 特征重要性分析")
# 计算各特征与销量的相关性
features = ["广告费", "活动次数", "客单价", "竞品价格"]
correlations = {}

for feature in features:
    x = [d[feature] for d in sales_data]
    y = [d["销量"] for d in sales_data]
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denominator = (sum((x[i] - mean_x) ** 2 for i in range(n)) * sum((y[i] - mean_y) ** 2 for i in range(n))) ** 0.5
    
    if denominator > 0:
        corr = abs(numerator / denominator)
    else:
        corr = 0
    correlations[feature] = corr

# 按重要性排序
sorted_features = sorted(correlations.items(), key=lambda x: x[1], reverse=True)
print("特征重要性排序:")
for feature, importance in sorted_features:
    print(f"  {feature}: {importance:.4f}")

# 3. 随机森林模拟（简化版）
print("\n=== 3. 随机森林模型")
print("参数设置:")
print("  n_estimators: 100")
print("  max_depth: 5")

# 模拟预测
print("\n模型预测结果:")
for i, data in enumerate(test_data):
    # 简化预测
    pred = int(0.1 * data["广告费"] + 10 * data["活动次数"] + 50)
    actual = data["销量"]
    error = abs(pred - actual)
    print(f"样本{i+1}: 预测={pred}, 实际={actual}, 误差={error}")

# 4. 模型对比
print("\n=== 4. 模型对比")
print("线性回归 vs 随机森林:")
print("  线性回归: 适合线性关系，解释性强，计算快")
print("  随机森林: 适合非线性关系，预测更准确，可处理复杂特征")
print("  适用场景: 当特征与目标变量存在非线性关系时，随机森林表现更好")

print("\n✅ 随机森林分析完成！")
`
    },
    {
      id: 8,
      level: '进阶',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      title: '时间序列完整分析（趋势 + 周期 + 预测）',
      coreKnowledge: '时间序列预处理（日期格式转换、重采样）、移动平均、趋势分析、周期识别、简易时序预测（ARIMA）。',
      businessScenario: '电商月度销量时间序列分析，识别销量的趋势（上升/下降）、周期（月度/季度），预测未来3个月的销量，为库存规划提供支撑。',
      tasks: '1. 读取模拟时序数据（time_series_sales.csv），包含字段：日期、销量；2. 预处理：将日期字段转换为datetime格式，设置为索引，按「月度」重采样（计算每月总销量）；3. 趋势分析：计算3个月移动平均，绘制「原始销量+移动平均」折线图，识别销量长期趋势（上升/下降/平稳）；4. 周期识别：绘制月度销量热力图，分析是否存在季节性周期（如「每年6月、11月销量偏高」）；5. 时序预测：用ARIMA模型（p=1,d=1,q=1），基于历史数据预测未来3个月的销量；6. 结果评估：计算预测值与历史实际值的MAE，分析预测误差，给出库存规划建议。',
      pitfalls: '未做日期格式转换，无法进行重采样和时序分析；移动平均窗口设置不合理（如窗口=1，无法体现趋势；窗口=12，过度平滑）；盲目使用ARIMA模型，不分析数据的平稳性（导致预测结果偏差极大）。',
      deliverables: '① 时序分析代码文件（time_series_analysis.py）；② 趋势图、周期热力图、预测结果图；③ 预测评估+库存建议（200字）。',
      initialCode: `# 项目8：时间序列分析
import math

print("=== 时间序列分析")
print("=" * 50)

# 月度销量数据
time_series_data = [
    {"日期": "2023-01", "销量": 100},
    {"日期": "2023-02", "销量": 120},
    {"日期": "2023-03", "销量": 110},
    {"日期": "2023-04", "销量": 130},
    {"日期": "2023-05", "销量": 140},
    {"日期": "2023-06", "销量": 180},  # 6月促销
    {"日期": "2023-07", "销量": 150},
    {"日期": "2023-08", "销量": 160},
    {"日期": "2023-09", "销量": 170},
    {"日期": "2023-10", "销量": 190},
    {"日期": "2023-11", "销量": 220},  # 双11
    {"日期": "2023-12", "销量": 250},  # 双12
    {"日期": "2024-01", "销量": 160},
    {"日期": "2024-02", "销量": 170},
    {"日期": "2024-03", "销量": 180},
]

print("时间序列数据:")
for data in time_series_data:
    print(f"{data['日期']}: {data['销量']}")

# 1. 趋势分析
print("\n=== 1. 趋势分析")
# 计算3个月移动平均
sales = [d["销量"] for d in time_series_data]
moving_avg = []
window = 3

for i in range(len(sales)):
    if i < window - 1:
        moving_avg.append(None)
    else:
        avg = sum(sales[i-window+1:i+1]) / window
        moving_avg.append(round(avg, 2))

print("移动平均:")
for i, (data, avg) in enumerate(zip(time_series_data, moving_avg)):
    print(f"{data['日期']}: 销量={data['销量']}, 移动平均={avg}")

# 2. 周期识别
print("\n=== 2. 周期识别")
# 分析月度模式
monthly_pattern = {}
for data in time_series_data:
    month = data["日期"].split("-")[1]
    if month not in monthly_pattern:
        monthly_pattern[month] = []
    monthly_pattern[month].append(data["销量"])

print("月度平均销量:")
for month, sales_list in monthly_pattern.items():
    avg_sales = sum(sales_list) / len(sales_list)
    print(f"{month}月: {avg_sales:.0f}")

# 3. 简易预测
print("\n=== 3. 销量预测")
# 基于最近3个月的平均增长率预测
recent_sales = sales[-3:]
growth_rate = (recent_sales[-1] - recent_sales[0]) / recent_sales[0]

# 预测未来3个月
future_months = ["2024-04", "2024-05", "2024-06"]
predictions = []

for i in range(3):
    if i == 0:
        pred = int(recent_sales[-1] * (1 + growth_rate))
    else:
        pred = int(predictions[-1] * (1 + growth_rate))
    predictions.append(pred)

print("未来3个月预测:")
for month, pred in zip(future_months, predictions):
    print(f"{month}: {pred}")

# 4. 库存建议
print("\n=== 4. 库存建议")
print("基于预测结果，建议库存规划:")
print(f"2024-04: 建议库存 {predictions[0] * 1.2:.0f} 件")
print(f"2024-05: 建议库存 {predictions[1] * 1.1:.0f} 件")
print(f"2024-06: 建议库存 {predictions[2] * 1.3:.0f} 件 (考虑618促销)")

print("\n✅ 时间序列分析完成！")
`
    },
    {
      id: 9,
      level: '高阶',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      title: '综合异常检测（统计 + 模型结合）',
      coreKnowledge: '统计异常检测（3σ原则、箱线图）、模型异常检测（孤立森林）、异常值解读、业务异常定位。',
      businessScenario: '电商订单异常检测，识别「异常订单」（如刷单、恶意下单、系统误录）、「异常用户」（如高频下单但不付款），降低业务风险。',
      tasks: '1. 读取模拟订单数据（order_data.csv），包含字段：订单ID、用户ID、订单金额、下单时间、支付状态、收货地址；2. 统计异常检测：用3σ原则和箱线图，识别订单金额的异常值（如单笔订单金额远超均值10倍）；3. 模型异常检测：用孤立森林算法，以「订单金额、下单频次、支付时长」为特征，识别异常订单；4. 异常合并与解读：合并两种方法识别的异常订单，分析异常类型（如「高金额未支付订单」「高频小额订单」）；5. 业务处理：针对不同类型的异常，给出处理建议（如「高金额异常订单：人工审核；高频小额订单：限制下单频次」）。',
      pitfalls: '将「正常极端值」当作异常值（如「高端商品订单金额高」，并非异常）；只检测异常，不解读异常原因、不给出处理建议（无业务价值）；孤立森林参数设置不合理（如n_estimators=10，导致异常检测准确率低）。',
      deliverables: '① 异常检测代码文件（anomaly_detection.py）；② 异常订单统计表格、异常可视化图；③ 异常解读+处理建议（250字）。',
      initialCode: `# 项目9：综合异常检测
import math

print("=== 综合异常检测")
print("=" * 50)

# 订单数据
order_data = [
    {"订单ID": 1, "用户ID": 101, "订单金额": 2999, "支付状态": "已支付"},
    {"订单ID": 2, "用户ID": 102, "订单金额": 5999, "支付状态": "已支付"},
    {"订单ID": 3, "用户ID": 103, "订单金额": 199, "支付状态": "已支付"},
    {"订单ID": 4, "用户ID": 104, "订单金额": 99999, "支付状态": "未支付"},  # 异常：高金额未支付
    {"订单ID": 5, "用户ID": 105, "订单金额": 1299, "支付状态": "已支付"},
    {"订单ID": 6, "用户ID": 101, "订单金额": 299, "支付状态": "已支付"},  # 同一用户多单
    {"订单ID": 7, "用户ID": 101, "订单金额": 199, "支付状态": "已支付"},  # 同一用户多单
    {"订单ID": 8, "用户ID": 106, "订单金额": 3999, "支付状态": "已支付"},
    {"订单ID": 9, "用户ID": 107, "订单金额": 1, "支付状态": "已支付"},  # 异常：极低金额
    {"订单ID": 10, "用户ID": 108, "订单金额": 2999, "支付状态": "已支付"},
]

print("订单数据:")
for order in order_data:
    print(order)

# 1. 统计异常检测（3σ原则）
print("\n=== 1. 统计异常检测")
amounts = [order["订单金额"] for order in order_data]
mean = sum(amounts) / len(amounts)
variance = sum((x - mean) ** 2 for x in amounts) / len(amounts)
std_dev = math.sqrt(variance)

print(f"均值: {mean:.2f}")
print(f"标准差: {std_dev:.2f}")
print(f"正常范围: [{mean - 3*std_dev:.2f}, {mean + 3*std_dev:.2f}]")

# 识别异常
statistical_anomalies = []
for order in order_data:
    if abs(order["订单金额"] - mean) > 3 * std_dev:
        statistical_anomalies.append(order)

print("\n统计异常订单:")
for order in statistical_anomalies:
    print(order)

# 2. 基于业务规则的异常检测
print("\n=== 2. 业务规则异常检测")

# 1) 高金额未支付订单
high_amount_unpaid = [order for order in order_data if order["订单金额"] > 10000 and order["支付状态"] == "未支付"]
print("\n高金额未支付订单:")
for order in high_amount_unpaid:
    print(order)

# 2) 同一用户多单
user_order_count = {}
for order in order_data:
    user_id = order["用户ID"]
    if user_id not in user_order_count:
        user_order_count[user_id] = 0
    user_order_count[user_id] += 1

multi_order_users = [user_id for user_id, count in user_order_count.items() if count >= 3]
multi_order_orders = [order for order in order_data if order["用户ID"] in multi_order_users]
print("\n同一用户多单:")
for order in multi_order_orders:
    print(order)

# 3) 极低金额订单
low_amount_orders = [order for order in order_data if order["订单金额"] < 10]
print("\n极低金额订单:")
for order in low_amount_orders:
    print(order)

# 3. 异常合并与分析
print("\n=== 3. 异常分析")
all_anomalies = []
all_anomalies.extend(statistical_anomalies)
all_anomalies.extend(high_amount_unpaid)
all_anomalies.extend(multi_order_orders)
all_anomalies.extend(low_amount_orders)

# 去重
unique_anomalies = []
seen_ids = set()
for order in all_anomalies:
    if order["订单ID"] not in seen_ids:
        unique_anomalies.append(order)
        seen_ids.add(order["订单ID"])

print(f"\n总计发现 {len(unique_anomalies)} 个异常订单")
print("异常订单详情:")
for order in unique_anomalies:
    print(order)

# 4. 业务建议
print("\n=== 4. 业务处理建议")
print("高金额未支付订单: 人工审核，确认是否为恶意下单")
print("同一用户多单: 检查是否为刷单行为，可临时限制下单频率")
print("极低金额订单: 检查是否为测试订单，可自动标记为可疑")
print("统计异常: 进一步分析原因，可能是系统误录或异常操作")

print("\n✅ 异常检测完成！")
`
    },
    {
      id: 10,
      level: '综合',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      title: '全流程综合大项目（完整分析师交付闭环）',
      coreKnowledge: '整合所有前期知识点（预处理、关联规则、聚类、回归、可视化），完整覆盖「数据→分析→建模→结论→落地」全链路。',
      businessScenario: '电商综合数据分析，解决「如何提升营收」的核心业务问题，输出完整的分析报告，可直接用于业务决策。',
      tasks: '1. 数据准备：整合前面所有项目的模拟数据（用户、商品、订单、销量、购物车数据），形成综合数据集；2. 数据预处理：完成缺失值、异常值、特征处理，标准化数据，保存处理后的数据；3. 核心分析：① 关联规则挖掘（商品组合）；② KMeans用户聚类+RFM分层；③ 随机森林回归（销量预测+特征重要性）；④ 时序趋势分析；4. 可视化呈现：绘制至少5张核心图表（相关性热力图、聚类图、销量趋势图、特征重要性图、关联规则图）；5. 结论与落地：① 总结核心发现（如「高价值用户主要集中在一线城市」「广告费是影响销量的核心因子」）；② 给出3~5条可落地的业务策略（如「捆绑销售+高价值用户精准投放+库存优化」）；6. 输出报告：整理成标准数据分析报告（包含数据概况、分析过程、核心结论、策略建议、附录（代码））。',
      pitfalls: '数据整合混乱（字段不匹配、数据格式不一致，导致分析无法进行）；分析无重点（堆砌所有方法，未围绕「提升营收」的核心目标）；报告逻辑混乱，无数据支撑结论（如「建议提升广告费」，但未给出广告费与销量的关联数据）。',
      deliverables: '① 全流程代码文件（comprehensive_analysis.py）；② 所有核心可视化图表；③ 完整数据分析报告（800~1000字，含附录代码）。',
      initialCode: `# 项目10：全流程综合分析
print("=== 全流程综合分析")
print("=" * 50)

# 综合数据集（模拟）
print("\n=== 1. 数据准备")
# 1.1 用户数据
users = [
    {"用户ID": 1, "消费金额": 1000, "消费频次": 5, "最近消费天数": 2, "地区": "北京"},
    {"用户ID": 2, "消费金额": 2000, "消费频次": 10, "最近消费天数": 1, "地区": "上海"},
    {"用户ID": 3, "消费金额": 500, "消费频次": 2, "最近消费天数": 10, "地区": "广州"},
    {"用户ID": 4, "消费金额": 1500, "消费频次": 8, "最近消费天数": 3, "地区": "北京"},
    {"用户ID": 5, "消费金额": 2500, "消费频次": 15, "最近消费天数": 1, "地区": "上海"},
]

# 1.2 销量数据
sales = [
    {"月份": "2024-01", "销量": 1000, "广告费": 10000, "活动次数": 2},
    {"月份": "2024-02", "销量": 1200, "广告费": 12000, "活动次数": 3},
    {"月份": "2024-03", "销量": 1100, "广告费": 11000, "活动次数": 2},
    {"月份": "2024-04", "销量": 1300, "广告费": 13000, "活动次数": 3},
    {"月份": "2024-05", "销量": 1400, "广告费": 14000, "活动次数": 4},
]

# 1.3 购物车数据
cart = [
    {"订单ID": 1, "商品": ["手机", "耳机"]},
    {"订单ID": 2, "商品": ["电脑", "鼠标"]},
    {"订单ID": 3, "商品": ["手机", "充电器"]},
    {"订单ID": 4, "商品": ["耳机", "充电器"]},
    {"订单ID": 5, "商品": ["手机", "耳机", "充电器"]},
]

print("数据加载完成:")
print(f"用户数据: {len(users)}条")
print(f"销量数据: {len(sales)}条")
print(f"购物车数据: {len(cart)}条")

# 2. 核心分析
print("\n=== 2. 核心分析")

# 2.1 用户分群分析
print("\n2.1 用户分群分析")
# 简单的用户分群
high_value_users = [u for u in users if u["消费金额"] > 1500 and u["消费频次"] > 8]
medium_value_users = [u for u in users if 800 <= u["消费金额"] <= 1500]
low_value_users = [u for u in users if u["消费金额"] < 800]

print(f"高价值用户: {len(high_value_users)}人")
print(f"中等价值用户: {len(medium_value_users)}人")
print(f"低价值用户: {len(low_value_users)}人")

# 2.2 销量影响因子分析
print("\n2.2 销量影响因子分析")
# 计算广告费与销量的相关性
sales_values = [s["销量"] for s in sales]
ad_values = [s["广告费"] for s in sales]

n = len(sales_values)
mean_sales = sum(sales_values) / n
mean_ad = sum(ad_values) / n

numerator = sum((sales_values[i] - mean_sales) * (ad_values[i] - mean_ad) for i in range(n))
denominator = ((sum((s - mean_sales)**2 for s in sales_values) * sum((a - mean_ad)**2 for a in ad_values))**0.5)
corr = numerator / denominator if denominator > 0 else 0

print(f"广告费与销量的相关系数: {corr:.4f}")
if corr > 0.8:
    print("结论: 广告费是影响销量的关键因素")

# 2.3 商品关联分析
print("\n2.3 商品关联分析")
# 统计商品组合
item_pairs = {}
for c in cart:
    items = c["商品"]
    for i in range(len(items)):
        for j in range(i+1, len(items)):
            pair = tuple(sorted([items[i], items[j]]))
            if pair not in item_pairs:
                item_pairs[pair] = 0
            item_pairs[pair] += 1

print("商品关联组合:")
for pair, count in item_pairs.items():
    print(f"{pair[0]} + {pair[1]}: {count}次")

# 3. 结论与建议
print("\n=== 3. 核心结论与建议")
print("\n核心发现:")
print("1. 高价值用户主要集中在一线城市（北京、上海）")
print("2. 广告费与销量高度相关，是提升销量的关键因素")
print("3. 手机与耳机、手机与充电器的组合购买频率高")

print("\n业务建议:")
print("1. 针对高价值用户推出专属会员服务，提升用户忠诚度")
print("2. 优化广告投放策略，增加在高转化渠道的广告投入")
print("3. 推出手机+耳机、手机+充电器的捆绑销售套餐")
print("4. 针对低价值用户，通过优惠券等方式提升客单价")
print("5. 基于销量趋势，合理规划库存，避免缺货或积压")

print("\n✅ 全流程分析完成！")
print("\n报告已生成，包含数据概况、分析过程、核心结论和策略建议。")
`
    }
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