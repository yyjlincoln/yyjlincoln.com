<template>
  <div id="app">
    <OutdatedBanner />
    <alert></alert>
    <router-view></router-view>
  </div>
</template>

<script>
import OutdatedBanner from "@/components/OutdatedBanner.vue";

export default {
  name: "App",
  components: {
    OutdatedBanner,
  },
  watch: {
    $route: function (to, from) {
      from;
      document.title = to.meta.title
        ? to.meta.title
        : "Lincoln Yan - @yyjlincoln";
      this.$func.processPath(to.path);
    },
  },
  mounted() {
    document.title = this.$route.meta.title
      ? this.$route.meta.title
      : "Lincoln Yan - @yyjlincoln";

    window.app = this; // for the commonjs module
    this.$func.processPath(this.$route.path);
  },
};
</script>

<style>
html {
  font-family: "Inter", sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  padding: 0;
  margin: 0;
}
body {
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}

#app {
  font-family: "Inter", sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}

.slide-left-leave-active,
.slide-right-leave-active {
  display: none;
}

.slide-left-enter-active,
.slide-right-enter-active {
  /* position: absolute; */
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-right-leave-active,
.slide-left-enter {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
.pagebreak-prevent {
  page-break-inside: avoid;
}
</style>
