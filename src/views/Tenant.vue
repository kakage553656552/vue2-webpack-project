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
          class="search-input">
        </el-input>
        <el-button type="primary" icon="el-icon-plus">{{ $t('tenant.addTenant') }}</el-button>
      </div>
    </div>
    
    <el-card shadow="hover" class="tenant-table-card">
      <el-table
        :data="tenants"
        style="width: 100%"
        border>
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TenantPage',
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      totalTenants: 100,
      tenants: [
        {
          id: 'TN-001',
          name: '华东科技有限公司',
          createdAt: '2023-05-15',
          status: 'active',
          users: 128,
          storage: '1.2 TB',
          color: '#42b983'
        },
        {
          id: 'TN-002',
          name: '北方工业集团',
          createdAt: '2023-06-22',
          status: 'active',
          users: 85,
          storage: '820 GB',
          color: '#2c3e50'
        },
        {
          id: 'TN-003',
          name: '南方数据科技',
          createdAt: '2023-07-10',
          status: 'pending',
          users: 42,
          storage: '450 GB',
          color: '#f39c12'
        },
        {
          id: 'TN-004',
          name: '西部资源公司',
          createdAt: '2023-08-05',
          status: 'disabled',
          users: 16,
          storage: '120 GB',
          color: '#e74c3c'
        },
        {
          id: 'TN-005',
          name: '中央数据中心',
          createdAt: '2023-09-18',
          status: 'active',
          users: 210,
          storage: '2.5 TB',
          color: '#3498db'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    editTenant(tenant) {
      console.log('编辑租户:', tenant);
      // 这里添加编辑租户的逻辑
    },
    deleteTenant(tenant) {
      console.log('删除租户:', tenant);
      // 这里添加删除租户的逻辑
    }
  }
}
</script>

<style scoped>
.tenant {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.tenant-header {
  margin-bottom: 30px;
}

.tenant-header h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 10px;
}

.tenant-header p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.tenant-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.search-input {
  width: 300px;
}

.tenant-table-card {
  margin-bottom: 20px;
}

.tenant-name {
  display: flex;
  align-items: center;
  gap: 12px;
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style> 