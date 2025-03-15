<template>
  <div class="tenant">
    <div class="tenant-header">
      <div class="tenant-title">
        <h2>租户管理</h2>
        <p>管理系统中的租户信息</p>
      </div>
      <div class="tenant-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索租户"
          prefix-icon="el-icon-search"
          clearable
          @clear="fetchTenants"
          @keyup.enter.native="fetchTenants"
        ></el-input>
        <el-button type="primary" @click="fetchTenants">搜索</el-button>
      </div>
      <div class="tenant-actions">
        <el-button type="primary" icon="el-icon-plus" @click="showAddTenantDialog">添加租户</el-button>
        <el-button type="warning" icon="el-icon-refresh" @click="resetData">重置数据</el-button>
      </div>
    </div>
    
    <el-card shadow="hover" class="tenant-table-card">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>
      
      <div v-else-if="error" class="error-container">
        <el-alert
          :title="loadError"
          type="error"
          :description="error"
          show-icon>
        </el-alert>
        <el-button type="primary" @click="fetchTenants" class="retry-button">
          {{ retry }}
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
            <el-table-column :label="tenantNameLabel" min-width="200">
              <template slot-scope="scope">
                <div class="tenant-name">
                  <el-avatar :size="36" :style="{ backgroundColor: scope.row.color }">
                    {{ scope.row.name.charAt(0) }}
                  </el-avatar>
                  <div>
                    <div class="name">{{ scope.row.name }}</div>
                    <div class="tenant-id">{{ idLabel }}: {{ scope.row.id }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" :label="createdTimeLabel" width="120"></el-table-column>
            <el-table-column :label="statusLabel" width="120">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 'active' ? 'success' : scope.row.status === 'pending' ? 'warning' : 'danger'"
                  size="medium">
                  {{ scope.row.status === 'active' ? statusActive : 
                     scope.row.status === 'pending' ? statusPending : 
                     statusDisabled }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="users" :label="userCountLabel" width="100"></el-table-column>
            <el-table-column prop="storage" :label="storageSpaceLabel" width="120"></el-table-column>
            <el-table-column :label="actionsLabel" width="200">
              <template slot-scope="scope">
                <div class="action-buttons">
                  <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editTenant(scope.row)">
                    {{ edit }}
                  </el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteTenant(scope.row)">
                    {{ deleteLabel }}
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
      :title="deleteConfirmTitle"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <div class="delete-dialog-content">
        <p>{{ deleteConfirmMessage }}</p>
        <p class="delete-warning">{{ deleteWarning }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">{{ cancel }}</el-button>
        <el-button type="danger" @click="confirmDelete" :loading="deleteLoading">{{ confirm }}</el-button>
      </span>
    </el-dialog>
    
    <!-- 添加租户对话框 -->
    <el-dialog
      title="添加租户"
      :visible.sync="addDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @closed="resetAddForm">
      <el-form :model="tenantForm" :rules="tenantRules" ref="tenantForm" label-width="100px" label-position="right">
        <el-form-item label="租户名称" prop="name">
          <el-input v-model="tenantForm.name" placeholder="请输入租户名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="tenantForm.status" placeholder="请选择租户状态" style="width: 100%">
            <el-option label="活跃" value="active"></el-option>
            <el-option label="待审核" value="pending"></el-option>
            <el-option label="已禁用" value="disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户数量" prop="users">
          <el-input-number v-model="tenantForm.users" :min="0" :max="1000" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="存储空间" prop="storage">
          <el-input v-model="tenantForm.storage" placeholder="请输入存储空间，例如：1.5 TB"></el-input>
        </el-form-item>
        <el-form-item label="颜色标识" prop="color">
          <el-color-picker v-model="tenantForm.color" show-alpha></el-color-picker>
          <span class="color-preview" :style="{ backgroundColor: tenantForm.color }"></span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddTenant" :loading="addLoading">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTenants, deleteTenant, resetTenantsData, createTenant } from '@/api/tenant';

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
      deleteLoading: false,
      
      // 添加租户相关数据
      addDialogVisible: false,
      addLoading: false,
      tenantForm: {
        name: '',
        status: 'active',
        users: 0,
        storage: '0 TB',
        color: '#409EFF'
      },
      tenantRules: {
        name: [
          { required: true, message: '请输入租户名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择租户状态', trigger: 'change' }
        ],
        users: [
          { required: true, message: '请输入用户数量', trigger: 'blur' }
        ],
        storage: [
          { required: true, message: '请输入存储空间', trigger: 'blur' },
          { pattern: /^\d+(\.\d+)?\s(GB|TB|PB)$/, message: '格式应为：数字 单位，例如：1.5 TB', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请选择颜色标识', trigger: 'change' }
        ]
      },
      
      // 添加国际化文本的静态替换
      loadError: '加载错误',
      retry: '重试',
      tenantNameLabel: '租户名称',
      idLabel: 'ID',
      createdTimeLabel: '创建时间',
      statusLabel: '状态',
      statusActive: '活跃',
      statusPending: '待审核',
      statusDisabled: '已禁用',
      userCountLabel: '用户数',
      storageSpaceLabel: '存储空间',
      actionsLabel: '操作',
      edit: '编辑',
      deleteLabel: '删除',
      deleteConfirmTitle: '确认删除',
      deleteConfirmMessage: '确定要删除该租户吗？',
      deleteWarning: '此操作将永久删除该租户，是否继续？',
      cancel: '取消',
      confirm: '确认'
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
              message: '租户删除成功'
            });
            
            // 重新加载数据
            this.fetchTenants();
          } else {
            throw new Error(response.message || '删除租户失败');
          }
        })
        .catch(error => {
          console.error('删除租户失败:', error);
          this.$message({
            type: 'error',
            message: error.message || '删除租户失败，请稍后重试'
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
              message: '租户数据重置成功'
            });
            
            // 重新加载数据
            this.fetchTenants();
          }
        })
        .catch(error => {
          console.error('重置数据失败:', error);
          this.tableLoading = false;
        });
    },
    
    // 显示添加租户对话框
    showAddTenantDialog() {
      this.addDialogVisible = true;
    },
    
    // 重置添加租户表单
    resetAddForm() {
      if (this.$refs.tenantForm) {
        this.$refs.tenantForm.resetFields();
      }
      this.tenantForm = {
        name: '',
        status: 'active',
        users: 0,
        storage: '0 TB',
        color: '#409EFF'
      };
    },
    
    // 提交添加租户表单
    submitAddTenant() {
      this.$refs.tenantForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          
          createTenant(this.tenantForm)
            .then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '租户添加成功'
                });
                
                // 关闭对话框
                this.addDialogVisible = false;
                
                // 重新加载数据
                this.fetchTenants();
              } else {
                throw new Error(response.message || '添加租户失败');
              }
            })
            .catch(error => {
              console.error('添加租户失败:', error);
              this.$message({
                type: 'error',
                message: error.message || '添加租户失败，请稍后重试'
              });
            })
            .finally(() => {
              this.addLoading = false;
            });
        } else {
          return false;
        }
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

/* 添加租户对话框样式 */
.color-preview {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-left: 10px;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
}
</style> 