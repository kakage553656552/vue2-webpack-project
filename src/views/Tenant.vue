<template>
  <div class="tenant">
    <div class="tenant-header">
      <h1>{{ $t('tenant.title') }}</h1>
      <p>{{ $t('tenant.subtitle') }}</p>
      
      <div class="tenant-actions">
        <el-input
          :placeholder="$t('tenant.searchPlaceholder')"
          prefix-icon="el-icon-search"
          v-model="searchQuery"
          class="search-input"
          @input="handleSearch">
        </el-input>
        <el-button type="primary" icon="el-icon-plus">{{ $t('tenant.addTenant') }}</el-button>
      </div>
    </div>
    
    <el-card shadow="hover" class="tenant-table-card">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>
      
      <div v-else-if="error" class="error-container">
        <el-alert
          :title="$t('tenant.loadError')"
          type="error"
          :description="error"
          show-icon>
        </el-alert>
        <el-button type="primary" @click="fetchTenants" class="retry-button">
          {{ $t('tenant.retry') }}
        </el-button>
      </div>
      
      <template v-else>
        <div class="table-container">
          <el-table
            :data="tenants"
            style="width: 100%"
            border
            :max-height="tableHeight"
            v-loading="tableLoading">
            <el-table-column :label="$t('tenant.tenantName')" min-width="200">
              <template slot-scope="scope">
                <div class="tenant-name">
                  <el-avatar :size="36" :style="{ backgroundColor: scope.row.color }">
                    {{ scope.row.name.charAt(0) }}
                  </el-avatar>
                  <div>
                    <div class="name">{{ scope.row.name }}</div>
                    <div class="tenant-id">{{ $t('tenant.id') }}: {{ scope.row.id }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" :label="$t('tenant.createdTime')" width="120"></el-table-column>
            <el-table-column :label="$t('tenant.status')" width="120">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 'active' ? 'success' : scope.row.status === 'pending' ? 'warning' : 'danger'"
                  size="medium">
                  {{ scope.row.status === 'active' ? $t('tenant.statusActive') : 
                     scope.row.status === 'pending' ? $t('tenant.statusPending') : 
                     $t('tenant.statusDisabled') }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="users" :label="$t('tenant.userCount')" width="100"></el-table-column>
            <el-table-column prop="storage" :label="$t('tenant.storageSpace')" width="120"></el-table-column>
            <el-table-column :label="$t('tenant.actions')" width="200">
              <template slot-scope="scope">
                <div class="action-buttons">
                  <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editTenant(scope.row)">
                    {{ $t('tenant.edit') }}
                  </el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteTenant(scope.row)">
                    {{ $t('tenant.delete') }}
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalTenants">
          </el-pagination>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getTenants } from '@/api/tenant';

export default {
  name: 'TenantPage',
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      totalTenants: 0,
      tenants: [],
      loading: true,
      tableLoading: false,
      error: null,
      searchTimeout: null,
      tableHeight: null
    }
  },
  mounted() {
    this.calculateTableHeight();
    window.addEventListener('resize', this.calculateTableHeight);
    this.fetchTenants();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableHeight);
  },
  methods: {
    // 获取租户数据
    fetchTenants() {
      this.tableLoading = !this.loading; // 如果是首次加载，使用骨架屏，否则使用表格加载动画
      this.error = null;
      
      getTenants({
        page: this.currentPage,
        pageSize: this.pageSize,
        query: this.searchQuery
      })
        .then(response => {
          if (response.code === 200) {
            this.tenants = response.data.list;
            this.totalTenants = response.data.pagination.total;
            this.currentPage = response.data.pagination.current;
            this.loading = false;
            this.tableLoading = false;
          } else {
            throw new Error(response.message || '获取数据失败');
          }
        })
        .catch(error => {
          console.error('获取租户数据失败:', error);
          this.error = error.message || '获取租户数据失败，请稍后重试';
          this.loading = false;
          this.tableLoading = false;
        });
    },
    
    // 处理搜索输入
    handleSearch() {
      // 防抖处理，避免频繁请求
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1; // 重置到第一页
        this.fetchTenants();
      }, 300);
    },
    
    // 计算表格高度
    calculateTableHeight() {
      // 根据页面高度动态计算表格高度
      // 减去其他元素的高度（头部、分页等）
      this.tableHeight = window.innerHeight - 250;
    },
    
    // 处理每页数量变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 重置到第一页
      this.fetchTenants();
    },
    
    // 处理页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchTenants();
    },
    
    // 编辑租户
    editTenant(tenant) {
      console.log('编辑租户:', tenant);
      // 这里添加编辑租户的逻辑
    },
    
    // 删除租户
    deleteTenant(tenant) {
      console.log('删除租户:', tenant);
      // 这里添加删除租户的逻辑
    }
  }
}
</script>

<style scoped>
.tenant {
  padding: 15px; /* 减少整体内边距 */
  height: 100%;
  overflow: hidden; /* 防止整体出现滚动条 */
  display: flex;
  flex-direction: column;
}

.tenant-header {
  margin-bottom: 15px; /* 减少底部边距 */
}

.tenant-header h1 {
  color: #2c3e50;
  font-size: 24px; /* 减小字体大小 */
  margin-bottom: 5px;
}

.tenant-header p {
  color: #666;
  font-size: 14px; /* 减小字体大小 */
  margin-bottom: 15px;
}

.tenant-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.search-input {
  width: 300px;
}

.tenant-table-card {
  margin-bottom: 0; /* 移除底部边距 */
  flex: 1; /* 让卡片占据剩余空间 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 表格容器样式 */
.table-container {
  flex: 1; /* 让表格容器占据卡片的剩余空间 */
  margin-bottom: 0; /* 移除底部边距 */
  overflow: hidden; /* 防止内容溢出 */
}

.tenant-name {
  display: flex;
  align-items: center;
  gap: 8px; /* 减少间距 */
}

.name {
  font-weight: bold;
  color: #2c3e50;
}

.tenant-id {
  font-size: 12px;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.pagination {
  margin-top: 0; /* 移除上边距 */
  display: flex;
  justify-content: center;
  padding: 5px 0;
  border-top: 1px solid #ebeef5;
}

/* 确保el-card__body正确显示内容 */
.tenant-table-card >>> .el-card__body {
  padding: 5px; /* 进一步减少内边距 */
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保卡片内容占满卡片高度 */
}
</style> 