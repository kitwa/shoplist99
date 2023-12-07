<template>
  <v-btn @click="$store.commit('toggleSorting')" color="primary" class="btnStyle">
      Done Sorting
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass">
    .btnStyle
        position: fixed
        bottom: 20px
        left: 50%
        transform: translateX(-50%)
</style>