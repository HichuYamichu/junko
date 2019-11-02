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

<script>
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default {
  components: {
    Hero,
    Features
  }
};
</script>

