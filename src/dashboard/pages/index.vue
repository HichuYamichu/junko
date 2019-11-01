<template>
  <v-row class="pa-5" align="center">
    <v-col cols="12" class="mb-5">
      <hero />
    </v-col>
    <v-col cols="12" class="mt-5">
      <features />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Hero from '@/components/Hero.vue';
// import Hero from '../components/Hero.vue';
import Features from '@/components/Features.vue';

import Vue from 'vue'
export default Vue.extend({
  components: {
    Hero,
    Features
  }
})
</script>
