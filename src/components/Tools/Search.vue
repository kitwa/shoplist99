<template>
  <v-text-field
    class="mt-1 expand-search"
    :value="$store.state.searchText"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    :disabled="$store.state.sorting"
    :class="{ closed: searchClosed && !$store.state.searchText }"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true,
      searchText: null,
    };
  },
};
</script>

<style lang="sass">
.expand-search
    transition: max-width 0.3s
    .v-input__slot
        cursor: pointer !important
        &:before, &:after
            border-color: transparent !important
    &.closed
        max-width: 45px
        .v-input__slot
            background: transparent !important
</style>