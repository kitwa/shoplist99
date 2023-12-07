<template>
  <div class="home">

    <ListTasks v-if="$store.state.tasks.length" />
    <NoTask v-else/>

    <ButtonDoneSorting v-if="$store.state.sorting"/>
  </div>
</template>

<script>

import ListTasks from "@/components/Todo/ListTasks";
import NoTask from "@/components/Todo/NoTask";
import ButtonDoneSorting from '../components/Todo/ButtonDoneSorting.vue';

export default {
  name: "Home",
  components: {

    ListTasks: ListTasks,
    NoTask: NoTask,
    ButtonDoneSorting: ButtonDoneSorting
  },
};
</script>

<style >

</style>
