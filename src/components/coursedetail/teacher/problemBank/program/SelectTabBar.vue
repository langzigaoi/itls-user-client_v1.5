<template>
  <div class="select-bar">
    <slot name="select-condition1"></slot>
    <slot name="select-condition2"></slot>
    <slot name="select-btn"></slot>
  </div>
</template>

<script>
export default {
  name: 'SelectTabBar',
};
</script>

<style>
  .select-bar {
    margin-right: 0;
  }

</style>