<template>
    <div class="breadcrumb">
    <span v-for="(item, index) in $route.matched" :key="index">
      {{item.meta.breadcrumb}}
      <span v-if="index < $route.matched.length - 1"> -> </span>
    </span>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb"
    }
</script>

<style lang="less" scoped>
    .breadcrumb {
        margin: 20px 0;
    }
</style>