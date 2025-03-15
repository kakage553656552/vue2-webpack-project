<template>
  <div class="news">
    <div class="news-header">
      <h1>新闻资讯</h1>
      <p>最新热点新闻</p>
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
      <div class="retry-container">
        <el-button type="primary" @click="fetchNews">重试</el-button>
      </div>
    </div>
    
    <div v-else-if="newsList.length === 0" class="empty-container">
      <el-empty description="暂无新闻"></el-empty>
    </div>
    
    <div v-else class="news-content">
      <el-card v-for="item in newsList" :key="item.uniquekey" class="news-card" shadow="hover">
        <div class="news-item">
          <div class="news-image" v-if="item.thumbnail_pic_s">
            <img :src="item.thumbnail_pic_s" :alt="item.title">
          </div>
          <div class="news-info">
            <h3 class="news-title">{{ item.title }}</h3>
            <div class="news-meta">
              <span class="news-source">{{ item.author_name }}</span>
              <span class="news-date">{{ formatDate(item.date) }}</span>
              <el-tag size="mini" type="info">{{ item.category }}</el-tag>
            </div>
            <p class="news-description" v-if="item.description">{{ item.description }}</p>
            <div class="news-actions">
              <el-button type="primary" size="small" @click="openNewsUrl(item.url)">
                阅读更多
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
      
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNews">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewsPage',
  data() {
    return {
      loading: false,
      error: null,
      newsList: [],
      currentPage: 1,
      pageSize: 10,
      totalNews: 0
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    async fetchNews() {
      this.loading = true;
      this.error = null;
      
      try {
        // 使用新的代理路径
        const response = await axios.get('/api/toutiao/toutiao/index', {
          params: {
            key: '065a387ea8c0d9a7757ffb2665754147',
            type: 'top',
            page: this.currentPage,
            page_size: this.pageSize,
            is_filter: ''
          }
        });
        
        const data = response.data;
        
        if (data.error_code === 0) {
          this.newsList = data.result.data;
          // 使用API返回的pageSize计算总数
          if (data.result.pageSize) {
            this.totalNews = parseInt(data.result.pageSize) * 30; // 假设有30页
          } else {
            this.totalNews = 300; // 默认值
          }
        } else {
          this.error = data.reason || '获取新闻数据失败';
          // 如果API请求失败，使用模拟数据
          this.useMockData();
        }
      } catch (error) {
        console.error('获取新闻数据出错:', error);
        this.error = '获取新闻数据出错，请稍后再试';
        
        // 使用模拟数据进行演示
        this.useMockData();
      } finally {
        this.loading = false;
      }
    },
    useMockData() {
      // 模拟数据，用于演示
      this.newsList = [
        {
          uniquekey: 'db61b977d9fabd0429c6d0c671aeb30e',
          title: '"新时代女性的自我关爱"主题沙龙暨双山街道福泰社区妇儿活动家园启动仪式举行',
          date: '2021-03-08 13:47:00',
          category: '头条',
          author_name: '鲁网',
          url: 'https://mini.eastday.com/mobile/210308134708834241845.html',
          thumbnail_pic_s: 'https://dfzximg02.dftoutiao.com/news/20210308/20210308134708_d0216565f1d6fe1abdfa03efb4f3e23c_0_mwpm_03201609.png',
          is_content: '1'
        },
        {
          uniquekey: '7d246cbfa9000fb5ac42fb3bb934a592',
          title: '滴滴发布女司机数据：2020年新增女性网约车司机超26万',
          date: '2021-03-08 13:40:00',
          category: '头条',
          author_name: '国青年网',
          url: 'https://mini.eastday.com/mobile/210308134023641877777.html',
          thumbnail_pic_s: 'https://dfzximg02.dftoutiao.com/news/20210308/20210308134023_7a9ca0543b00332147c42e1ee4146908_0_mwpm_03201609.png',
          is_content: '1'
        },
        {
          uniquekey: 'c0611bea6eb961a57b21a0d1008bbe2e',
          title: '点赞！东海县公安局学雷锋见行动',
          date: '2021-03-08 13:38:00',
          category: '头条',
          author_name: '江南时报',
          url: 'https://mini.eastday.com/mobile/210308133849892734209.html',
          thumbnail_pic_s: 'https://dfzximg02.dftoutiao.com/news/20210308/20210308133849_b9f3d069a1ab400bf2d87fcc15793ca5_1_mwpm_03201609.png',
          is_content: '1'
        }
      ];
      this.totalNews = 30; // 模拟总数
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchNews();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchNews();
    },
    openNewsUrl(url) {
      window.open(url, '_blank');
    }
  },
  mounted() {
    this.fetchNews();
  }
}
</script>

<style scoped>
.news {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.news-header {
  margin-bottom: 30px;
}

.news-header h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 10px;
}

.news-header p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.loading-container, .error-container, .empty-container {
  margin: 20px 0;
}

.retry-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.news-content {
  flex: 1;
}

.news-card {
  margin-bottom: 20px;
}

.news-item {
  display: flex;
}

.news-image {
  width: 180px;
  height: 120px;
  margin-right: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 18px;
}

.news-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #909399;
}

.news-source {
  margin-right: 15px;
}

.news-date {
  margin-right: 15px;
}

.news-description {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.news-actions {
  margin-top: auto;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style> 