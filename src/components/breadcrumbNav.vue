<template>
  <div class="header-middle-con">
    <div class="content">
      <Breadcrumb >
        <BreadcrumbItem
          v-for="(item,index) in currentRoute"
          :href="index==0?'/'+item.path:item.path"
          :key="item.index"
        >{{item.name}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbNav',
    props: {
      currentRoute: Array
    }
  };
</script>

<style scoped>
  .header-middle-con{
    position: absolute;
    left: 0;
    top: 0;
    right: 340px;
    bottom: 0;
    padding: 10px;
    overflow: hidden;
  }
  .content{
    padding: 8px 15px 0;
  }
</style>
