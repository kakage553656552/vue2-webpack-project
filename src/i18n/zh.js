export default {
  menu: {
    home: '首页',
    dashboard: '数据仪表盘',
    tenant: '租户管理',
    admin: '管理后台',
    weather: '天气预报',
    news: '新闻头条'
  },
  common: {
    dashboard: '数据仪表盘',
    overview: '查看系统关键指标和实时数据',
    day: '日',
    week: '周',
    month: '月',
    all: '全部',
    realtime: '实时'
  },
  // Home页面
  home: {
    title: 'Vue 2 基础项目',
    subtitle: '这是一个简化后的Vue 2项目，现在使用左侧菜单栏布局',
    dataOverview: '数据概览',
    dataOverviewDesc: '查看系统数据统计和分析',
    contentManagement: '内容管理',
    contentManagementDesc: '管理网站内容和资源',
    userManagement: '用户管理',
    userManagementDesc: '管理用户账号和权限',
    systemSettings: '系统设置',
    systemSettingsDesc: '配置系统参数和选项'
  },
  // Admin页面
  admin: {
    title: '管理后台',
    subtitle: '管理系统的各项功能和设置',
    userManagement: '用户管理',
    userManagementDesc: '管理系统用户和权限设置',
    contentManagement: '内容管理',
    contentManagementDesc: '管理网站内容和资源文件',
    systemSettings: '系统设置',
    systemSettingsDesc: '配置系统参数和全局选项',
    dataStatistics: '数据统计',
    dataStatisticsDesc: '查看系统使用数据和统计信息',
    viewUsers: '查看用户',
    addUser: '添加用户',
    viewContent: '查看内容',
    addContent: '添加内容',
    viewSettings: '查看设置',
    resetSettings: '重置设置',
    viewStatistics: '查看统计',
    exportReport: '导出报表',
    users: '用户',
    items: '项目',
    options: '选项'
  },
  // Tenant页面
  tenant: {
    title: '租户管理',
    subtitle: '管理系统租户及其权限配置',
    searchPlaceholder: '搜索租户...',
    search: '搜索',
    addTenant: '添加租户',
    tenantName: '租户名称',
    createdTime: '创建时间',
    status: '状态',
    userCount: '用户数',
    storageSpace: '存储空间',
    actions: '操作',
    edit: '编辑',
    delete: '删除',
    id: 'ID',
    statusActive: '活跃',
    statusPending: '待审核',
    statusDisabled: '已禁用'
  },
  stats: {
    totalUsers: '用户总数',
    visits: '访问量',
    contentCount: '内容数量',
    systemAlerts: '系统告警',
    thisWeek: '本周'
  },
  charts: {
    visitTrends: '访问趋势',
    userDistribution: '用户分布',
    performanceMonitoring: '性能监控',
    systemRating: '系统评分',
    performanceAnalysis: '性能分析散点图',
    userConversion: '用户转化漏斗',
    systemHealth: '系统健康度',
    systemArchitecture: '系统架构',
    accessHeatmap: '访问热力图',
    past7days: '过去7天',
    hours24: '24小时'
  },
  distribution: {
    region: '地区',
    age: '年龄',
    device: '设备',
    regionData: {
      east: '华东',
      north: '华北',
      south: '华南',
      other: '其他'
    },
    ageData: {
      '18-24': '18-24岁',
      '25-34': '25-34岁',
      '35-44': '35-44岁',
      '45+': '45岁以上'
    },
    deviceData: {
      mobile: '移动端',
      desktop: '桌面端',
      other: '其他'
    }
  },
  performance: {
    cpu: 'CPU',
    memory: '内存',
    disk: '磁盘',
    cpuUsage: 'CPU使用率',
    averageLoad: '平均负载',
    memoryUsage: '内存使用率',
    swapSpace: '交换空间',
    diskRead: '磁盘读取',
    diskWrite: '磁盘写入'
  },
  radar: {
    performance: '性能',
    stability: '稳定性',
    security: '安全性',
    availability: '可用性',
    responseSpeed: '响应速度',
    systemRating: '系统评分'
  },
  funnel: {
    conversion: '转化率',
    visit: '访问',
    register: '注册',
    download: '下载',
    activation: '激活',
    payment: '付费'
  },
  gauge: {
    systemHealth: '系统健康度'
  },
  tree: {
    systemArchitecture: '系统架构',
    frontend: '前端',
    backend: '后端',
    database: '数据库',
    infrastructure: '基础设施'
  },
  activity: {
    recentActivity: '最近活动',
    newUserRegistration: '新用户注册',
    userRegistered: '用户 {name} 完成了注册',
    contentUpdate: '内容更新',
    adminUpdated: '管理员更新了系统公告',
    systemMaintenance: '系统维护',
    maintenanceCompleted: '系统完成了例行维护',
    minutesAgo: '{time}分钟前',
    hoursAgo: '{time}小时前'
  },
  language: {
    chinese: '中文',
    english: '英文',
    japanese: '日文'
  },
  testComponent: {
    title: '测试组件',
    description: '这是一个用于测试热更新的组件',
    currentTime: '当前时间'
  },
  // 天气预报页面
  weather: {
    title: '天气预报',
    subtitle: '查看全国各地实时天气信息',
    currentWeather: '当前天气',
    forecast: '未来预报',
    temperature: '温度',
    humidity: '湿度',
    windSpeed: '风速',
    windDirection: '风向',
    precipitation: '降水量',
    pressure: '气压',
    visibility: '能见度',
    uvIndex: '紫外线指数',
    airQuality: '空气质量',
    searchCity: '搜索城市...',
    today: '今天',
    tomorrow: '明天',
    dayAfterTomorrow: '后天',
    highTemp: '高温',
    lowTemp: '低温',
    weatherCondition: {
      sunny: '晴天',
      cloudy: '多云',
      overcast: '阴天',
      rain: '雨',
      heavyRain: '大雨',
      snow: '雪',
      fog: '雾',
      haze: '霾',
      thunderstorm: '雷暴'
    },
    airQualityLevel: {
      excellent: '优',
      good: '良',
      moderate: '中等',
      poor: '较差',
      unhealthy: '不健康',
      hazardous: '危险'
    },
    refreshTime: '更新时间',
    feelsLike: '体感温度',
    hourlyForecast: '小时预报',
    weeklyForecast: '一周预报',
    weatherAlert: '天气预警',
    noAlert: '暂无预警信息'
  },
  // News页面
  news: {
    title: '新闻头条',
    subtitle: '查看最新热点新闻和时事动态',
    readMore: '阅读全文',
    source: '来源',
    date: '发布日期',
    category: '分类',
    loading: '正在加载新闻...',
    error: '获取新闻失败',
    retry: '重试',
    noNews: '暂无新闻'
  },
  // Element UI 分页组件翻译
  el: {
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页',
      deprecationWarning: '你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档'
    }
  }
} 