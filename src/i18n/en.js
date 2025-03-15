export default {
  menu: {
    home: 'Home',
    dashboard: 'Dashboard',
    tenant: 'Tenant Management',
    admin: 'Admin Panel',
    weather: 'Weather Forecast',
    news: 'News Headlines'
  },
  common: {
    dashboard: 'Data Dashboard',
    overview: 'View system key metrics and real-time data',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    all: 'All',
    realtime: 'Real-time'
  },
  // Home page
  home: {
    title: 'Vue 2 Base Project',
    subtitle: 'This is a simplified Vue 2 project, now using a left sidebar layout',
    dataOverview: 'Data Overview',
    dataOverviewDesc: 'View system data statistics and analysis',
    contentManagement: 'Content Management',
    contentManagementDesc: 'Manage website content and resources',
    userManagement: 'User Management',
    userManagementDesc: 'Manage user accounts and permissions',
    systemSettings: 'System Settings',
    systemSettingsDesc: 'Configure system parameters and options'
  },
  // Admin page
  admin: {
    title: 'Admin Panel',
    subtitle: 'Manage system functions and settings',
    userManagement: 'User Management',
    userManagementDesc: 'Manage system users and permission settings',
    contentManagement: 'Content Management',
    contentManagementDesc: 'Manage website content and resource files',
    systemSettings: 'System Settings',
    systemSettingsDesc: 'Configure system parameters and global options',
    dataStatistics: 'Data Statistics',
    dataStatisticsDesc: 'View system usage data and statistics',
    viewUsers: 'View Users',
    addUser: 'Add User',
    viewContent: 'View Content',
    addContent: 'Add Content',
    viewSettings: 'View Settings',
    resetSettings: 'Reset Settings',
    viewStatistics: 'View Statistics',
    exportReport: 'Export Report',
    users: 'users',
    items: 'items',
    options: 'options'
  },
  // Tenant page
  tenant: {
    title: 'Tenant Management',
    subtitle: 'Manage system tenants and their permission configurations',
    searchPlaceholder: 'Search tenants...',
    search: 'Search',
    addTenant: 'Add Tenant',
    tenantName: 'Tenant Name',
    createdTime: 'Created Time',
    status: 'Status',
    userCount: 'User Count',
    storageSpace: 'Storage Space',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    id: 'ID',
    statusActive: 'Active',
    statusPending: 'Pending',
    statusDisabled: 'Disabled'
  },
  stats: {
    totalUsers: 'Total Users',
    visits: 'Visits',
    contentCount: 'Content Count',
    systemAlerts: 'System Alerts',
    thisWeek: 'This Week'
  },
  charts: {
    visitTrends: 'Visit Trends',
    userDistribution: 'User Distribution',
    performanceMonitoring: 'Performance Monitoring',
    systemRating: 'System Rating',
    performanceAnalysis: 'Performance Analysis Scatter',
    userConversion: 'User Conversion Funnel',
    systemHealth: 'System Health',
    systemArchitecture: 'System Architecture',
    accessHeatmap: 'Access Heatmap',
    past7days: 'Past 7 Days',
    hours24: '24 Hours'
  },
  distribution: {
    region: 'Region',
    age: 'Age',
    device: 'Device',
    regionData: {
      east: 'East',
      north: 'North',
      south: 'South',
      other: 'Other'
    },
    ageData: {
      '18-24': '18-24 years',
      '25-34': '25-34 years',
      '35-44': '35-44 years',
      '45+': '45+ years'
    },
    deviceData: {
      mobile: 'Mobile',
      desktop: 'Desktop',
      other: 'Other'
    }
  },
  performance: {
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
    cpuUsage: 'CPU Usage',
    averageLoad: 'Average Load',
    memoryUsage: 'Memory Usage',
    swapSpace: 'Swap Space',
    diskRead: 'Disk Read',
    diskWrite: 'Disk Write'
  },
  radar: {
    performance: 'Performance',
    stability: 'Stability',
    security: 'Security',
    availability: 'Availability',
    responseSpeed: 'Response Speed',
    systemRating: 'System Rating'
  },
  funnel: {
    conversion: 'Conversion Rate',
    visit: 'Visit',
    register: 'Register',
    download: 'Download',
    activation: 'Activation',
    payment: 'Payment'
  },
  gauge: {
    systemHealth: 'System Health'
  },
  tree: {
    systemArchitecture: 'System Architecture',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    infrastructure: 'Infrastructure'
  },
  activity: {
    recentActivity: 'Recent Activity',
    newUserRegistration: 'New User Registration',
    userRegistered: 'User {name} completed registration',
    contentUpdate: 'Content Update',
    adminUpdated: 'Admin updated system announcement',
    systemMaintenance: 'System Maintenance',
    maintenanceCompleted: 'System completed routine maintenance',
    minutesAgo: '{time} minutes ago',
    hoursAgo: '{time} hours ago'
  },
  language: {
    chinese: 'Chinese',
    english: 'English',
    japanese: 'Japanese'
  },
  testComponent: {
    title: 'Test Component',
    description: 'This is a component for testing hot updates',
    currentTime: 'Current Time'
  },
  // Weather forecast page
  weather: {
    title: 'Weather Forecast',
    subtitle: 'View real-time weather information across the country',
    currentWeather: 'Current Weather',
    forecast: 'Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    windDirection: 'Wind Direction',
    precipitation: 'Precipitation',
    pressure: 'Pressure',
    visibility: 'Visibility',
    uvIndex: 'UV Index',
    airQuality: 'Air Quality',
    searchCity: 'Search city...',
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfterTomorrow: 'Day After Tomorrow',
    highTemp: 'High',
    lowTemp: 'Low',
    weatherCondition: {
      sunny: 'Sunny',
      cloudy: 'Cloudy',
      overcast: 'Overcast',
      rain: 'Rain',
      heavyRain: 'Heavy Rain',
      snow: 'Snow',
      fog: 'Fog',
      haze: 'Haze',
      thunderstorm: 'Thunderstorm'
    },
    airQualityLevel: {
      excellent: 'Excellent',
      good: 'Good',
      moderate: 'Moderate',
      poor: 'Poor',
      unhealthy: 'Unhealthy',
      hazardous: 'Hazardous'
    },
    refreshTime: 'Updated at',
    feelsLike: 'Feels Like',
    hourlyForecast: 'Hourly Forecast',
    weeklyForecast: 'Weekly Forecast',
    weatherAlert: 'Weather Alert',
    noAlert: 'No alerts at this time'
  },
  // News page
  news: {
    title: 'News Headlines',
    subtitle: 'View the latest news and current events',
    readMore: 'Read More',
    source: 'Source',
    date: 'Published Date',
    category: 'Category',
    loading: 'Loading news...',
    error: 'Failed to fetch news',
    retry: 'Retry',
    noNews: 'No news available'
  },
  // Element UI pagination component translations
  el: {
    pagination: {
      goto: 'Go to',
      pagesize: '/ page',
      total: 'Total {total}',
      pageClassifier: '',
      deprecationWarning: 'Deprecated usages detected, please refer to the el-pagination documentation for details'
    }
  }
} 