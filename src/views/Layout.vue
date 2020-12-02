<template>
  <div>
      <HeadNav />
      <div class="container-view">
          <router-view />
      </div>
      
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav"
export default {
    name:"Layout",
    components:{
        HeadNav,
    }
}
</script>

<style scoped>
.container-view{
  width: 1400px;
  margin: 0 auto;
}
</style>