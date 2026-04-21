import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Code, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import OnlineCodeEditor from '@/components/OnlineCodeEditor';
import CodeBlock from '@/components/CodeBlock';

const stagesData: Record<string, any> = {
  '1': {
    title: '数据分析基础',
    level: '入门',
    lessons: [
      {
        id: 1,
        title: '数据的定义与类型',
        content: `
# 数据的定义与类型

数据是事实、概念或指令的一种表现形式，它可以被人工或自动化装置进行处理。

## 数据类型

1. **数值型数据**
   - 离散型：比如人数、产品数量
   - 连续型：比如身高、体重、销售额

2. **分类型数据**
   - 名义型：比如性别、地区
   - 有序型：比如满意度（好/中/差）

3. **时间型数据**
   - 日期、时间戳等
        `,
        code: `# 数据类型示例
# 数值型数据
age = 25
height = 175.5
sales = 10000.50

print(f"年龄: {age} (整数)")
print(f"身高: {height} (浮点数)")
print(f"销售额: {sales} (浮点数)")

# 分类型数据
gender = "男"
region = "北京"
satisfaction = "满意"

print(f"性别: {gender}")
print(f"地区: {region}")
print(f"满意度: {satisfaction}")

# 时间型数据
from datetime import datetime
current_time = datetime.now()
print(f"当前时间: {current_time}")
`
      },
      {
        id: 2,
        title: 'Excel 基础操作',
        content: `
# Excel 基础操作

Excel 是数据分析中最常用的工具之一。

## 常用操作

1. **数据输入与编辑**
   - 单元格选择
   - 数据输入
   - 撤销与重做

2. **基本函数**
   - SUM：求和
   - AVERAGE：平均值
   - COUNT：计数
   - MAX/MIN：最大值/最小值

3. **数据筛选与排序**
   - 筛选功能
   - 排序功能
        `,
        code: `# 模拟 Excel 数据处理
# 创建一个销售数据列表

sales_data = [
    {"产品": "手机", "销量": 100, "单价": 2999},
    {"产品": "电脑", "销量": 50, "单价": 5999},
    {"产品": "平板", "销量": 80, "单价": 3999},
    {"产品": "耳机", "销量": 200, "单价": 299},
    {"产品": "键盘", "销量": 150, "单价": 199}
]

print("销售数据:")
for item in sales_data:
    print(f"{item['产品']}: 销量{item['销量']}, 单价{item['单价']}")

# 计算总销量
total_sales = sum(item['销量'] for item in sales_data)
print(f"\\n总销量: {total_sales}")

# 计算平均销量
avg_sales = total_sales / len(sales_data)
print(f"平均销量: {avg_sales:.2f}")

# 计算总销售额
total_revenue = sum(item['销量'] * item['单价'] for item in sales_data)
print(f"总销售额: {total_revenue:,.2f} 元")

# 找出销量最高的产品
best_seller = max(sales_data, key=lambda x: x['销量'])
print(f"销量最高的产品: {best_seller['产品']} ({best_seller['销量']}件)")
`
      },
      {
        id: 3,
        title: '描述性统计',
        content: `
# 描述性统计

描述性统计是对数据进行汇总和描述的统计方法。

## 常用指标

1. **集中趋势**
   - 均值（Mean）
   - 中位数（Median）
   - 众数（Mode）

2. **离散程度**
   - 方差
   - 标准差
   - 极差
        `,
        code: `# 描述性统计示例
import math

data = [23, 45, 67, 34, 56, 78, 12, 90, 45, 67, 34, 56, 45]

print("原始数据:", data)

# 均值
mean = sum(data) / len(data)
print(f"\\n均值: {mean:.2f}")

# 中位数
sorted_data = sorted(data)
n = len(sorted_data)
if n % 2 == 0:
    median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
else:
    median = sorted_data[n//2]
print(f"中位数: {median}")

# 众数（简单实现）
from collections import Counter
counts = Counter(data)
mode = counts.most_common(1)[0][0]
print(f"众数: {mode}")

# 极差
range_val = max(data) - min(data)
print(f"极差: {range_val}")

# 方差和标准差
variance = sum((x - mean) ** 2 for x in data) / len(data)
std_dev = math.sqrt(variance)
print(f"方差: {variance:.2f}")
print(f"标准差: {std_dev:.2f}")
`
      },
      {
        id: 4,
        title: '数据可视化基础',
        content: `
# 数据可视化基础

数据可视化是将数据转换为图形形式，帮助我们更好地理解数据。

## 常用图表类型

1. **柱状图**：比较不同类别的数值
2. **折线图**：展示趋势变化
3. **饼图**：展示占比关系
4. **散点图**：展示两个变量的关系
        `,
        code: `# 数据可视化基础
# 使用 ASCII 字符绘制简单图表

# 柱状图示例
sales = [100, 150, 80, 200, 120]
products = ['手机', '电脑', '平板', '耳机', '键盘']

print("产品销量柱状图:")
print("-" * 50)
for product, sale in zip(products, sales):
    bar = '█' * (sale // 10)
    print(f"{product:6s} | {bar} {sale}")
print("-" * 50)

# 简单的趋势描述
print("\\n销量趋势分析:")
max_sale = max(sales)
max_index = sales.index(max_sale)
print(f"最高销量: {products[max_index]} ({max_sale}件)")

min_sale = min(sales)
min_index = sales.index(min_sale)
print(f"最低销量: {products[min_index]} ({min_sale}件)")

avg_sale = sum(sales) / len(sales)
print(f"平均销量: {avg_sale:.1f}件")
`
      },
      {
        id: 5,
        title: '阶段总结与练习',
        content: `
# 阶段总结

恭喜你完成了数据分析基础阶段的学习！

## 重点回顾

1. 数据的定义与类型
2. Excel 基础操作
3. 描述性统计
4. 数据可视化基础

## 下一步

继续学习 Python 数据处理，进入进阶阶段！
        `,
        code: `# 综合练习 - 销售数据分析
# 假设你有以下销售数据

# 销售记录
sales_records = [
    {"日期": "2024-01-01", "产品": "手机", "销量": 25, "单价": 2999},
    {"日期": "2024-01-02", "产品": "手机", "销量": 30, "单价": 2999},
    {"日期": "2024-01-01", "产品": "电脑", "销量": 15, "单价": 5999},
    {"日期": "2024-01-02", "产品": "电脑", "销量": 18, "单价": 5999},
    {"日期": "2024-01-01", "产品": "耳机", "销量": 50, "单价": 299},
    {"日期": "2024-01-02", "产品": "耳机", "销量": 60, "单价": 299}
]

print("销售数据分析")
print("=" * 50)

# 1. 计算每个产品的总销量
product_sales = {}
for record in sales_records:
    product = record['产品']
    if product not in product_sales:
        product_sales[product] = 0
    product_sales[product] += record['销量']

print("\\n各产品总销量:")
for product, total in product_sales.items():
    print(f"  {product}: {total}件")

# 2. 计算总销售额
total_revenue = sum(r['销量'] * r['单价'] for r in sales_records)
print(f"\\n总销售额: {total_revenue:,.2f} 元")

# 3. 找出销量最高的产品
best_product = max(product_sales.items(), key=lambda x: x[1])
print(f"\\n销量最高的产品: {best_product[0]} ({best_product[1]}件)")

# 4. 计算日均销量
dates = list(set(r['日期'] for r in sales_records))
daily_avg = sum(product_sales.values()) / len(dates)
print(f"日均销量: {daily_avg:.1f}件")

print("\\n✅ 练习完成！继续加油！")
`
      }
    ]
  },
  '2': {
    title: 'Python 数据处理',
    level: '进阶',
    lessons: [
      {
        id: 1,
        title: 'Python 基础回顾',
        content: '# Python 基础回顾',
        code: `# Python 基础语法

# 变量与数据类型
name = "张三"
age = 25
height = 1.75
is_student = True

print(f"姓名: {name}")
print(f"年龄: {age}")
print(f"身高: {height}米")
print(f"是否学生: {is_student}")

# 列表
numbers = [1, 2, 3, 4, 5]
print("\\n列表:", numbers)
print("第一个元素:", numbers[0])
print("最后一个元素:", numbers[-1])
print("切片:", numbers[1:4])

# 字典
person = {
    "name": "李四",
    "age": 30,
    "city": "北京"
}
print("\\n字典:", person)
print("姓名:", person["name"])

# 条件语句
if age >= 18:
    print("\\n成年人")
else:
    print("\\n未成年人")

# 循环
print("\\n1-5的平方:")
for num in numbers:
    print(f"{num}² = {num**2}")

# 函数
def greet(name):
    return f"你好, {name}!"

print("\\n函数调用:", greet("王五"))
`
      },
      {
        id: 2,
        title: 'Numpy 基础',
        content: '# Numpy 基础',
        code: `# Numpy 基础示例

# 注意：在纯 Pyodide 环境中，我们可以手动实现一些基础功能
# 下面是一个模拟的 Numpy 风格示例

print("=== 数值计算基础 ===\\n")

# 模拟数组操作
class SimpleArray:
    def __init__(self, data):
        self.data = list(data)
    
    def __add__(self, other):
        if isinstance(other, (int, float)):
            return SimpleArray([x + other for x in self.data])
        return SimpleArray([x + y for x, y in zip(self.data, other.data)])
    
    def __mul__(self, other):
        if isinstance(other, (int, float)):
            return SimpleArray([x * other for x in self.data])
        return SimpleArray([x * y for x, y in zip(self.data, other.data)])
    
    def sum(self):
        return sum(self.data)
    
    def mean(self):
        return sum(self.data) / len(self.data)
    
    def __repr__(self):
        return f"Array({self.data})"

# 创建数组
arr1 = SimpleArray([1, 2, 3, 4, 5])
arr2 = SimpleArray([10, 20, 30, 40, 50])

print("数组1:", arr1)
print("数组2:", arr2)

# 数组运算
print("\\n数组1 + 数组2:", arr1 + arr2)
print("数组1 * 2:", arr1 * 2)
print("数组1 * 数组2:", arr1 * arr2)

# 统计计算
print("\\n数组1求和:", arr1.sum())
print("数组1平均值:", arr1.mean())
print("数组2求和:", arr2.sum())
print("数组2平均值:", arr2.mean())

# 矩阵操作示例
print("\\n=== 矩阵操作 ===")
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print("矩阵:")
for row in matrix:
    print(row)

# 对角线元素
diagonal = [matrix[i][i] for i in range(len(matrix))]
print("\\n对角线元素:", diagonal)

# 转置矩阵
transpose = list(zip(*matrix))
print("转置矩阵:")
for row in transpose:
    print(list(row))
`
      },
      {
        id: 3,
        title: 'Pandas 数据结构',
        content: '# Pandas 数据结构',
        code: `# Pandas 数据结构模拟

print("=== 数据表格操作 ===\\n")

# 模拟 DataFrame
class SimpleDataFrame:
    def __init__(self, data_dict):
        self.data = data_dict
        self.columns = list(data_dict.keys())
        if self.columns:
            self.length = len(data_dict[self.columns[0]])
        else:
            self.length = 0
    
    def __getitem__(self, key):
        return self.data[key]
    
    def __repr__(self):
        result = "  " + "  ".join(self.columns) + "\\n"
        result += "-" * (len(result) + 10) + "\\n"
        for i in range(self.length):
            row = [str(self.data[col][i]) for col in self.columns]
            result += "  " + "  ".join(row) + "\\n"
        return result
    
    def head(self, n=5):
        result = f"  " + "  ".join(self.columns) + "\\n"
        result += "-" * (len(result) + 10) + "\\n"
        for i in range(min(n, self.length)):
            row = [str(self.data[col][i]) for col in self.columns]
            result += "  " + "  ".join(row) + "\\n"
        return result

# 创建销售数据
data = {
    "产品": ["手机", "电脑", "平板", "耳机", "键盘", "鼠标", "显示器", "音响", "摄像头", "充电宝"],
    "销量": [100, 50, 80, 200, 150, 120, 60, 90, 40, 180],
    "单价": [2999, 5999, 3999, 299, 199, 99, 1299, 399, 499, 129],
    "类别": ["电子设备", "电子设备", "电子设备", "配件", "配件", "配件", "电子设备", "配件", "配件", "配件"]
}

df = SimpleDataFrame(data)
print("销售数据:")
print(df)

# 计算销售额
print("\\n=== 添加销售额列 ===\\n")
sales = [q * p for q, p in zip(df["销量"], df["单价"])]
df.data["销售额"] = sales
print(df)

# 按类别统计
print("\\n=== 按类别统计 ===\\n")
category_stats = {}
for i in range(df.length):
    category = df["类别"][i]
    sale = df["销售额"][i]
    quantity = df["销量"][i]
    if category not in category_stats:
        category_stats[category] = {"销量": 0, "销售额": 0}
    category_stats[category]["销量"] += quantity
    category_stats[category]["销售额"] += sale

print("类别统计:")
for category, stats in category_stats.items():
    print(f"{category}:")
    print(f"  总销量: {stats['销量']}件")
    print(f"  总销售额: {stats['销售额']:,.2f}元")

# 找出最贵的产品
max_price_idx = df["单价"].index(max(df["单价"]))
print(f"\\n最贵的产品: {df['产品'][max_price_idx]} ({df['单价'][max_price_idx]}元)")

# 找出销量最高的产品
max_sales_idx = df["销量"].index(max(df["销量"]))
print(f"销量最高的产品: {df['产品'][max_sales_idx]} ({df['销量'][max_sales_idx]}件)")
`
      },
      {
        id: 4,
        title: '数据清洗',
        content: '# 数据清洗',
        code: `# 数据清洗实战

print("=== 数据清洗 ===\\n")

# 示例数据（包含一些问题）
raw_data = {
    "姓名": ["张三", "李四", None, "王五", "赵六", "张三", "钱七", None],
    "年龄": [25, 30, 35, None, 28, 25, 40, 32],
    "城市": ["北京", "上海", "广州", "深圳", "北京", "北京", "上海", "广州"],
    "收入": [10000, 15000, 12000, 999999, 11000, 10000, 18000, 13000],
    "入职日期": ["2023-01-15", "2022-06-20", "2023-03-10", None, "2023-05-08", "2023-01-15", "2021-12-01", "2023-02-28"]
}

print("原始数据:")
for key, values in raw_data.items():
    print(f"{key}: {values}")

# 1. 处理缺失值
print("\\n=== 1. 处理缺失值 ===\\n")
clean_data = []
for i in range(len(raw_data["姓名"])):
    row = {key: raw_data[key][i] for key in raw_data.keys()}
    clean_data.append(row)

# 删除姓名为空的记录
clean_data = [row for row in clean_data if row["姓名"] is not None]

# 年龄用中位数填充
ages = [row["年龄"] for row in clean_data if row["年龄"] is not None]
ages_sorted = sorted(ages)
median_age = ages_sorted[len(ages_sorted) // 2]
for row in clean_data:
    if row["年龄"] is None:
        row["年龄"] = median_age

print(f"用中位数 {median_age} 填充缺失年龄")

# 2. 处理重复值
print("\\n=== 2. 处理重复值 ===\\n")
seen = set()
unique_data = []
for row in clean_data:
    key = tuple(row.items())
    if key not in seen:
        seen.add(key)
        unique_data.append(row)

print(f"删除了 {len(clean_data) - len(unique_data)} 条重复记录")

# 3. 处理异常值
print("\\n=== 3. 处理异常值 ===\\n")
incomes = [row["收入"] for row in unique_data]
incomes_sorted = sorted(incomes)
q1 = incomes_sorted[len(incomes_sorted) // 4]
q3 = incomes_sorted[len(incomes_sorted) * 3 // 4]
iqr = q3 - q1
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

print(f"正常收入范围: {lower_bound:.0f} - {upper_bound:.0f}")

for row in unique_data:
    if row["收入"] > upper_bound or row["收入"] < lower_bound:
        print(f"异常收入 {row['收入']}，用均值代替")
        row["收入"] = sum(incomes) // len(incomes)

# 4. 数据类型转换
print("\\n=== 4. 数据类型转换 ===\\n")
for row in unique_data:
    row["年龄"] = int(row["年龄"]) if row["年龄"] else row["年龄"]

print("清理后的数据:")
for row in unique_data:
    print(row)

print("\\n✅ 数据清洗完成！")
`
      }
    ]
  },
  '3': {
    title: '数据分析实战',
    level: '实战',
    lessons: [
      {
        id: 1,
        title: '电商销售数据分析',
        content: '# 电商销售数据分析',
        code: `# 电商销售数据分析实战

print("=== 电商销售数据分析 ===\\n")

# 销售数据
sales_data = [
    {"日期": "2024-01-01", "产品": "手机", "销量": 25, "单价": 2999, "地区": "华北"},
    {"日期": "2024-01-01", "产品": "手机", "销量": 30, "单价": 2999, "地区": "华东"},
    {"日期": "2024-01-01", "产品": "电脑", "销量": 15, "单价": 5999, "地区": "华北"},
    {"日期": "2024-01-01", "产品": "电脑", "销量": 18, "单价": 5999, "地区": "华南"},
    {"日期": "2024-01-01", "产品": "耳机", "销量": 50, "单价": 299, "地区": "华东"},
    {"日期": "2024-01-02", "产品": "手机", "销量": 28, "单价": 2999, "地区": "华北"},
    {"日期": "2024-01-02", "产品": "手机", "销量": 32, "单价": 2999, "地区": "华东"},
    {"日期": "2024-01-02", "产品": "电脑", "销量": 20, "单价": 5999, "地区": "华北"},
    {"日期": "2024-01-02", "产品": "耳机", "销量": 55, "单价": 299, "地区": "华南"},
    {"日期": "2024-01-02", "产品": "平板", "销量": 40, "单价": 3999, "地区": "华东"}
]

print("销售数据示例:")
for i, data in enumerate(sales_data[:3], 1):
    print(f"{i}. {data}")

# 1. 总体销售情况
print("\\n=== 1. 总体销售情况 ===")
total_quantity = sum(d["销量"] for d in sales_data)
total_revenue = sum(d["销量"] * d["单价"] for d in sales_data)
print(f"总销量: {total_quantity}件")
print(f"总销售额: {total_revenue:,.2f}元")
print(f"平均单价: {total_revenue / total_quantity:,.2f}元")

# 2. 按产品分析
print("\\n=== 2. 按产品分析 ===")
product_analysis = {}
for data in sales_data:
    product = data["产品"]
    if product not in product_analysis:
        product_analysis[product] = {"销量": 0, "销售额": 0}
    product_analysis[product]["销量"] += data["销量"]
    product_analysis[product]["销售额"] += data["销量"] * data["单价"]

for product, stats in product_analysis.items():
    print(f"{product}: 销量 {stats['销量']}件, 销售额 {stats['销售额']:,.2f}元")

# 3. 按地区分析
print("\\n=== 3. 按地区分析 ===")
region_analysis = {}
for data in sales_data:
    region = data["地区"]
    if region not in region_analysis:
        region_analysis[region] = {"销量": 0, "销售额": 0}
    region_analysis[region]["销量"] += data["销量"]
    region_analysis[region]["销售额"] += data["销量"] * data["单价"]

for region, stats in region_analysis.items():
    print(f"{region}: 销量 {stats['销量']}件, 销售额 {stats['销售额']:,.2f}元")

# 4. 销售趋势
print("\\n=== 4. 销售趋势 ===")
date_analysis = {}
for data in sales_data:
    date = data["日期"]
    if date not in date_analysis:
        date_analysis[date] = {"销量": 0, "销售额": 0}
    date_analysis[date]["销量"] += data["销量"]
    date_analysis[date]["销售额"] += data["销量"] * data["单价"]

for date in sorted(date_analysis.keys()):
    stats = date_analysis[date]
    print(f"{date}: 销量 {stats['销量']}件, 销售额 {stats['销售额']:,.2f}元")

# 5. 可视化（简单的 ASCII 图表）
print("\\n=== 5. 产品销量柱状图 ===")
max_sales = max(s["销量"] for s in product_analysis.values())
print("-" * 40)
for product, stats in product_analysis.items():
    bar_length = int(stats["销量"] / max_sales * 20)
    bar = "█" * bar_length
    print(f"{product:6s} | {bar} {stats['销量']}件")
print("-" * 40)

print("\\n✅ 分析完成！")
`
      }
    ]
  },
  '4': {
    title: '高级应用',
    level: '高级',
    lessons: [
      {
        id: 1,
        title: '统计分析基础',
        content: '# 统计分析基础',
        code: `# 统计分析基础

import math
import random

print("=== 统计分析 ===\\n")

# 生成样本数据
random.seed(42)
data = [random.normalvariate(100, 15) for _ in range(100)]
data = [round(x, 1) for x in data]

print(f"样本数据 ({len(data)}个):")
print(f"{data[:10]}...")

# 1. 描述性统计
print("\\n=== 1. 描述性统计 ===")
n = len(data)
mean = sum(data) / n
sorted_data = sorted(data)

if n % 2 == 0:
    median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
else:
    median = sorted_data[n//2]

# 众数
from collections import Counter
counts = Counter(round(x) for x in data)
mode = counts.most_common(1)[0][0]

# 方差和标准差
variance = sum((x - mean) ** 2 for x in data) / (n - 1)
std_dev = math.sqrt(variance)

# 分位数
q1 = sorted_data[int(n * 0.25)]
q2 = median
q3 = sorted_data[int(n * 0.75)]

print(f"样本数: {n}")
print(f"均值: {mean:.2f}")
print(f"中位数: {median:.2f}")
print(f"众数: {mode}")
print(f"标准差: {std_dev:.2f}")
print(f"方差: {variance:.2f}")
print(f"最小值: {min(data):.2f}")
print(f"最大值: {max(data):.2f}")
print(f"Q1: {q1:.2f}")
print(f"Q2: {q2:.2f}")
print(f"Q3: {q3:.2f}")

# 2. 简单假设检验示例
print("\\n=== 2. 简单假设检验 ===")
print("假设: 总体均值为 100")
print(f"样本均值: {mean:.2f}")

# 计算 t 统计量
t_stat = (mean - 100) / (std_dev / math.sqrt(n))
print(f"t 统计量: {t_stat:.4f}")

# 简单的判断（t 临界值约为 1.98）
if abs(t_stat) < 1.98:
    print("结论: 没有足够证据拒绝原假设（均值可能为100）")
else:
    print("结论: 拒绝原假设（均值与100有显著差异）")

# 3. 频率分布
print("\\n=== 3. 频率分布 ===")
min_val = min(data)
max_val = max(data)
bin_width = (max_val - min_val) / 10

frequency = [0] * 10
for x in data:
    bin_idx = min(int((x - min_val) / bin_width), 9)
    frequency[bin_idx] += 1

print("区间分布:")
for i in range(10):
    bin_start = min_val + i * bin_width
    bin_end = bin_start + bin_width
    count = frequency[i]
    bar = "█" * (count // 2)
    print(f"{bin_start:5.1f} - {bin_end:5.1f} | {bar} {count}个")

print("\\n✅ 统计分析完成！")
`
      }
    ]
  }
};

const LearnStage: React.FC = () => {
  const { stageId } = useParams<{ stageId: string }>();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const stageData = stageId ? stagesData[stageId] : null;

  if (!stageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">页面未找到</h2>
          <Link to="/learn" className="text-blue-600 dark:text-blue-400 hover:underline">
            返回学习首页
          </Link>
        </div>
      </div>
    );
  }

  const lesson = stageData.lessons[currentLesson];
  const progress = Math.round((completedLessons.length / stageData.lessons.length) * 100);

  const handleComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
  };

  const handleNext = () => {
    if (currentLesson < stageData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏导航 */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <button
                  onClick={() => navigate('/learn')}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  返回学习首页
                </button>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {stageData.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {stageData.level}阶段
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>学习进度</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">课程目录</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {stageData.lessons.map((l: any, idx: number) => (
                    <button
                      key={l.id}
                      onClick={() => setCurrentLesson(idx)}
                      className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        currentLesson === idx ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          completedLessons.includes(idx)
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : currentLesson === idx
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {completedLessons.includes(idx) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{idx + 1}</span>
                          )}
                        </div>
                        <span className={`text-sm ${
                          currentLesson === idx
                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {l.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  第 {currentLesson + 1} 课 / 共 {stageData.lessons.length} 课
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {lesson.title}
                </h1>
              </div>

              {/* 学习内容 */}
              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {lesson.content}
                </div>
              </div>

              {/* 代码编辑器 */}
              {lesson.code && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    代码练习
                  </h3>
                  <OnlineCodeEditor initialCode={lesson.code} />
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrev}
                  disabled={currentLesson === 0}
                  className="flex items-center px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  上一课
                </button>

                <button
                  onClick={handleComplete}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                    completedLessons.includes(currentLesson)
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {completedLessons.includes(currentLesson) ? '已完成' : '标记完成'}
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentLesson === stageData.lessons.length - 1}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  下一课
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnStage;
