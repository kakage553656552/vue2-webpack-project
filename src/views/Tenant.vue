<template>
  <div class="tenant">
    <div class="tenant-header">
      <div class="tenant-title">
        <h2>{{ $t('tenant.title') }}</h2>
        <p>{{ $t('tenant.subtitle') }}</p>
      </div>
      <div class="tenant-search">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('tenant.searchPlaceholder')"
          prefix-icon="el-icon-search"
          clearable
          @clear="fetchTenants"
          @keyup.enter.native="fetchTenants"
        ></el-input>
        <el-button type="primary" @click="fetchTenants">{{ $t('tenant.search') }}</el-button>
      </div>
      <div class="tenant-actions">
        <el-button type="primary" icon="el-icon-plus">{{ $t('tenant.addTenant') }}</el-button>
        <el-button type="warning" icon="el-icon-refresh" @click="resetData">{{ $t('tenant.resetData') }}</el-button>
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
          <div v-if="tableLoading" class="table-skeleton">
            <el-skeleton :rows="10" animated />
          </div>
          <el-table
            v-else
            :data="tenants"
            style="width: 100%"
            border
            :max-height="tableHeight">
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
            :total="totalTenants"
            :disabled="tableLoading">
          </el-pagination>
        </div>
      </template>
    </el-card>
    
    <!-- 删除确认对话框 -->
    <el-dialog
      :title="$t('tenant.deleteConfirmTitle')"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <div class="delete-dialog-content">
        <p>{{ $t('tenant.deleteConfirmMessage', { name: deletingTenant ? deletingTenant.name : '' }) }}</p>
        <p class="delete-warning">{{ $t('tenant.deleteWarning') }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">{{ $t('tenant.cancel') }}</el-button>
        <el-button type="danger" @click="confirmDelete" :loading="deleteLoading">{{ $t('tenant.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTenants, deleteTenant, resetTenantsData } from '@/api/tenant';

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
      tableHeight: null,
      deleteDialogVisible: false,
      deletingTenant: null,
      deleteLoading: false
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
      this.tableLoading = true; // 始终使用表格加载状态
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
      this.deletingTenant = tenant;
      this.deleteDialogVisible = true;
    },
    
    // 确认删除租户
    confirmDelete() {
      if (!this.deletingTenant) return;
      
      this.deleteLoading = true;
      
      deleteTenant(this.deletingTenant.id)
        .then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: this.$t('tenant.deleteSuccess')
            });
            
            // 重新加载数据
            this.fetchTenants();
          } else {
            throw new Error(response.message || this.$t('tenant.deleteFailed'));
          }
        })
        .catch(error => {
          console.error('删除租户失败:', error);
          this.$message({
            type: 'error',
            message: error.message || this.$t('tenant.deleteFailed')
          });
        })
        .finally(() => {
          this.deleteLoading = false;
          this.deleteDialogVisible = false;
          this.deletingTenant = null;
        });
    },
    
    // 取消删除
    cancelDelete() {
      this.deleteDialogVisible = false;
      this.deletingTenant = null;
    },
    
    // 重置租户数据
    resetData() {
      this.tableLoading = true;
      
      resetTenantsData()
        .then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: this.$t('tenant.resetSuccess')
            });
            
            // 重新加载数据
            this.fetchTenants();
          }
        })
        .catch(error => {
          console.error('重置数据失败:', error);
          this.tableLoading = false;
        });
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

.tenant-search {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tenant-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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
  position: relative; /* 为骨架屏定位 */
}

.table-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: white;
  padding: 10px;
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

/* 自定义滚动条样式 */
/* 整体滚动条 */
.table-container >>> ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 滚动条轨道 */
.table-container >>> ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

/* 滚动条滑块 */
.table-container >>> ::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 4px;
}

/* 鼠标悬停在滑块上 */
.table-container >>> ::-webkit-scrollbar-thumb:hover {
  background: #909399;
}

/* 滚动条角落 */
.table-container >>> ::-webkit-scrollbar-corner {
  background: #f1f1f1;
}

/* 确保表格内部的滚动条也使用自定义样式 */
.table-container >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-container >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-container >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 4px;
}

.table-container >>> .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
  background: #909399;
}

/* 删除对话框样式 */
.delete-dialog-content {
  padding: 10px 0;
}

.delete-warning {
  color: #E6A23C;
  margin-top: 10px;
  font-size: 14px;
}
</style> 