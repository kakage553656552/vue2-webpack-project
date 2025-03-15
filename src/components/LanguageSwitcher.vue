<template>
  <div class="language-switcher">
    <div class="language-dropdown">
      <button class="language-btn" @click="toggleDropdown">
        {{ currentLanguageLabel }} <span class="arrow">▼</span>
      </button>
      <div class="language-options" v-if="showDropdown">
        <div 
          v-for="lang in languages" 
          :key="lang.code" 
          class="language-option" 
          :class="{ active: currentLang === lang.code }"
          @click="changeLanguage(lang.code)"
        >
          {{ lang.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      showDropdown: false,
      languages: [
        { code: 'zh', label: '中文' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' }
      ]
    }
  },
  computed: {
    currentLang() {
      return this.$i18n.locale
    },
    currentLanguageLabel() {
      const lang = this.languages.find(lang => lang.code === this.currentLang)
      return lang ? lang.label : this.languages[0].label
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    changeLanguage(langCode) {
      this.$i18n.locale = langCode
      localStorage.setItem('language', langCode)
      this.showDropdown = false
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 1010;
}

.language-dropdown {
  position: relative;
}

.language-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100px;
  transition: all 0.2s;
}

.language-btn:hover {
  background-color: #e8e8e8;
}

.language-btn .arrow {
  margin-left: 8px;
  font-size: 10px;
}

.language-options {
  position: absolute;
  top: 100%;
  right: 0;
  width: 120px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.language-option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.language-option:hover {
  background-color: #f5f5f5;
}

.language-option.active {
  background-color: #e8f5e9;
  color: #42b983;
  font-weight: bold;
}
</style> 