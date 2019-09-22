<template>
  <v-app-bar fixed app color="black">
    <v-avatar>
      <img
        src="https://cdn.discordapp.com/avatars/462219867467022347/121051502c98aa17cac238a92de6c78b.webp"
        alt="avatar"
      />
    </v-avatar>
    <v-toolbar-title class="mx-3 white--text" color="white">JUNKO DASHBOARD</v-toolbar-title>
    <v-toolbar-items>
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
      <v-spacer></v-spacer>
    <v-icon absolute right class="white--text" @click="switchTheme">mdi-brightness-3</v-icon>
  </v-app-bar>
</template>

<script scoped>
export default {
  methods: {
    switchTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
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