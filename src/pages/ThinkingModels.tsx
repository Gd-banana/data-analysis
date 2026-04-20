import React from 'react';
import { ChevronDown, Plus, ArrowRight } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const ThinkingModels: React.FC = () => {
  const models = [
    {
      id: 1,
      title: '维度拆解 + 细分分群思维',
      definition: '将复杂数据按「业务维度（时间/品类/地区）+ 算法维度（聚类/分桶）」拆分，把大群体拆成小群体，针对性挖掘规律、制定策略，核心是「分而治之」。',
      businessValue: '避免「一刀切」分析，比如将用户拆成高价值/流失/新用户，商品拆成爆款/长尾款，精准匹配运营动作；无标签数据通过聚类发现隐藏分群。',
      code: `import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 1. 读取用户数据（消费金额、频次、最近消费天数）
df = pd.read_csv("user_data.csv")
data = df[["消费金额", "消费频次", "最近消费天数"]]

# 2. 数据标准化（聚类必备）
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# 3. KMeans聚类分群（拆成4类用户）
kmeans = KMeans(n_clusters=4, random_state=42)
df["用户分群"] = kmeans.fit_predict(data_scaled)

# 4. 结合业务维度（地区）进一步拆解
df.groupby(["地区", "用户分群"])["消费金额"].sum()`
    },
    {
      id: 2,
      title: '变量关联 & 因子挖掘思维',
      definition: '通过统计方法（相关性）、算法模型（关联规则、随机森林），挖掘变量间的隐藏关系，找到「影响结果的关键因子」，拒绝「凭经验判断」。',
      businessValue: '搞懂「什么影响销量」「用户为什么流失」「哪些商品一起买」，比如通过关联规则发现购物车组合，通过随机森林找到影响营收的核心指标。',
      code: `# 示例1：关联规则（购物车分析，Apriori算法）
from mlxtend.frequent_patterns import apriori, association_rules
df_cart = pd.read_csv("cart_data.csv")
# 商品编码（one-hot）
cart_encoded = pd.get_dummies(df_cart["商品名称"], prefix="商品")
# 挖掘频繁项集（支持度>=0.05）
frequent_itemsets = apriori(cart_encoded, min_support=0.05, use_colnames=True)
# 生成关联规则（置信度>=0.7）
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)

# 示例2：随机森林特征重要性
from sklearn.ensemble import RandomForestRegressor
X = df[["广告费", "客单价", "活动次数"]]  # 特征
y = df["销量"]  # 目标变量
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X, y)
# 输出特征重要性（找到影响销量的关键因子）
pd.DataFrame({"特征": X.columns, "重要性": rf.feature_importances_}).sort_values("重要性", ascending=False)`
    },
    {
      id: 3,
      title: '无监督挖掘思维',
      definition: '在没有明确标签（如「是否流失」「是否爆款」）的情况下，通过聚类、分群、行为相似度分析，自动发现数据中的隐藏结构和规律。',
      businessValue: '挖掘未知价值，比如无标签用户数据中发现「高潜力用户」，商品数据中发现「隐性关联品类」，无需人工标注，降低分析成本。',
      code: `import matplotlib.pyplot as plt
from sklearn.decomposition import PCA  # 降维可视化

# 1. 商品数据（销量、客单价、好评率、库存）
df_goods = pd.read_csv("goods_data.csv")
goods_data = df_goods[["销量", "客单价", "好评率", "库存"]]

# 2. 标准化+聚类
scaler = StandardScaler()
goods_scaled = scaler.fit_transform(goods_data)
kmeans = KMeans(n_clusters=3, random_state=42)
df_goods["商品分群"] = kmeans.fit_predict(goods_scaled)

# 3. PCA降维，可视化聚类结果
pca = PCA(n_components=2)
goods_pca = pca.fit_transform(goods_scaled)
plt.scatter(goods_pca[:,0], goods_pca[:,1], c=df_goods["商品分群"], cmap="viridis")
plt.xlabel("PCA维度1")
plt.ylabel("PCA维度2")
plt.title("商品聚类结果可视化")
plt.show()`
    },
    {
      id: 4,
      title: '拟合&预测建模思维',
      definition: '通过回归、树模型、时序拟合等方法，从历史数据中量化规律，实现「数值预测」（如销量预测）、「分类判断」（如用户流失判断），用数据替代「拍脑袋」。',
      businessValue: '提前预判趋势，比如预测下月销量、预估广告投放效果、判断用户是否会流失，为决策提供数据支撑。',
      code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# 1. 准备数据（特征：广告费、活动次数、客单价；目标：销量）
X = df[["广告费", "活动次数", "客单价"]]
y = df["销量"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. 多元线性回归预测
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)
print("线性回归R²得分：", r2_score(y_test, y_pred_lr))

# 3. 随机森林回归预测（非线性场景更优）
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
print("随机森林R²得分：", r2_score(y_test, y_pred_rf))`
    },
    {
      id: 5,
      title: '业务模型落地思维',
      definition: '所有分析、算法、模型都不为「炫技」，而是落地到具体业务场景，解决实际问题——聚类服务用户运营、关联规则服务捆绑销售、回归服务营收预估。',
      businessValue: '避免「分析与业务脱节」，确保每一次分析都能产出可执行的策略，比如聚类分群后制定「高价值用户专属福利」，关联规则后推出「商品捆绑套餐」。',
      code: `# 1. RFM用户分层（业务落地核心模型）
df_rfm = pd.read_csv("user_rfm.csv")
# 定义分层标准（业务定制，可调整）
df_rfm["R分"] = pd.qcut(df_rfm["最近消费天数"], 5, labels=[5,4,3,2,1])  # 1=最差，5=最好
df_rfm["F分"] = pd.qcut(df_rfm["消费频次"], 5, labels=[1,2,3,4,5])
df_rfm["M分"] = pd.qcut(df_rfm["消费金额"], 5, labels=[1,2,3,4,5])
# 计算RFM总分
df_rfm["RFM总分"] = df_rfm["R分"].astype(int) + df_rfm["F分"].astype(int) + df_rfm["M分"].astype(int)
# 业务分层（落地运营策略）
def rfm_level(score):
    if score >= 13: return "高价值用户"  # 专属福利+复购激励
    elif score >= 8: return "潜力用户"   # 引导消费+提升频次
    else: return "流失/低价值用户"       # 唤醒活动+优惠券
df_rfm["用户等级"] = df_rfm["RFM总分"].apply(rfm_level)
# 输出各等级用户数量，用于制定运营策略
df_rfm["用户等级"].value_counts()`
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">5大核心思维模型</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">每个模型均包含定义、业务价值和可运行代码</p>
        </div>

        <div className="space-y-8">
          {models.map((model) => (
            <div key={model.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{model.id}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{model.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    定义
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{model.definition}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    业务价值
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{model.businessValue}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    代码示例（可直接运行）
                  </h3>
                  <CodeBlock code={model.code} />
                </div>

                <div className="mt-6 flex justify-end">
                  <a 
                    href="https://solo.trae.cn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>在SOLO中创建项目</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThinkingModels;
