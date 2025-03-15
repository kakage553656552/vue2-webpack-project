<template>
  <div class="home">
    <div class="welcome-section">
      <div class="logo-container">
        <div class="logo animated-logo">V2</div>
      </div>
      <h1 class="animated-title">欢迎使用管理系统</h1>
      <p class="animated-subtitle">
        <span class="text-gradient">一个功能强大的管理平台</span>
        <span class="typing-cursor">|</span>
      </p>
      
      <div class="feature-tags">
        <div class="tag">高效</div>
        <div class="tag">安全</div>
        <div class="tag">易用</div>
        <div class="tag">智能</div>
        <div class="tag">可靠</div>
      </div>
    </div>
    
    <div class="dashboard-cards">
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">📊</div>
        <h3>数据概览</h3>
        <p>查看系统的关键指标和数据统计</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">📝</div>
        <h3>内容管理</h3>
        <p>管理系统中的所有内容和资源</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">👥</div>
        <h3>用户管理</h3>
        <p>管理用户账户、权限和角色</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">⚙️</div>
        <h3>系统设置</h3>
        <p>配置系统参数和全局设置</p>
      </el-card>
    </div>
    
    <!-- 添加测试组件 -->
    <test-component></test-component>
  </div>
</template>

<script>
import TestComponent from '@/components/TestComponent.vue'

export default {
  name: 'HomePage',
  components: {
    TestComponent
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 50%;
}

.animated-logo {
  animation: pulse 2s infinite alternate, rotate 20s linear infinite;
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.5);
}

@keyframes pulse {
  from {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(64, 158, 255, 0.5);
  }
  to {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(64, 158, 255, 0.8);
  }
}

@keyframes rotate {
  from {
    background: linear-gradient(45deg, #409EFF, #36D1DC);
    background-size: 200% 200%;
    background-position: 0% 0%;
  }
  to {
    background: linear-gradient(45deg, #409EFF, #36D1DC);
    background-size: 200% 200%;
    background-position: 100% 100%;
  }
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.animated-title {
  animation: slideInFromLeft 1s ease-out 0.3s both;
  font-size: 2.5rem;
  background: linear-gradient(45deg, #2c3e50, #4a6b8a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

p {
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.animated-subtitle {
  animation: slideInFromRight 1s ease-out 0.6s both;
  font-size: 1.2rem;
  display: inline-block;
  position: relative;
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.text-gradient {
  background: linear-gradient(45deg, #409EFF, #36D1DC);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.typing-cursor {
  display: inline-block;
  color: #409EFF;
  font-weight: bold;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.feature-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.tag {
  background: linear-gradient(45deg, #409EFF, #36D1DC);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: scale(0.8);
  animation: popIn 0.5s ease-out forwards;
}

.tag:nth-child(1) { animation-delay: 0.8s; }
.tag:nth-child(2) { animation-delay: 1.0s; }
.tag:nth-child(3) { animation-delay: 1.2s; }
.tag:nth-child(4) { animation-delay: 1.4s; }
.tag:nth-child(5) { animation-delay: 1.6s; }

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dashboard-cards {
  margin-top: 40px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dashboard-card {
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.dashboard-card:nth-child(1) { animation-delay: 1.0s; }
.dashboard-card:nth-child(2) { animation-delay: 1.2s; }
.dashboard-card:nth-child(3) { animation-delay: 1.4s; }
.dashboard-card:nth-child(4) { animation-delay: 1.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.dashboard-card:hover .card-icon {
  transform: scale(1.2);
}

.dashboard-card h3 {
  color: #409EFF;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.dashboard-card h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #409EFF, #36D1DC);
  transition: width 0.3s ease, left 0.3s ease;
}

.dashboard-card:hover h3::after {
  width: 100%;
  left: 0;
}

.dashboard-card p {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .dashboard-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .dashboard-card {
    width: 100%;
    max-width: 350px;
    margin-bottom: 20px;
  }
}
</style> 