<template>
  <div id="app">
    <div class="app-container">
      <!-- 左侧菜单栏 -->
      <div class="sidebar">
        <div class="logo-container">
          <Logo />
          <!-- 在logo下方添加时钟 -->
          <div class="sidebar-clock">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
          </div>
        </div>
        <nav class="menu">
          <router-link to="/" class="menu-item">
            <span class="menu-icon">🏠</span>
            <span class="menu-text">首页</span>
          </router-link>
          <router-link to="/dashboard" class="menu-item">
            <span class="menu-icon">📊</span>
            <span class="menu-text">仪表盘</span>
          </router-link>
          <router-link to="/tenant" class="menu-item">
            <span class="menu-icon">🏢</span>
            <span class="menu-text">租户管理</span>
          </router-link>
          <router-link to="/admin" class="menu-item">
            <span class="menu-icon">⚙️</span>
            <span class="menu-text">系统管理</span>
          </router-link>
          <router-link to="/weather" class="menu-item">
            <span class="menu-icon">🌤️</span>
            <span class="menu-text">天气</span>
          </router-link>
          <router-link to="/news" class="menu-item">
            <span class="menu-icon">📰</span>
            <span class="menu-text">新闻</span>
          </router-link>
        </nav>
      </div>
      
      <!-- 主内容区域 -->
      <div class="main-content">
        <div class="header-container">
          <!-- 移除语言切换器 -->
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from '@/components/Logo.vue'

export default {
  name: 'App',
  components: {
    Logo: AppLogo
  },
  data() {
    return {
      currentTime: '',
      currentDate: '',
      timer: null
    }
  },
  mounted() {
    this.updateTime();
    // 每秒更新一次时间
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      
      // 格式化时间 HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;
      
      // 格式化日期 MM月DD日 星期几
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const weekday = weekdays[now.getDay()];
      this.currentDate = `${month}月${day}日 星期${weekday}`;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden; /* 防止body滚动 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden; /* 防止app容器滚动 */
}

.app-container {
  display: flex;
  height: 100%;
  overflow: hidden; /* 防止容器滚动 */
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh; /* 确保侧边栏占满整个视口高度 */
  overflow-y: auto; /* 如果侧边栏内容过多，允许滚动 */
}

.logo-container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* 移除背景渐变 */
  /* background: linear-gradient(180deg, rgba(64, 158, 255, 0.1), transparent); */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
  margin-bottom: 10px;
}

/* 添加logo组件的底部间距 */
.logo {
  margin-bottom: 15px;
}

/* 侧边栏时钟样式 */
.sidebar-clock {
  text-align: center;
  width: 85%;
  padding: 10px 15px;
  background: linear-gradient(145deg, #2c3e50, #1e2b38);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  animation: fadeIn 1s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.sidebar-clock:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.sidebar-clock::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.sidebar-clock::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sidebar-clock .time {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #42b983;
  text-shadow: 0 0 10px rgba(66, 185, 131, 0.5);
  position: relative;
  z-index: 1;
  font-family: 'Consolas', monospace;
  animation: textPulse 2s infinite ease-in-out;
}

/* 移除小点 */
.sidebar-clock .time::before {
  display: none;
}

@keyframes textPulse {
  0% { 
    text-shadow: 0 0 10px rgba(66, 185, 131, 0.5);
  }
  50% { 
    text-shadow: 0 0 15px rgba(66, 185, 131, 0.8);
  }
  100% { 
    text-shadow: 0 0 10px rgba(66, 185, 131, 0.5);
  }
}

.sidebar-clock .date {
  font-size: 0.8rem;
  color: #e0e6eb;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  margin-top: 4px;
  opacity: 0.8;
  font-weight: 300;
}

.menu {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #e0e6eb; /* 更亮的文字颜色，提高对比度 */
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #1e2b38;
  color: white;
}

.menu-icon {
  margin-right: 10px;
  font-size: 18px;
}

.menu-text {
  font-size: 14px;
  font-weight: 500; /* 增加字体粗细 */
  letter-spacing: 0.5px; /* 增加字母间距 */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* 添加文字阴影增强可读性 */
}

.router-link-exact-active {
  background-color: #1e2b38;
  color: #42b983;
  border-left: 4px solid #42b983;
}

.header-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(245, 247, 250, 0.9);
  backdrop-filter: blur(5px);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 只允许主内容区域滚动 */
  background-color: #f5f7fa;
  height: 100vh; /* 确保主内容区域占满整个视口高度 */
  padding: 0;
}
</style>
