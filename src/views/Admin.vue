<template>
  <div class="admin">
    <div class="admin-header">
      <h1>系统管理</h1>
      <p>管理系统设置和配置</p>
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
          title: '用户管理',
          badge: '8 用户',
          tagType: 'primary',
          description: '用户管理描述',
          primaryAction: '查看用户',
          secondaryAction: '添加用户'
        },
        {
          title: '内容管理',
          badge: '12 项目',
          tagType: 'success',
          description: '内容管理描述',
          primaryAction: '查看内容',
          secondaryAction: '添加内容'
        },
        {
          title: '系统设置',
          badge: '5 选项',
          tagType: 'warning',
          description: '系统设置描述',
          primaryAction: '查看设置',
          secondaryAction: '配置'
        },
        {
          title: '数据统计',
          badge: '3 报告',
          tagType: 'info',
          description: '数据统计描述',
          primaryAction: '查看报告',
          secondaryAction: '导出数据'
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