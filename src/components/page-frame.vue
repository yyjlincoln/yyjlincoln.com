<template>
  <div class="min-h-screen h-fit overflow-hidden" :class="reserve_nav_bar_space ? 'pt-14' : ''">
    <div
      v-if="vertical_center"
      class="relative w-full h-full flex flex-col justify-center min-h-screen"
    >
      <div
        :class="horizontal_spacing ? 'mx-auto text-center sm:text-left px-10 sm:px-0 sm:mx-10 md:mx-15 lg:mx-20' : ''"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-else-if="horizontal_center"
      class="flex flex-row mx-auto text-center justify-center"
    >
      <div
        :class="horizontal_spacing ? 'mx-auto text-center sm:text-left px-10 sm:px-0 sm:mx-10 md:mx-15 lg:mx-20' : ''"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-else-if="both_center"
      class="relative w-full h-full flex flex-col justify-center min-h-screen"
    >
      <div class="mx-auto">
        <div
          :class="horizontal_spacing ? 'mx-auto text-center sm:text-left px-10 sm:px-0 sm:mx-10 md:mx-15 lg:mx-20' : ''"
        >
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        :class="horizontal_spacing ? 'mx-auto text-center sm:text-left px-10 sm:px-0 sm:mx-10 md:mx-15 lg:mx-20' : ''"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vertical_center: {
      type: Boolean,
      default: false,
    },
    horizontal_center: {
      type: Boolean,
      default: false,
    },
    both_center: {
      type: Boolean,
      default: false,
    },
    reserve_nav_bar_space: {
      type: Boolean,
      default: true,
    },
    horizontal_spacing: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>