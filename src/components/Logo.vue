<template>
  <div class="logo animated-logo">V2</div>
</template>

<script>
export default {
  name: 'AppLogo'
}
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
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
</style> 