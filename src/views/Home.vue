<template>
  <div class="home">
    <div class="welcome-section">
      <div class="logo-container">
        <div class="logo">V2</div>
      </div>
      <h1>{{ $t('home.title') }}</h1>
      <p>{{ $t('home.subtitle') }}</p>
    </div>
    
    <div class="dashboard-cards">
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">📊</div>
        <h3>{{ $t('home.dataOverview') }}</h3>
        <p>{{ $t('home.dataOverviewDesc') }}</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">📝</div>
        <h3>{{ $t('home.contentManagement') }}</h3>
        <p>{{ $t('home.contentManagementDesc') }}</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">👥</div>
        <h3>{{ $t('home.userManagement') }}</h3>
        <p>{{ $t('home.userManagementDesc') }}</p>
      </el-card>
      <el-card shadow="hover" class="dashboard-card">
        <div class="card-icon">⚙️</div>
        <h3>{{ $t('home.systemSettings') }}</h3>
        <p>{{ $t('home.systemSettingsDesc') }}</p>
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