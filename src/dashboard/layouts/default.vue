<template>
  <v-app dark>
    <app-navbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    AppNavbar,
    AppFooter
  }
};
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}
.page-enter,
.page-leave-active {
  opacity: 0;
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>