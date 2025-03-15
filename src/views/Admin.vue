<template>
  <div class="admin">
    <div class="admin-header">
      <h1>{{ $t('admin.title') }}</h1>
      <p>{{ $t('admin.subtitle') }}</p>
    </div>
    
    <div class="admin-content">
      <el-card shadow="hover" class="admin-card" v-for="(card, index) in adminCards" :key="index">
        <div slot="header" class="card-header">
          <h2>{{ card.title }}</h2>
          <el-tag size="small" :type="card.tagType">{{ card.badge }}</el-tag>
        </div>
        <p>{{ card.description }}</p>
        <div class="card-actions">
          <el-button type="primary" size="small">{{ card.primaryAction }}</el-button>
          <el-button size="small">{{ card.secondaryAction }}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data() {
    return {
      adminCards: [
        {
          title: this.$t('admin.userManagement'),
          badge: `8 ${this.$t('admin.users')}`,
          tagType: 'primary',
          description: this.$t('admin.userManagementDesc'),
          primaryAction: this.$t('admin.viewUsers'),
          secondaryAction: this.$t('admin.addUser')
        },
        {
          title: this.$t('admin.contentManagement'),
          badge: `12 ${this.$t('admin.items')}`,
          tagType: 'success',
          description: this.$t('admin.contentManagementDesc'),
          primaryAction: this.$t('admin.viewContent'),
          secondaryAction: this.$t('admin.addContent')
        },
        {
          title: this.$t('admin.systemSettings'),
          badge: `5 ${this.$t('admin.options')}`,
          tagType: 'warning',
          description: this.$t('admin.systemSettingsDesc'),
          primaryAction: this.$t('admin.viewSettings'),
          secondaryAction: this.$t('admin.configure')
        },
        {
          title: this.$t('admin.dataStatistics'),
          badge: `3 ${this.$t('admin.reports')}`,
          tagType: 'info',
          description: this.$t('admin.dataStatisticsDesc'),
          primaryAction: this.$t('admin.viewReports'),
          secondaryAction: this.$t('admin.exportData')
        }
      ]
    }
  }
}
</script>

<style scoped>
.admin {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.admin-header {
  margin-bottom: 30px;
}

.admin-header h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 10px;
}

.admin-header p {
  color: #666;
  font-size: 16px;
}

.admin-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.admin-card {
  width: 300px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  color: #409EFF;
  font-size: 18px;
  margin: 0;
}

.admin-card p {
  color: #666;
  margin-bottom: 20px;
  min-height: 40px;
}

.card-actions {
  display: flex;
  gap: 10px;
}
</style> 