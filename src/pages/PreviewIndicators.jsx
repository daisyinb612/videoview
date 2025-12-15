import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useIndicators } from '../context/IndicatorContext'
import './PreviewIndicators.css'

const PreviewIndicators = () => {
  const navigate = useNavigate()
  const { indicators } = useIndicators()

  const handleBack = () => {
    navigate('/')
  }

  const getTotalScore = () => {
    return indicators.reduce((sum, ind) => sum + ind.score, 0)
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-btn" onClick={handleBack} aria-label="返回">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>大众02T变速器输入轴分解与装配评分表</h1>
      </div>

      <div className="preview-content-wrapper">
        <div className="preview-content">
          <div className="preview-table-header">
            <div className="preview-header-cell project-col">项目名称 (配分)</div>
            <div className="preview-header-cell">子项配分</div>
            <div className="preview-header-cell">操作要求</div>
            <div className="preview-header-cell">评分说明</div>
          </div>

          {indicators.map((indicator, index) => (
            <div key={indicator.id} className="indicator-group">
              {/* 一级指标 - 左侧 */}
              <div className="preview-primary-section">
                <div className="primary-indicator-box">
                  <span className="primary-number">{index + 1}</span>
                  <span className="primary-name">{indicator.name}</span>
                  <div className="primary-score-box">
                    <span>{indicator.score}</span>
                  </div>
                </div>
              </div>

              {/* 二级指标 - 右侧，纵向排列 */}
              <div className="preview-secondary-section">
                {indicator.subItems.map((subItem) => (
                  <div key={subItem.id} className="preview-sub-row">
                    <div className="preview-sub-cell score-cell">
                      <span className="sub-score-text">{subItem.score}</span>
                    </div>
                    <div className="preview-sub-cell">
                      <span className="sub-text">{subItem.requirement}</span>
                    </div>
                    <div className="preview-sub-cell">
                      <span className="sub-text">{subItem.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewIndicators

