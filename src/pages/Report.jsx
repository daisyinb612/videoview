import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIndicators } from '../context/IndicatorContext'
import videoImage from '../image/video.png'
import reportImage from '../image/report.png'
import './Report.css'

const Report = () => {
  const navigate = useNavigate()
  const { indicators } = useIndicators()
  const [selectedVideo, setSelectedVideo] = useState(1)

  const handleBack = () => {
    navigate('/')
  }

  const handleChat = () => {
    navigate('/chat')
  }

  const handleExport = () => {
    alert('导出报告功能')
  }

  const handleImport = () => {
    alert('导入视频功能')
  }

  // 模拟视频数据
  const videos = [
    { id: 1, name: '视频1', score: 90, pass: true },
    { id: 2, name: '视频2', score: 85, pass: true },
    { id: 3, name: '视频3', score: 75, pass: false }
  ]

  const selectedVideoData = videos.find(v => v.id === selectedVideo) || videos[0]

  // 模拟报告数据
  const reportData = [
    {
      title: '一、作业准备',
      label: '满分',
      labelColor: 'purple',
      score: 0,
      feedback: '该生操作没有问题,拿到满分。'
    },
    {
      title: '二、输入轴分解',
      label: '扣分',
      labelColor: 'orange',
      score: -5,
      feedback: '如图所示在这种情况下操作错误,扣5分。',
      hasImage: true
    },
    {
      title: '三、同步器测量',
      label: '扣分',
      labelColor: 'pink',
      score: -5,
      feedback: '没有记下平均值,扣5分。'
    },
    {
      title: '四、输入轴装配',
      label: '满分',
      labelColor: 'blue',
      score: 0,
      feedback: '该生操作没有问题,拿到满分。'
    }
  ]

  return (
    <div className="report-container">
      <div className="report-header">
        <button className="back-btn" onClick={handleBack} aria-label="返回编辑">
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
        <h1>查看报告</h1>
      </div>

      <div className="report-content">
        {/* 第一部分：视频选择列表 */}
        <div className="video-selection-panel">
          <div className="video-list">
            {videos.map((video) => (
              <button
                key={video.id}
                className={`video-item ${selectedVideo === video.id ? 'selected' : ''}`}
                onClick={() => setSelectedVideo(video.id)}
              >
                {video.name}
              </button>
            ))}
          </div>
          <button className="import-btn" onClick={handleImport}>
            导入
          </button>
        </div>

        {/* 第二部分：视频展示 */}
        <div className="video-section">
          <div className="video-display-panel">
            <div className="video-display-header">
              <h2>视频展示</h2>
              <div className="score-badge">
                {selectedVideoData.pass ? '合格' : '不合格'}: {selectedVideoData.score}分
              </div>
            </div>
            
            <div className="video-frame-container">
              <img 
                src={videoImage} 
                alt="视频截图" 
                className="video-frame"
              />
            </div>

            {/* 时间轴 - 第一条横线 */}
            <div className="timeline-container">
              <div className="timeline-segments">
                <div className="timeline-segment purple" style={{ width: '25%' }}></div>
                <div className="timeline-segment orange" style={{ width: '25%' }}></div>
                <div className="timeline-segment pink" style={{ width: '25%' }}></div>
                <div className="timeline-segment blue" style={{ width: '25%' }}></div>
              </div>
            </div>

            {/* 进度条 - 第二条横线 */}
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-markers">
                  <div className="progress-marker thin" style={{ left: '10%' }}></div>
                  <div className="progress-marker" style={{ left: '20%' }}></div>
                  <div className="progress-marker" style={{ left: '25%' }}></div>
                  <div className="progress-marker" style={{ left: '30%' }}></div>
                  <div className="progress-marker" style={{ left: '60%' }}></div>
                  <div className="progress-marker" style={{ left: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* 图例和统计 */}
            <div className="legend-stats">
              <div className="legend-column">
                <div className="legend-item">
                  <span className="legend-color purple"></span>
                  <span>作业准备</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color orange"></span>
                  <span>输入轴分解</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color pink"></span>
                  <span>同步器测量</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color blue"></span>
                  <span>输入轴装配</span>
                </div>
              </div>
              <div className="legend-column">
                <div className="legend-item">
                  <span className="legend-color red-dark"></span>
                  <span>致命错误 0次</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color red-medium"></span>
                  <span>操作失误 1次</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color red-light"></span>
                  <span>失误风险 3次</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color green"></span>
                  <span>符合规范</span>
                </div>
              </div>
            </div>
          </div>

          {/* 智能对话条（与视频展示同风格） */}
          <div className="chat-bar">
            <div className="chat-bar-title">智能对话</div>
            <button className="chat-bar-btn" onClick={handleChat}>展开对话</button>
          </div>
        </div>

        {/* 第三部分：报告内容 */}
        <div className="report-panel">
          <div className="report-panel-header">
            <h2>视频报告</h2>
            <button className="export-btn" onClick={handleExport}>
              下载
            </button>
          </div>
          
          <div className="report-content-area">
            <div className="overall-description">
              <p>总体描述总体描述总体描述总体描述总体描述总体描述总体描述总体描述总体描述</p>
            </div>

            <div className="report-details">
              {reportData.map((item, index) => (
                <div key={index} className="report-item">
                  <div className="report-item-header">
                    <span className={`score-label ${item.labelColor}`}>
                      {item.label}
                    </span>
                    <h3>{item.title}</h3>
                    {item.score !== undefined && (
                      <span className={`score-value ${item.score < 0 ? 'score-negative' : ''}`}>
                        {item.score < 0 ? item.score : item.score === 0 ? '' : item.score}
                      </span>
                    )}
                  </div>
                  <div className="report-item-feedback">
                    <p>{item.feedback}</p>
                    {item.hasImage && (
                      <div className="feedback-image">
                        <img 
                          src={reportImage} 
                          alt="反馈图片"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report

