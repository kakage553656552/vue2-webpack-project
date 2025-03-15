<template>
  <div id="app">
    <div class="app-container">
      <!-- 左侧菜单栏 -->
      <div class="sidebar">
        <div class="logo-container">
          <div class="logo">V2</div>
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
export default {
  name: 'App'
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
  justify-content: center;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
}

.menu {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #b8c7ce;
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
