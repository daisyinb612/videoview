import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIndicators } from '../context/IndicatorContext'
import './EditIndicators.css'

const EditIndicators = () => {
  const navigate = useNavigate()
  const { 
    indicators, 
    addPrimaryIndicator, 
    deletePrimaryIndicator, 
    updatePrimaryIndicator,
    addSubItem,
    deleteSubItem,
    updateSubItem
  } = useIndicators()
  
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(indicators[0]?.id || null)

  const handlePreview = () => {
    navigate('/preview')
  }

  const selectedIndicator = indicators.find(ind => ind.id === selectedPrimaryId)

  return (
    <div className="edit-container">
      <div className="edit-header">
        <h1>指标编辑</h1>
        <button className="confirm-report-btn" onClick={() => {
          navigate('/report')
        }}>
          确认指标，生成报告
        </button>
      </div>

      {/* 一级指标区域 */}
      <div className="primary-section">
        <div className="section-title-row">
          <div className="section-title">一级指标: 项目名称/配分</div>
          <button 
            className="section-action-btn"
            onClick={handlePreview}
          >
            预览全部指标
          </button>
        </div>
        <div className="primary-indicators">
          {indicators.map((indicator) => (
            <div
              key={indicator.id}
              className={`primary-card ${selectedPrimaryId === indicator.id ? 'selected' : ''}`}
              onClick={() => setSelectedPrimaryId(indicator.id)}
            >
              <input
                type="text"
                value={indicator.name}
                onChange={(e) => updatePrimaryIndicator(indicator.id, { name: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="primary-name-input"
              />
              <input
                type="number"
                value={indicator.score}
                onChange={(e) => updatePrimaryIndicator(indicator.id, { score: parseInt(e.target.value, 10) || 0 })}
                onClick={(e) => e.stopPropagation()}
                className="primary-score-input"
                min="0"
                step="1"
              />
              <button
                className="delete-primary-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  if (window.confirm('确定要删除这个一级指标吗？')) {
                    deletePrimaryIndicator(indicator.id)
                    if (selectedPrimaryId === indicator.id) {
                      const remaining = indicators.filter(ind => ind.id !== indicator.id)
                      setSelectedPrimaryId(remaining[0]?.id || null)
                    }
                  }
                }}
                title="删除"
              >
                ×
              </button>
            </div>
          ))}
          <button 
            className="add-primary-btn"
            onClick={addPrimaryIndicator}
            title="添加一级指标"
          >
            +
          </button>
        </div>
      </div>

      {/* 二级指标区域 */}
      <div className="secondary-section">
        <div className="section-title-row">
          <div className="section-title">二级指标: 操作要求/评分说明/子项配分</div>
          <button 
            className="section-action-btn"
            onClick={() => {
              if (selectedPrimaryId) {
                const indicator = indicators.find(ind => ind.id === selectedPrimaryId)
                if (indicator && indicator.subItems.length === 0) {
                  alert('请至少添加一个二级指标')
                  return
                }
              }
              alert('修改已保存')
            }}
          >
            确认修改二级指标
          </button>
        </div>
        {selectedIndicator ? (
          <div className="secondary-table">
            <div className="table-header">
              <div className="header-cell">子项配分</div>
              <div className="header-cell">操作要求</div>
              <div className="header-cell">评分说明</div>
              <div className="header-cell actions">操作</div>
            </div>
            {selectedIndicator.subItems.map((subItem, index) => (
              <div key={subItem.id} className="table-row">
                <div className="table-cell">
                  <input
                    type="number"
                    value={subItem.score}
                    onChange={(e) => updateSubItem(selectedPrimaryId, subItem.id, { score: parseInt(e.target.value, 10) || 0 })}
                    className="sub-score-input"
                    min="0"
                    step="1"
                  />
                </div>
                <div className="table-cell">
                  <textarea
                    value={subItem.requirement}
                    onChange={(e) => updateSubItem(selectedPrimaryId, subItem.id, { requirement: e.target.value })}
                    className="requirement-input"
                    rows="1"
                  />
                </div>
                <div className="table-cell">
                  <textarea
                    value={subItem.description}
                    onChange={(e) => updateSubItem(selectedPrimaryId, subItem.id, { description: e.target.value })}
                    className="description-input"
                    rows="1"
                  />
                </div>
                <div className="table-cell actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteSubItem(selectedPrimaryId, subItem.id)}
                    title="删除"
                  >
                    ×
                  </button>
                  <button
                    className="add-sub-btn"
                    onClick={() => addSubItem(selectedPrimaryId, index)}
                    title="添加子项"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            {selectedIndicator.subItems.length === 0 && (
              <div className="empty-state">
                <button
                  className="add-first-sub-btn"
                  onClick={() => addSubItem(selectedPrimaryId)}
                >
                  添加第一个二级指标
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="no-selection">请先选择或创建一个一级指标</div>
        )}
      </div>
    </div>
  )
}

export default EditIndicators

