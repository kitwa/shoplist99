<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" 
    :mobile-breakpoint="768"
    app>
      <v-img
      class="pa-4 pt-7"
        lazy-src="https://picsum.photos/id/11/10/6"
        height="170"
        src="https://picsum.photos/id/11/500/300"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
          <v-avatar size="70" class="mb-2">
      <img
        src="logo.PNG"
        alt="ShopList"
      >
    </v-avatar>
    <div class="white--text text-subtitle-1 font-weight-bold">Shop List 99</div>
    <!-- <div class="white--text text-subtitle-2">Kitwa</div> -->
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      prominent
      :height="$route.path === '/' ? '230' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class=" header-container pa-0 pt-3">

        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <Search />
        </v-row>
        <v-row>
          <p class="ml-4 text-h5">
            {{ $store.state.appTitle }}
          </p>
        </v-row>
        <v-row>
          <LiveDateTime/>
        </v-row>

        <v-row v-if="$route.path === '/'">
              <NewTask />
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <Snackbar />
    </v-main>
  </v-app>
</template>


<script>
import Snackbar from "./components/shared/Snackbar.vue";
import LiveDateTime from './components/Tools/LiveDateTime.vue';
import Search from "./components/Tools/Search.vue";
import NewTask from "@/components/Todo/NewTask";

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Items", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-information-outline", to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch('getTasks')
  },
  components: {
    NewTask: NewTask,
    Snackbar: Snackbar,
    Search: Search,
    LiveDateTime: LiveDateTime
  },
};
</script>

<style lang="sass">
  .header-containe
      max-width: none !important 
</style>