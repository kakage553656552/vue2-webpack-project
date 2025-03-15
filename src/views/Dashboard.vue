<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>{{ $t('common.dashboard') }}</h1>
      <p>{{ $t('common.overview') }}</p>
    </div>
    
    <div class="stats-overview">
      <el-card shadow="hover" class="stat-card" v-for="(stat, index) in statsData" :key="index">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <h3>{{ stat.title }}</h3>
          <div class="stat-value">{{ stat.value }}</div>
          <div :class="['stat-change', stat.change > 0 ? 'positive' : 'negative']">
            {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}{{ stat.unit }} 
            <span>{{ $t('stats.thisWeek') }}</span>
          </div>
        </div>
      </el-card>
    </div>
    
    <div class="chart-section">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.visitTrends') }}</h2>
          <div class="chart-actions">
            <el-radio-group v-model="visitPeriod" size="small">
              <el-radio-button label="day">{{ $t('common.day') }}</el-radio-button>
              <el-radio-button label="week">{{ $t('common.week') }}</el-radio-button>
              <el-radio-button label="month">{{ $t('common.month') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <v-chart class="chart" :option="visitChartOption" autoresize />
      </el-card>
      
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.userDistribution') }}</h2>
          <div class="chart-actions">
            <el-radio-group v-model="userDistType" size="small">
              <el-radio-button label="region">{{ $t('distribution.region') }}</el-radio-button>
              <el-radio-button label="age">{{ $t('distribution.age') }}</el-radio-button>
              <el-radio-button label="device">{{ $t('distribution.device') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <v-chart class="chart" :option="userDistChartOption" autoresize />
      </el-card>
    </div>
    
    <div class="chart-section">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.performanceMonitoring') }}</h2>
          <div class="chart-actions">
            <el-radio-group v-model="performanceType" size="small">
              <el-radio-button label="cpu">{{ $t('performance.cpu') }}</el-radio-button>
              <el-radio-button label="memory">{{ $t('performance.memory') }}</el-radio-button>
              <el-radio-button label="disk">{{ $t('performance.disk') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <v-chart class="chart" :option="performanceChartOption" autoresize />
      </el-card>
      
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.systemRating') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('radar.systemRating') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="radarChartOption" autoresize />
      </el-card>
    </div>
    
    <div class="chart-section">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.performanceAnalysis') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('charts.hours24') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="scatterChartOption" autoresize />
      </el-card>
      
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.userConversion') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('common.all') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="funnelChartOption" autoresize />
      </el-card>
    </div>
    
    <div class="chart-section">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.systemHealth') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('common.realtime') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="gaugeChartOption" autoresize />
      </el-card>
      
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.systemArchitecture') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('tree.systemArchitecture') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="treeChartOption" autoresize />
      </el-card>
    </div>
    
    <div class="chart-section-full">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.accessHeatmap') }}</h2>
          <div class="chart-actions">
            <el-button size="small" type="primary" plain>{{ $t('charts.past7days') }}</el-button>
          </div>
        </div>
        <v-chart class="chart" :option="heatmapChartOption" autoresize />
      </el-card>
    </div>
    
    <div class="activity-section">
      <el-card shadow="hover" class="recent-activity">
        <div slot="header">
          <h2>{{ $t('activity.recentActivity') }}</h2>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :timestamp="activity.time">
            <h3>{{ activity.title }}</h3>
            <p>{{ activity.desc }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
    
    <div class="chart-section-full">
      <el-card shadow="hover" class="chart-container">
        <div slot="header" class="chart-header">
          <h2>{{ $t('charts.salesAnalysis') }}</h2>
          <div class="chart-actions">
            <el-select v-model="salesAnalysisType" size="small" style="width: 120px;">
              <el-option v-for="item in salesAnalysisOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <v-chart class="chart" :option="salesAnalysisOption" autoresize />
      </el-card>
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  RadarChart,
  HeatmapChart,
  ScatterChart,
  FunnelChart,
  GaugeChart,
  TreeChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  HeatmapChart,
  ScatterChart,
  FunnelChart,
  GaugeChart,
  TreeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent
])

export default {
  name: 'DashboardPage',
  components: {
    VChart
  },
  data() {
    return {
      visitPeriod: 'day',
      userDistType: 'region',
      performanceType: 'cpu',
      // 统计卡片数据
      statsData: [
        {
          icon: '👥',
          title: this.$t('stats.totalUsers'),
          value: '1,254',
          change: 12,
          unit: '%'
        },
        {
          icon: '📊',
          title: this.$t('stats.visits'),
          value: '8,546',
          change: 23,
          unit: '%'
        },
        {
          icon: '📝',
          title: this.$t('stats.contentCount'),
          value: '342',
          change: 5,
          unit: '%'
        },
        {
          icon: '⚠️',
          title: this.$t('stats.systemAlerts'),
          value: '3',
          change: 2,
          unit: ''
        }
      ],
      // 活动列表数据
      activities: [
        {
          icon: 'el-icon-user',
          type: 'primary',
          color: '#409EFF',
          title: this.$t('activity.newUserRegistration'),
          desc: this.$t('activity.userRegistered', { name: 'zhang_wei' }),
          time: this.$t('activity.minutesAgo', { time: 10 })
        },
        {
          icon: 'el-icon-document',
          type: 'success',
          color: '#67C23A',
          title: this.$t('activity.contentUpdate'),
          desc: this.$t('activity.adminUpdated'),
          time: this.$t('activity.hoursAgo', { time: 1 })
        },
        {
          icon: 'el-icon-setting',
          type: 'warning',
          color: '#E6A23C',
          title: this.$t('activity.systemMaintenance'),
          desc: this.$t('activity.maintenanceCompleted'),
          time: this.$t('activity.hoursAgo', { time: 3 })
        }
      ],
      visitData: {
        day: {
          xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series: [30, 50, 70, 60, 80, 90, 75]
        },
        week: {
          xAxis: ['第1周', '第2周', '第3周', '第4周'],
          series: [320, 450, 520, 610]
        },
        month: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
          series: [820, 932, 901, 934, 1290, 1330]
        }
      },
      userDistData: {
        region: [
          { value: 45, name: '华东' },
          { value: 30, name: '华北' },
          { value: 15, name: '华南' },
          { value: 10, name: '其他' }
        ],
        age: [
          { value: 25, name: '18-24岁' },
          { value: 40, name: '25-34岁' },
          { value: 20, name: '35-44岁' },
          { value: 15, name: '45岁以上' }
        ],
        device: [
          { value: 65, name: '移动端' },
          { value: 30, name: '桌面端' },
          { value: 5, name: '其他' }
        ]
      },
      performanceData: {
        cpu: {
          xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          series: [
            {
              name: 'CPU使用率',
              data: [30, 25, 40, 70, 65, 80, 45]
            },
            {
              name: '平均负载',
              data: [20, 15, 30, 50, 55, 60, 35]
            }
          ]
        },
        memory: {
          xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          series: [
            {
              name: '内存使用率',
              data: [40, 45, 50, 60, 70, 65, 55]
            },
            {
              name: '交换空间',
              data: [5, 8, 10, 15, 20, 18, 12]
            }
          ]
        },
        disk: {
          xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          series: [
            {
              name: '磁盘读取',
              data: [25, 30, 45, 60, 70, 50, 35]
            },
            {
              name: '磁盘写入',
              data: [15, 20, 35, 50, 60, 40, 25]
            }
          ]
        }
      },
      radarData: [
        {
          value: [90, 85, 70, 95, 80],
          name: '系统评分'
        }
      ],
      radarIndicator: [
        { name: '性能', max: 100 },
        { name: '稳定性', max: 100 },
        { name: '安全性', max: 100 },
        { name: '可用性', max: 100 },
        { name: '响应速度', max: 100 }
      ],
      heatmapData: [
        // 生成热力图数据
        ...this.generateHeatmapData()
      ],
      // 散点图数据
      scatterData: [
        // 生成散点图数据
        ...this.generateScatterData()
      ],
      // 漏斗图数据
      funnelData: [
        { value: 100, name: '访问' },
        { value: 80, name: '注册' },
        { value: 60, name: '下载' },
        { value: 40, name: '激活' },
        { value: 20, name: '付费' }
      ],
      // 仪表盘数据
      gaugeData: [
        {
          value: 72,
          name: '系统健康度',
          title: {
            show: true,
            offsetCenter: [0, '70%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '30%']
          }
        }
      ],
      // 树形图数据
      treeData: {
        name: '系统架构',
        children: [
          {
            name: '前端',
            value: 30,
            children: [
              { name: 'Vue', value: 15 },
              { name: 'React', value: 10 },
              { name: 'Angular', value: 5 }
            ]
          },
          {
            name: '后端',
            value: 40,
            children: [
              { name: 'Java', value: 20 },
              { name: 'Python', value: 15 },
              { name: 'Node.js', value: 5 }
            ]
          },
          {
            name: '数据库',
            value: 20,
            children: [
              { name: 'MySQL', value: 10 },
              { name: 'MongoDB', value: 5 },
              { name: 'Redis', value: 5 }
            ]
          },
          {
            name: '基础设施',
            value: 10,
            children: [
              { name: 'Docker', value: 5 },
              { name: 'Kubernetes', value: 5 }
            ]
          }
        ]
      },
      salesAnalysisType: '',
      salesAnalysisOptions: [
        { value: 'sales', label: '销售额分析' },
        { value: 'profit', label: '利润分析' },
        { value: 'customer', label: '客户分析' },
        { value: 'product', label: '产品分析' }
      ],
      salesAnalysisOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售额',
            type: 'bar',
            barWidth: '60%',
            data: [30, 50, 70, 60, 80, 90, 75],
            itemStyle: {
              color: '#42b983'
            }
          }
        ]
      }
    }
  },
  computed: {
    visitChartOption() {
      const currentData = this.visitData[this.visitPeriod]
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: currentData.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$t('stats.visits'),
            type: 'bar',
            barWidth: '60%',
            data: currentData.series,
            itemStyle: {
              color: '#42b983'
            }
          }
        ]
      }
    },
    userDistChartOption() {
      const currentData = this.userDistData[this.userDistType]
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          data: currentData.map(item => item.name)
        },
        series: [
          {
            name: this.userDistType === 'region' ? this.$t('distribution.region') : 
                  this.userDistType === 'age' ? this.$t('distribution.age') : this.$t('distribution.device'),
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: currentData,
            itemStyle: {
              color: function(params) {
                const colorList = ['#42b983', '#2c3e50', '#f39c12', '#e74c3c', '#3498db'];
                return colorList[params.dataIndex % colorList.length];
              }
            }
          }
        ]
      }
    },
    performanceChartOption() {
      const currentData = this.performanceData[this.performanceType]
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: currentData.series.map(item => this.$t(`performance.${item.name === 'CPU使用率' ? 'cpuUsage' : 
                                                        item.name === '平均负载' ? 'averageLoad' : 
                                                        item.name === '内存使用率' ? 'memoryUsage' : 
                                                        item.name === '交换空间' ? 'swapSpace' : 
                                                        item.name === '磁盘读取' ? 'diskRead' : 'diskWrite'}`)),
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: currentData.xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: currentData.series.map(item => ({
          name: this.$t(`performance.${item.name === 'CPU使用率' ? 'cpuUsage' : 
                                      item.name === '平均负载' ? 'averageLoad' : 
                                      item.name === '内存使用率' ? 'memoryUsage' : 
                                      item.name === '交换空间' ? 'swapSpace' : 
                                      item.name === '磁盘读取' ? 'diskRead' : 'diskWrite'}`),
          type: 'line',
          data: item.data,
          smooth: true,
          areaStyle: {
            opacity: 0.3
          }
        }))
      }
    },
    radarChartOption() {
      return {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            { name: this.$t('radar.performance'), max: 100 },
            { name: this.$t('radar.stability'), max: 100 },
            { name: this.$t('radar.security'), max: 100 },
            { name: this.$t('radar.availability'), max: 100 },
            { name: this.$t('radar.responseSpeed'), max: 100 }
          ],
          radius: '65%'
        },
        series: [
          {
            type: 'radar',
            data: this.radarData,
            areaStyle: {
              opacity: 0.3
            },
            lineStyle: {
              width: 2
            },
            itemStyle: {
              color: '#42b983'
            }
          }
        ]
      }
    },
    heatmapChartOption() {
      return {
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return '时间: ' + params.data[0] + ':00<br>日期: 星期' + params.data[1] + '<br>访问量: ' + params.data[2];
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          splitArea: {
            show: true
          },
          axisLabel: {
            formatter: '{value}:00'
          }
        },
        yAxis: {
          type: 'category',
          data: ['一', '二', '三', '四', '五', '六', '日'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          color: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db']
        },
        series: [
          {
            name: '访问热力图',
            type: 'heatmap',
            data: this.heatmapData,
            label: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    // 散点图配置
    scatterChartOption() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return `响应时间: ${params.data[0]}ms<br>用户数: ${params.data[1]}<br>时间点: ${params.data[2]}`;
          }
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '响应时间(ms)',
          nameLocation: 'end',
          nameGap: 15,
          nameTextStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          name: '用户数',
          nameLocation: 'end',
          nameGap: 15,
          nameTextStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        visualMap: {
          min: 0,
          max: 24,
          dimension: 2,
          orient: 'vertical',
          right: 0,
          top: 'center',
          text: ['24:00', '00:00'],
          calculable: true,
          inRange: {
            color: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c']
          }
        },
        series: [
          {
            name: '性能分析',
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[1]) * 3;
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[2] + ':00';
                },
                position: 'top'
              }
            },
            data: this.scatterData
          }
        ]
      }
    },
    // 漏斗图配置
    funnelChartOption() {
      return {
        title: {
          text: this.$t('charts.userConversion'),
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          data: this.funnelData.map(item => this.$t(`funnel.${item.name === '访问' ? 'visit' : 
                                                    item.name === '注册' ? 'register' : 
                                                    item.name === '下载' ? 'download' : 
                                                    item.name === '激活' ? 'activation' : 'payment'}`)),
          bottom: 0
        },
        series: [
          {
            name: this.$t('funnel.conversion'),
            type: 'funnel',
            left: '10%',
            top: 40,
            bottom: 40,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: this.funnelData.map(item => ({
              value: item.value,
              name: this.$t(`funnel.${item.name === '访问' ? 'visit' : 
                                      item.name === '注册' ? 'register' : 
                                      item.name === '下载' ? 'download' : 
                                      item.name === '激活' ? 'activation' : 'payment'}`)
            }))
          }
        ]
      }
    },
    // 仪表盘配置
    gaugeChartOption() {
      return {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '60%'],
            radius: '90%',
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.3, '#e74c3c'],
                  [0.7, '#f39c12'],
                  [1, '#42b983']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              color: '#666',
              fontSize: 12,
              distance: -60,
              formatter: function(value) {
                if (value === 0 || value === 50 || value === 100) {
                  return value + '%';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 14
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function(value) {
                return value + '%';
              },
              color: 'auto'
            },
            data: this.gaugeData
          }
        ]
      }
    },
    // 树形图配置
    treeChartOption() {
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [this.treeData],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '7%',
            symbolSize: 10,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 12
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
    }
  },
  methods: {
    generateHeatmapData() {
      const data = []
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
          // 生成0-100之间的随机数
          const value = Math.round(Math.random() * 100)
          // 数据格式: [小时, 星期几, 值]
          data.push([j, i, value])
        }
      }
      return data
    },
    generateScatterData() {
      const data = []
      // 生成24小时的数据点
      for (let i = 0; i < 24; i++) {
        // 响应时间范围：50-500ms
        const responseTime = Math.round(50 + Math.random() * 450)
        // 用户数范围：10-200
        const userCount = Math.round(10 + Math.random() * 190)
        // 数据格式: [响应时间, 用户数, 小时]
        data.push([responseTime, userCount, i])
      }
      return data
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 0 20px 20px 20px;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 10px;
}

.dashboard-header p {
  color: #666;
  font-size: 16px;
}

.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 32px;
  margin-right: 20px;
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: normal;
}

.stat-value {
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-change {
  font-size: 12px;
  font-weight: bold;
}

.stat-change span {
  font-weight: normal;
  color: #666;
}

.positive {
  color: #67C23A;
}

.negative {
  color: #F56C6C;
}

.chart-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  flex: 1;
  height: 400px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header h2 {
  color: #2c3e50;
  font-size: 18px;
  margin: 0;
}

.chart {
  height: 300px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.chart-section-full {
  margin-bottom: 20px;
}

.chart-section-full .chart-container {
  width: 100%;
  height: 400px;
}
</style> 