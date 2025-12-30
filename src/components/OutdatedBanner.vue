<template>
  <div v-if="visible" class="outdated-banner">
    <div class="banner-content">
      <span class="banner-text">
        This website is outdated as of 2023 and will not be updated. Check
        <a
          href="https://www.linkedin.com/in/yyjlincoln/"
          target="_blank"
          rel="noopener noreferrer"
          >LinkedIn</a
        >
        for the latest.
      </span>
      <button class="dismiss-btn" @click="dismiss" aria-label="Dismiss banner">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "outdated-banner-dismissed";

export default {
  name: "OutdatedBanner",
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.visible = sessionStorage.getItem(STORAGE_KEY) !== "true";
  },
  methods: {
    dismiss() {
      this.visible = false;
      sessionStorage.setItem(STORAGE_KEY, "true");
    },
  },
};
</script>

<style scoped>
.outdated-banner {
  background-color: #fef3c7;
  border-top: 1px solid #f59e0b;
  padding: 12px 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2147483647;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.banner-text {
  color: #92400e;
  font-size: 14px;
  text-align: center;
}

.banner-text a {
  color: #b45309;
  font-weight: 600;
  text-decoration: underline;
}

.banner-text a:hover {
  color: #92400e;
}

.dismiss-btn {
  background: none;
  border: none;
  color: #92400e;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}

.dismiss-btn:hover {
  color: #78350f;
}
</style>
