# 评分指标管理系统

一个基于 React 的评分指标管理系统，支持一级指标和二级指标的编辑和预览。

## 功能特性

- ✅ 一级指标管理（项目名称/配分）
  - 添加、删除、编辑一级指标
  - 实时更新配分
  
- ✅ 二级指标管理（操作要求/评分说明/子项配分）
  - 添加、删除、编辑二级指标
  - 支持多行文本编辑
  
- ✅ 数据预览页面
  - 表格形式展示所有指标
  - 支持点击编辑
  - 显示总分统计

## 技术栈

- React 18
- React Router 6
- Vite
- Context API (状态管理)

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
├── context/
│   └── IndicatorContext.jsx    # 数据管理 Context
├── pages/
│   ├── EditIndicators.jsx      # 编辑页面
│   ├── EditIndicators.css
│   ├── PreviewIndicators.jsx   # 预览页面
│   └── PreviewIndicators.css
├── App.jsx                      # 主应用组件
├── App.css
├── main.jsx                     # 入口文件
└── index.css                    # 全局样式
```

## 使用说明

1. **编辑页面** (`/`): 
   - 点击一级指标卡片进行选择
   - 点击 "+" 按钮添加新的一级指标
   - 在二级指标区域添加、编辑、删除子项
   - 点击"预览"按钮查看预览效果

2. **预览页面** (`/preview`):
   - 以表格形式展示所有指标
   - 点击任意单元格进行编辑
   - 按 Enter 键保存，Esc 键取消

## 数据格式

```javascript
{
  id: '1',
  name: '项目名称',
  score: 10,
  subItems: [
    {
      id: '1-1',
      requirement: '操作要求',
      description: '评分说明',
      score: 2.0
    }
  ]
}
```

