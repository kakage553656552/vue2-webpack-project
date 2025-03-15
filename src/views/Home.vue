<template>
  <div class="home">
    <div class="welcome-section">
      <div class="logo-container">
        <div class="logo">V2</div>
      </div>
      <h1>欢迎使用管理系统</h1>
      <p>一个功能强大的管理平台</p>
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
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
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

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-cards {
  margin-top: 40px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.dashboard-card {
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 15px;
}

.dashboard-card h3 {
  color: #409EFF;
  margin-bottom: 10px;
}

.dashboard-card p {
  color: #666;
  font-size: 14px;
}
</style> 