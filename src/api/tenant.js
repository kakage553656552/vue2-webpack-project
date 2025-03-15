// 导入租户数据
import tenantsData from '@/assets/data/tenants.json';

/**
 * 获取租户列表
 * @param {Object} params - 请求参数
 * @param {number} params.page - 当前页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.query - 搜索关键词
 * @returns {Promise} - 返回Promise对象
 */
export function getTenants(params = {}) {
  return new Promise((resolve) => {
    // 模拟网络请求延迟
    setTimeout(() => {
      const { page = 1, pageSize = 10, query = '' } = params;
      
      // 根据搜索条件过滤数据
      let filteredData = tenantsData;
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredData = tenantsData.filter(tenant => 
          tenant.name.toLowerCase().includes(lowerQuery) || 
          tenant.id.toLowerCase().includes(lowerQuery)
        );
      }
      
      // 计算分页数据
      const total = filteredData.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const list = filteredData.slice(start, end);
      
      // 返回数据
      resolve({
        code: 200,
        message: '获取租户列表成功',
        data: {
          list,
          pagination: {
            total,
            current: page,
            pageSize
          }
        }
      });
    }, 500); // 模拟500ms网络延迟
  });
}

/**
 * 获取租户详情
 * @param {string} id - 租户ID
 * @returns {Promise} - 返回Promise对象
 */
export function getTenantDetail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tenant = tenantsData.find(item => item.id === id);
      
      if (tenant) {
        resolve({
          code: 200,
          message: '获取租户详情成功',
          data: tenant
        });
      } else {
        reject({
          code: 404,
          message: '租户不存在'
        });
      }
    }, 300);
  });
}

/**
 * 创建租户
 * @param {Object} data - 租户数据
 * @returns {Promise} - 返回Promise对象
 */
export function createTenant(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '创建租户成功',
        data: {
          id: `TN-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString().split('T')[0]
        }
      });
    }, 600);
  });
}

/**
 * 更新租户
 * @param {string} id - 租户ID
 * @param {Object} data - 更新数据
 * @returns {Promise} - 返回Promise对象
 */
export function updateTenant(id, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = tenantsData.findIndex(item => item.id === id);
      
      if (index !== -1) {
        resolve({
          code: 200,
          message: '更新租户成功',
          data: {
            ...tenantsData[index],
            ...data
          }
        });
      } else {
        reject({
          code: 404,
          message: '租户不存在'
        });
      }
    }, 500);
  });
}

/**
 * 删除租户
 * @param {string} id - 租户ID
 * @returns {Promise} - 返回Promise对象
 */
export function deleteTenant(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = tenantsData.findIndex(item => item.id === id);
      
      if (index !== -1) {
        resolve({
          code: 200,
          message: '删除租户成功'
        });
      } else {
        reject({
          code: 404,
          message: '租户不存在'
        });
      }
    }, 400);
  });
} 