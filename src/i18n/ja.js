export default {
  menu: {
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    tenant: 'テナント管理',
    admin: '管理パネル',
    weather: '天気予報',
    news: 'ニュースヘッドライン'
  },
  common: {
    dashboard: 'データダッシュボード',
    overview: 'システムの主要指標とリアルタイムデータを表示',
    day: '日',
    week: '週',
    month: '月',
    all: 'すべて',
    realtime: 'リアルタイム'
  },
  // ホームページ
  home: {
    title: 'Vue 2 ベースプロジェクト',
    subtitle: 'これは簡素化されたVue 2プロジェクトで、左側のサイドバーレイアウトを使用しています',
    dataOverview: 'データ概要',
    dataOverviewDesc: 'システムデータの統計と分析を表示',
    contentManagement: 'コンテンツ管理',
    contentManagementDesc: 'ウェブサイトのコンテンツとリソースを管理',
    userManagement: 'ユーザー管理',
    userManagementDesc: 'ユーザーアカウントと権限を管理',
    systemSettings: 'システム設定',
    systemSettingsDesc: 'システムパラメータとオプションを設定'
  },
  // 管理ページ
  admin: {
    title: '管理パネル',
    subtitle: 'システム機能と設定を管理',
    userManagement: 'ユーザー管理',
    userManagementDesc: 'システムユーザーと権限設定を管理',
    contentManagement: 'コンテンツ管理',
    contentManagementDesc: 'ウェブサイトのコンテンツとリソースファイルを管理',
    systemSettings: 'システム設定',
    systemSettingsDesc: 'システムパラメータとグローバルオプションを設定',
    dataStatistics: 'データ統計',
    dataStatisticsDesc: 'システム使用データと統計情報を表示',
    viewUsers: 'ユーザーを表示',
    addUser: 'ユーザーを追加',
    viewContent: 'コンテンツを表示',
    addContent: 'コンテンツを追加',
    viewSettings: '設定を表示',
    resetSettings: '設定をリセット',
    viewStatistics: '統計を表示',
    exportReport: 'レポートをエクスポート',
    users: 'ユーザー',
    items: 'アイテム',
    options: 'オプション'
  },
  // テナントページ
  tenant: {
    title: 'テナント管理',
    subtitle: 'システムテナントとその権限設定を管理',
    searchPlaceholder: 'テナントを検索...',
    search: '検索',
    addTenant: 'テナントを追加',
    tenantName: 'テナント名',
    createdTime: '作成日時',
    status: 'ステータス',
    userCount: 'ユーザー数',
    storageSpace: 'ストレージ容量',
    actions: '操作',
    edit: '編集',
    delete: '削除',
    id: 'ID',
    statusActive: 'アクティブ',
    statusPending: '保留中',
    statusDisabled: '無効'
  },
  stats: {
    totalUsers: '総ユーザー数',
    visits: 'アクセス数',
    contentCount: 'コンテンツ数',
    systemAlerts: 'システムアラート',
    thisWeek: '今週'
  },
  charts: {
    visitTrends: 'アクセス傾向',
    userDistribution: 'ユーザー分布',
    performanceMonitoring: 'パフォーマンスモニタリング',
    systemRating: 'システム評価',
    performanceAnalysis: 'パフォーマンス分析散布図',
    userConversion: 'ユーザー変換ファネル',
    systemHealth: 'システム健全性',
    systemArchitecture: 'システムアーキテクチャ',
    accessHeatmap: 'アクセスヒートマップ',
    past7days: '過去7日間',
    hours24: '24時間'
  },
  distribution: {
    region: '地域',
    age: '年齢',
    device: 'デバイス',
    regionData: {
      east: '東部',
      north: '北部',
      south: '南部',
      other: 'その他'
    },
    ageData: {
      '18-24': '18-24歳',
      '25-34': '25-34歳',
      '35-44': '35-44歳',
      '45+': '45歳以上'
    },
    deviceData: {
      mobile: 'モバイル',
      desktop: 'デスクトップ',
      other: 'その他'
    }
  },
  performance: {
    cpu: 'CPU',
    memory: 'メモリ',
    disk: 'ディスク',
    cpuUsage: 'CPU使用率',
    averageLoad: '平均負荷',
    memoryUsage: 'メモリ使用率',
    swapSpace: 'スワップ領域',
    diskRead: 'ディスク読み取り',
    diskWrite: 'ディスク書き込み'
  },
  radar: {
    performance: 'パフォーマンス',
    stability: '安定性',
    security: 'セキュリティ',
    availability: '可用性',
    responseSpeed: '応答速度',
    systemRating: 'システム評価'
  },
  funnel: {
    conversion: '変換率',
    visit: '訪問',
    register: '登録',
    download: 'ダウンロード',
    activation: 'アクティベーション',
    payment: '支払い'
  },
  gauge: {
    systemHealth: 'システム健全性'
  },
  tree: {
    systemArchitecture: 'システムアーキテクチャ',
    frontend: 'フロントエンド',
    backend: 'バックエンド',
    database: 'データベース',
    infrastructure: 'インフラストラクチャ'
  },
  activity: {
    recentActivity: '最近のアクティビティ',
    newUserRegistration: '新規ユーザー登録',
    userRegistered: 'ユーザー {name} が登録を完了しました',
    contentUpdate: 'コンテンツ更新',
    adminUpdated: '管理者がシステムアナウンスを更新しました',
    systemMaintenance: 'システムメンテナンス',
    maintenanceCompleted: 'システムが定期メンテナンスを完了しました',
    minutesAgo: '{time}分前',
    hoursAgo: '{time}時間前'
  },
  language: {
    chinese: '中国語',
    english: '英語',
    japanese: '日本語'
  },
  testComponent: {
    title: 'テストコンポーネント',
    description: 'これはホットアップデートをテストするためのコンポーネントです',
    currentTime: '現在時刻'
  },
  // 天気予報ページ
  weather: {
    title: '天気予報',
    subtitle: '全国各地のリアルタイム天気情報を表示',
    currentWeather: '現在の天気',
    forecast: '予報',
    temperature: '気温',
    humidity: '湿度',
    windSpeed: '風速',
    windDirection: '風向',
    precipitation: '降水量',
    pressure: '気圧',
    visibility: '視程',
    uvIndex: 'UV指数',
    airQuality: '大気質',
    searchCity: '都市を検索...',
    today: '今日',
    tomorrow: '明日',
    dayAfterTomorrow: '明後日',
    highTemp: '最高気温',
    lowTemp: '最低気温',
    weatherCondition: {
      sunny: '晴れ',
      cloudy: '曇り',
      overcast: '曇天',
      rain: '雨',
      heavyRain: '大雨',
      snow: '雪',
      fog: '霧',
      haze: '靄',
      thunderstorm: '雷雨'
    },
    airQualityLevel: {
      excellent: '優良',
      good: '良好',
      moderate: '普通',
      poor: '不良',
      unhealthy: '健康に悪い',
      hazardous: '危険'
    },
    refreshTime: '更新時間',
    feelsLike: '体感温度',
    hourlyForecast: '時間別予報',
    weeklyForecast: '週間予報',
    weatherAlert: '気象警報',
    noAlert: '警報はありません'
  },
  // ニュースページ
  news: {
    title: 'ニュースヘッドライン',
    subtitle: '最新ニュースと時事情報を表示',
    readMore: '続きを読む',
    source: '出典',
    date: '公開日',
    category: 'カテゴリー',
    loading: 'ニュースを読み込み中...',
    error: 'ニュースの取得に失敗しました',
    retry: '再試行',
    noNews: 'ニュースはありません'
  },
  // Element UI ページネーションコンポーネントの翻訳
  el: {
    pagination: {
      goto: '移動',
      pagesize: '件/ページ',
      total: '全 {total} 件',
      pageClassifier: 'ページ',
      deprecationWarning: '非推奨の使用法が検出されました。el-paginationのドキュメントを参照してください'
    }
  }
} 