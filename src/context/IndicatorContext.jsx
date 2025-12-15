import React, { createContext, useContext, useState } from 'react'

const IndicatorContext = createContext()

// 初始数据（基于图片中的示例数据）
const initialData = [
  {
    id: '1',
    name: '作业准备',
    score: 10,
    subItems: [
      {
        id: '1-1',
        requirement: '穿着工作鞋,工作服,做好个人防护',
        description: '少做或错做一项扣1.0分,直至扣完为止',
        score: 2.0
      },
      {
        id: '1-2',
        requirement: '工具台锁止,工具车锁止,锁止台架',
        description: '少做或错做一项扣0.5分,直至扣完为止',
        score: 2.0
      },
      {
        id: '1-3',
        requirement: '记录变速器的型号',
        description: '未对变速箱型号进行记录,扣2.0分',
        score: 2.0
      },
      {
        id: '1-4',
        requirement: '对场地的工具,设备进行基本检查',
        description: '未对场地的工具进行检查,扣1.0分, 未对设备进行检查扣1.0分',
        score: 2.0
      },
      {
        id: '1-5',
        requirement: '作业前时,若有油液滴落及时清洁',
        description: '未及时清洁扣1分,直至扣完为止',
        score: 2.0
      }
    ]
  },
  {
    id: '2',
    name: '输入轴分解',
    score: 25,
    subItems: [
      {
        id: '2-1',
        requirement: '从侧面将连接板T10084A推到输入轴上至限位位置,将调压工具T10081上的对中销插入输入轴和输出轴的孔内压下轴承托架及向心滚',
        description: '工具使用不正确扣4.0分,操作顺序不正确扣4.0分,操作不当导致工具或零件损坏本题0分',
        score: 8.0
      },
      {
        id: '2-2',
        requirement: '用开口弹簧钳SVW 161A拆下卡环滚柱轴承的轴承内圈与止推垫片、4挡滑动齿轮与滚针轴承、3挡和4挡滑套/同步体和3挡滑动齿轮一起',
        description: '工具使用不正确扣4.0分,操作顺序不正确扣4.0分,操作不当导致工具或零件损坏本题0分',
        score: 8.0
      },
      {
        id: '2-3',
        requirement: '分解3/4挡滑动齿套及同步器齿毂',
        description: '操作不当导致工具或零件损坏本题0分',
        score: 7.0
      }
    ]
  },
  {
    id: '3',
    name: '同步器测量',
    score: 20,
    subItems: [
      {
        id: '3-1',
        requirement: '将同步环压到换挡齿轮的圆锥体上,并用塞尺测量间隙尺寸',
        description: '未清洁结合面即测量扣4分;塞尺使用手法不正确扣4分',
        score: 8.0
      },
      {
        id: '3-2',
        requirement: '在3个位置错位120°后用塞尺测量间隙尺寸',
        description: '未在120°的三个均布位置测量扣3.0分,少测一个位置扣2分,直至扣完为止',
        score: 7.0
      },
      {
        id: '3-3',
        requirement: '记下平均值',
        description: '未记录或计算错误本项不得分',
        score: 6.0
      }
    ]
  },
  {
    id: '4',
    name: '输入轴装配',
    score: 45,
    subItems: [
      {
        id: '4-1',
        requirement: '将滑动套筒推到同步体上,将锁止块装入较深的凹槽内并错开120°安装弹簧,弹簧弯曲的一端必须嵌入空心锁块中',
        description: '弹簧未错开角度扣6.0分,弹簧未嵌入锁块扣5.0分',
        score: 11.0
      },
      {
        id: '4-2',
        requirement: '使用30-100和vw401压入3/4挡滑动齿套及同步器齿毂',
        description: '工具使用不正确扣6.0分,操作顺序不正确扣5.0分,操作不当导致工具或零件损坏本题0分',
        score: 11.0
      },
      {
        id: '4-3',
        requirement: '使用vw472/2、30-23、vw412和vw402压上轴套后安装第4挡滚针轴承、同步环及第4挡换挡齿轮和止推垫片',
        description: '工具使用不正确扣6.0分,操作顺序不正确扣6.0分,操作不当导致工具或零件损坏本题0分',
        score: 12.0
      },
      {
        id: '4-4',
        requirement: '使用vw412、vw422、vw472/2和vw401压入滚柱轴承的轴承内圈',
        description: '工具使用不正确扣6.0分,操作顺序不正确扣6.0分,操作不当导致工具或零件损坏本题0分',
        score: 12.0
      }
    ]
  }
]

export const IndicatorProvider = ({ children }) => {
  const [indicators, setIndicators] = useState(initialData)

  // 添加一级指标
  const addPrimaryIndicator = () => {
    const newId = String(Date.now())
    const newIndicator = {
      id: newId,
      name: '新项目',
      score: 0,
      subItems: []
    }
    setIndicators([...indicators, newIndicator])
    return newId
  }

  // 删除一级指标
  const deletePrimaryIndicator = (id) => {
    setIndicators(indicators.filter(ind => ind.id !== id))
  }

  // 更新一级指标
  const updatePrimaryIndicator = (id, updates) => {
    setIndicators(indicators.map(ind => 
      ind.id === id ? { ...ind, ...updates } : ind
    ))
  }

  // 添加二级指标
  const addSubItem = (primaryId, insertAfterIndex = null) => {
    const newSubItemId = `${primaryId}-${Date.now()}`
    const newSubItem = {
      id: newSubItemId,
      requirement: '操作要求',
      description: '评分说明',
      score: 0
    }
    setIndicators(indicators.map(ind => {
      if (ind.id === primaryId) {
        if (insertAfterIndex !== null && insertAfterIndex >= 0 && insertAfterIndex < ind.subItems.length) {
          // 在指定位置后插入
          const newSubItems = [...ind.subItems]
          newSubItems.splice(insertAfterIndex + 1, 0, newSubItem)
          return { ...ind, subItems: newSubItems }
        } else {
          // 默认添加到末尾
          return { ...ind, subItems: [...ind.subItems, newSubItem] }
        }
      }
      return ind
    }))
    return newSubItemId
  }

  // 删除二级指标
  const deleteSubItem = (primaryId, subItemId) => {
    setIndicators(indicators.map(ind => 
      ind.id === primaryId 
        ? { ...ind, subItems: ind.subItems.filter(item => item.id !== subItemId) }
        : ind
    ))
  }

  // 更新二级指标
  const updateSubItem = (primaryId, subItemId, updates) => {
    setIndicators(indicators.map(ind => 
      ind.id === primaryId 
        ? { 
            ...ind, 
            subItems: ind.subItems.map(item => 
              item.id === subItemId ? { ...item, ...updates } : item
            )
          }
        : ind
    ))
  }

  return (
    <IndicatorContext.Provider value={{
      indicators,
      addPrimaryIndicator,
      deletePrimaryIndicator,
      updatePrimaryIndicator,
      addSubItem,
      deleteSubItem,
      updateSubItem
    }}>
      {children}
    </IndicatorContext.Provider>
  )
}

export const useIndicators = () => {
  const context = useContext(IndicatorContext)
  if (!context) {
    throw new Error('useIndicators must be used within IndicatorProvider')
  }
  return context
}

