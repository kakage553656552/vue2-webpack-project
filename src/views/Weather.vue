<template>
  <div class="weather">
    <div class="weather-header">
      <h1>{{ $t('weather.title') }}</h1>
      <p>{{ $t('weather.subtitle') }}</p>
      
      <div class="search-container">
        <el-input
          :placeholder="$t('weather.searchCity')"
          prefix-icon="el-icon-search"
          v-model="searchQuery"
          class="search-input"
          @keyup.enter.native="searchWeather">
        </el-input>
        <el-button type="primary" @click="searchWeather" style="margin-left: 10px;">
          {{ $t('tenant.search') }}
        </el-button>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else-if="error" class="error-container">
      <el-alert
        :title="error"
        type="error"
        :closable="false"
        show-icon>
      </el-alert>
    </div>
    
    <div v-else>
      <div class="weather-content">
        <div class="weather-cards">
          <!-- 当前天气卡片 -->
          <el-card shadow="hover" class="current-weather-card">
            <div class="card-header">
              <h3>{{ $t('weather.currentWeather') }}</h3>
              <span class="refresh-time">{{ $t('weather.refreshTime') }}: {{ currentTime }}</span>
            </div>
            
            <div class="city-info">
              <h2>{{ currentWeather.city }}</h2>
              <div class="weather-icon">
                <i :class="getWeatherIcon(currentWeather.info)"></i>
              </div>
            </div>
            
            <div class="temperature-display">
              <div class="current-temp">{{ currentWeather.temperature }}°C</div>
              <div class="feels-like">{{ $t('weather.humidity') }}: {{ currentWeather.humidity }}%</div>
            </div>
            
            <div class="weather-condition">
              {{ currentWeather.info }}
            </div>
            
            <el-divider></el-divider>
            
            <div class="weather-details">
              <div class="detail-item">
                <i class="el-icon-wind-power"></i>
                <span>{{ $t('weather.windDirection') }}: {{ currentWeather.direct }}</span>
              </div>
              <div class="detail-item">
                <i class="el-icon-wind-power"></i>
                <span>{{ $t('weather.windSpeed') }}: {{ currentWeather.power }}</span>
              </div>
              <div class="detail-item" v-if="currentWeather.aqi">
                <i class="el-icon-cloudy"></i>
                <span>{{ $t('weather.airQuality') }}: {{ currentWeather.aqi }}</span>
              </div>
            </div>
            
            <div class="air-quality" v-if="currentWeather.aqi">
              <div class="air-quality-label">{{ $t('weather.airQuality') }}:</div>
              <el-tag :type="getAirQualityType(currentWeather.aqi)">
                {{ getAirQualityText(currentWeather.aqi) }}
              </el-tag>
            </div>
          </el-card>
          
          <!-- 未来天气预报卡片 -->
          <el-card shadow="hover" class="forecast-card">
            <div class="card-header">
              <h3>{{ $t('weather.forecast') }}</h3>
            </div>
            
            <div class="forecast-list">
              <div v-for="(day, index) in futureForecast" :key="index" class="forecast-item">
                <div class="forecast-date">{{ formatDate(day.date) }}</div>
                <div class="forecast-icon">
                  <i :class="getWeatherIconByWid(day.wid.day)"></i>
                </div>
                <div class="forecast-weather">{{ day.weather }}</div>
                <div class="forecast-temp">{{ day.temperature }}</div>
                <div class="forecast-wind">{{ day.direct }}</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 由于我们目前使用模拟数据，暂时注释掉axios导入
import axios from 'axios';

export default {
  name: 'WeatherPage',
  data() {
    return {
      searchQuery: '西安', // 默认城市
      currentTime: this.formatDateTime(new Date()),
      loading: false,
      error: null,
      currentWeather: {
        city: '',
        temperature: '',
        humidity: '',
        info: '',
        direct: '',
        power: '',
        aqi: ''
      },
      futureForecast: []
    }
  },
  methods: {
    formatDateTime(date) {
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return date.toLocaleString(this.$i18n.locale, options);
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr; // 如果解析失败，返回原始字符串
      }
      
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);
      
      // 检查是否是今天、明天或后天
      if (date.toDateString() === today.toDateString()) {
        return this.$t('weather.today');
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return this.$t('weather.tomorrow');
      } else if (date.toDateString() === dayAfterTomorrow.toDateString()) {
        return this.$t('weather.dayAfterTomorrow');
      } else {
        // 否则返回日期
        return date.toLocaleDateString(this.$i18n.locale, { month: 'short', day: 'numeric' });
      }
    },
    getWeatherIcon(condition) {
      const iconMap = {
        '晴': 'el-icon-sunny',
        '多云': 'el-icon-cloudy',
        '阴': 'el-icon-cloudy-and-sunny',
        '阵雨': 'el-icon-light-rain',
        '雷阵雨': 'el-icon-lightning',
        '雨': 'el-icon-light-rain',
        '小雨': 'el-icon-light-rain',
        '中雨': 'el-icon-light-rain',
        '大雨': 'el-icon-heavy-rain',
        '暴雨': 'el-icon-heavy-rain',
        '雪': 'el-icon-light-snow',
        '雾': 'el-icon-cloudy',
        '霾': 'el-icon-cloudy'
      };
      return iconMap[condition] || 'el-icon-cloudy';
    },
    getWeatherIconByWid(wid) {
      const widIconMap = {
        '00': 'el-icon-sunny', // 晴
        '01': 'el-icon-cloudy', // 多云
        '02': 'el-icon-cloudy-and-sunny', // 阴
        '03': 'el-icon-light-rain', // 阵雨
        '04': 'el-icon-lightning', // 雷阵雨
        '05': 'el-icon-light-rain', // 雨夹雪
        '06': 'el-icon-light-rain', // 小雨
        '07': 'el-icon-light-rain', // 中雨
        '08': 'el-icon-heavy-rain', // 大雨
        '09': 'el-icon-heavy-rain', // 暴雨
        '10': 'el-icon-light-snow', // 雪
        '11': 'el-icon-light-snow', // 小雪
        '12': 'el-icon-light-snow', // 中雪
        '13': 'el-icon-light-snow', // 大雪
        '14': 'el-icon-light-snow', // 暴雪
        '15': 'el-icon-cloudy', // 雾
        '16': 'el-icon-cloudy', // 霾
        '17': 'el-icon-cloudy', // 浮尘
        '18': 'el-icon-cloudy', // 扬沙
        '19': 'el-icon-cloudy', // 强沙尘暴
        '20': 'el-icon-cloudy', // 沙尘暴
        '21': 'el-icon-cloudy', // 特强沙尘暴
        '22': 'el-icon-cloudy', // 冻雾
        '23': 'el-icon-cloudy', // 霜冻
        '24': 'el-icon-cloudy', // 浓雾
        '25': 'el-icon-cloudy', // 大雾
        '26': 'el-icon-cloudy', // 特强浓雾
        '27': 'el-icon-cloudy', // 强浓雾
        '28': 'el-icon-cloudy', // 中度霾
        '29': 'el-icon-cloudy', // 重度霾
        '30': 'el-icon-cloudy', // 严重霾
        '31': 'el-icon-cloudy', // 中度霾
        '53': 'el-icon-cloudy' // 霾
      };
      return widIconMap[wid] || 'el-icon-cloudy';
    },
    getAirQualityType(aqi) {
      const aqiNum = parseInt(aqi);
      if (aqiNum <= 50) {
        return 'success'; // 优
      } else if (aqiNum <= 100) {
        return 'success'; // 良
      } else if (aqiNum <= 150) {
        return 'warning'; // 轻度污染
      } else if (aqiNum <= 200) {
        return 'warning'; // 中度污染
      } else if (aqiNum <= 300) {
        return 'danger'; // 重度污染
      } else {
        return 'danger'; // 严重污染
      }
    },
    getAirQualityText(aqi) {
      const aqiNum = parseInt(aqi);
      if (aqiNum <= 50) {
        return this.$t('weather.airQualityLevel.excellent'); // 优
      } else if (aqiNum <= 100) {
        return this.$t('weather.airQualityLevel.good'); // 良
      } else if (aqiNum <= 150) {
        return this.$t('weather.airQualityLevel.moderate'); // 轻度污染
      } else if (aqiNum <= 200) {
        return this.$t('weather.airQualityLevel.poor'); // 中度污染
      } else if (aqiNum <= 300) {
        return this.$t('weather.airQualityLevel.unhealthy'); // 重度污染
      } else {
        return this.$t('weather.airQualityLevel.hazardous'); // 严重污染
      }
    },
    async fetchWeatherData(city) {
      this.loading = true;
      this.error = null;
      
      try {
        // 使用新的代理路径
        const response = await axios.get('/api/weather/simpleWeather/query', {
          params: {
            key: '20a20fb33bb775f339fb8ced0717d520',
            city: city
          }
        });
        
        const data = response.data;
        
        if (data.error_code === 0) {
          // 更新当前天气
          this.currentWeather = {
            city: data.result.city,
            temperature: data.result.realtime.temperature,
            humidity: data.result.realtime.humidity,
            info: data.result.realtime.info,
            direct: data.result.realtime.direct,
            power: data.result.realtime.power,
            aqi: data.result.realtime.aqi
          };
          
          // 更新未来天气预报
          this.futureForecast = data.result.future;
          
          // 更新时间
          this.currentTime = this.formatDateTime(new Date());
        } else {
          this.error = data.reason || '获取天气数据失败';
        }
      } catch (error) {
        console.error('获取天气数据出错:', error);
        this.error = '获取天气数据出错，请稍后再试';
      } finally {
        this.loading = false;
      }
    },
    searchWeather() {
      if (this.searchQuery.trim()) {
        this.fetchWeatherData(this.searchQuery.trim());
      }
    }
  },
  mounted() {
    // 初始加载默认城市的天气
    this.fetchWeatherData(this.searchQuery);
    
    // 每分钟更新一次时间
    setInterval(() => {
      this.currentTime = this.formatDateTime(new Date());
    }, 60000);
  }
}
</script>

<style scoped>
.weather {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.weather-header {
  margin-bottom: 30px;
}

.weather-header h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 10px;
}

.weather-header p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.search-container {
  max-width: 400px;
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
}

.loading-container, .error-container {
  margin: 20px 0;
}

.weather-content {
  margin-bottom: 20px;
}

.weather-cards {
  display: flex;
  gap: 20px;
}

.current-weather-card {
  width: 400px;
  margin-bottom: 20px;
}

.forecast-card {
  flex: 1;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
}

.refresh-time {
  font-size: 12px;
  color: #999;
}

.city-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.city-info h2 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
}

.weather-icon {
  font-size: 40px;
  color: #409EFF;
}

.temperature-display {
  margin-bottom: 15px;
}

.current-temp {
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
}

.feels-like {
  font-size: 14px;
  color: #666;
}

.weather-condition {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item i {
  margin-right: 8px;
  color: #409EFF;
}

.air-quality {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.air-quality-label {
  margin-right: 10px;
}

.forecast-list {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}

.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  padding: 15px 10px;
  border-right: 1px solid #eee;
}

.forecast-item:last-child {
  border-right: none;
}

.forecast-date {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.forecast-icon {
  font-size: 30px;
  color: #409EFF;
  margin-bottom: 10px;
}

.forecast-weather {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.forecast-temp {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.forecast-wind {
  font-size: 12px;
  color: #999;
}
</style> 