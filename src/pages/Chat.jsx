import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reportImage from '../image/report.png'
import './Report.css'
import './Chat.css'

const Chat = () => {
  const navigate = useNavigate()
  const [selectedVideo, setSelectedVideo] = useState(1)

  const handleBack = () => {
    navigate('/')
  }

  const handleViewVideo = () => {
    navigate('/report')
  }

  // 模拟视频数据
  const videos = [
    { id: 1, name: '视频1', score: 90, pass: true },
    { id: 2, name: '视频2', score: 85, pass: true },
    { id: 3, name: '视频3', score: 75, pass: false }
  ]

  // 与报告相同的评分数据
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
        <h1>智能对话</h1>
      </div>

      <div className="report-content">
        {/* 左侧：视频选择列表，保持一致 */}
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
          <button className="import-btn" onClick={() => alert('导入视频功能')}>
            导入
          </button>
        </div>

        {/* 中间：收起视频展示，展开智能对话 */}
        <div className="chat-main-panel">
          <div className="video-collapsed">
            <div className="video-collapsed-title">视频展示</div>
            <button className="video-view-btn" onClick={handleViewVideo}>查看视频</button>
          </div>

          <div className="chat-panel">
            <div className="chat-panel-title">智能对话</div>

            <div className="chat-bubbles">
              <div className="bubble bubble-right">怎么给学生回复</div>
              <div className="bubble bubble-left">
                给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是
              </div>
              <div className="bubble bubble-right">总结主要问题</div>
              <div className="bubble bubble-left">
                给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是给这位学生的回复建议是
              </div>
            </div>

            <div className="chat-input-bar">
              <input className="chat-input" placeholder="输入..." />
              <button className="chat-send-btn">发送</button>
            </div>
          </div>
        </div>

        {/* 右侧：报告内容与报告页一致 */}
        <div className="report-panel">
          <div className="report-panel-header">
            <h2>视频报告</h2>
            <button className="export-btn" onClick={() => alert('导出报告功能')}>
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

export default Chat

