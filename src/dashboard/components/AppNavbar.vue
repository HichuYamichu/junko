<template>
  <div>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mdAndDown && isHydrated"
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-title v-text="'Home'"></v-list-item-title>
        </v-list-item>
        <v-list-item to="/commands">
          <v-list-item-title v-text="'Commands'"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="black">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown && isHydrated"
        class="white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-avatar @click="$router.push('/')" :style="{ cursor: 'pointer'}">
        <img src="/avatar.webp" alt="avatar" />
      </v-avatar>
      <v-toolbar-title class="mx-3 white--text" color="white">JUNKO</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="white--text" large depressed to="/" active-class="active" color="black">home</v-btn>
        <v-btn
          class="white--text"
          large
          depressed
          to="/commands"
          active-class="active"
          color="black"
        >commands</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    isHydrated: false
  }),
  mounted() {
    this.isHydrated = true;
  }
};
</script>

<style scoped>
.disable {
  color: #f271cd !important;
}

.disable::before {
  background-color: unset !important;
}

.active {
  color: #f271cd !important;
}

.active::before {
  background-color: unset !important;
}
</style>