<template>
  <div class="test-component">
    <h3>{{ $t('testComponent.title') }}</h3>
    <p>{{ $t('testComponent.description') }}</p>
    <p>{{ $t('testComponent.currentTime') }}: {{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      currentTime: new Date().toLocaleTimeString()
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  }
}
</script>

<style scoped>
.test-component {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style> 