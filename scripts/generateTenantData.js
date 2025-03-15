const fs = require('fs');
const path = require('path');

// 城市列表
const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '武汉', '西安', 
                '天津', '苏州', '郑州', '长沙', '青岛', '宁波', '厦门', '福州', '大连', '沈阳'];

// 姓氏列表
const lastNames = ['张', '王', '李', '赵', '陈', '刘', '杨', '黄', '周', '吴', 
                  '郑', '孙', '马', '朱', '胡', '林', '郭', '何', '高', '罗'];

// 公司类型
const companyTypes = ['科技有限公司', '网络科技有限公司', '信息技术有限公司', '电子商务有限公司', 
                     '贸易有限公司', '咨询有限公司', '服务有限公司', '文化传媒有限公司', 
                     '软件开发有限公司', '教育科技有限公司'];

// 状态列表
const statuses = ['active', 'pending', 'disabled'];

// 颜色列表
const colors = ['#42b983', '#2c3e50', '#f39c12', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c', '#f1c40f', '#e67e22', '#16a085'];

// 生成随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机日期
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// 格式化日期为YYYY-MM-DD格式
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 生成随机存储空间
function generateStorage() {
  const size = getRandomInt(50, 5000);
  if (size >= 1000) {
    return `${(size / 1000).toFixed(1)} TB`;
  } else {
    return `${size} GB`;
  }
}

// 生成租户数据
function generateTenantData(count) {
  const tenants = [];
  
  for (let i = 1; i <= count; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const tenant = {
      id: `TN-${String(i).padStart(3, '0')}`,
      name: city + lastName + companyType,
      createdAt: formatDate(getRandomDate(new Date(2022, 0, 1), new Date())),
      status: status,
      users: getRandomInt(10, 300),
      storage: generateStorage(),
      color: color
    };
    
    tenants.push(tenant);
  }
  
  return tenants;
}

// 生成1000条租户数据
const tenantData = generateTenantData(1000);

// 确保目录存在
const dataDir = path.join(__dirname, '../src/assets/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 写入JSON文件
fs.writeFileSync(
  path.join(dataDir, 'tenants.json'),
  JSON.stringify(tenantData, null, 2),
  'utf8'
);

console.log('成功生成1000条租户数据，保存到 src/assets/data/tenants.json'); 