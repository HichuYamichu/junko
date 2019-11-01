<template>
  <div class="features">
    <v-row
      class="spacer"
      align="center"
      justify="center"
      v-for="(feature, index) in features"
      :key="index"
    >
      <v-col xl="4" xs="12" :order-xl="index % 2" order-xs="1">
        <h3 class="display-2 py-2">{{ feature.name }}</h3>
        <p>{{ feature.content }}</p>
      </v-col>
      <v-col xl="4" xs="12" order-xs="2">
        <v-img :src="feature.imgSrc" contain height="500"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      features: [
        {
          name: 'Tags',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempore, numquam, perferendis dolorem molestiae incidunt officiis eaque impedit voluptates ad, maiores culpa? Illum fugit ipsa harum, vitae et corrupti. Exercitationem?',
          imgSrc: '/tags.jpg'
        },
        {
          name: 'Logs',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempore, numquam, perferendis dolorem molestiae incidunt officiis eaque impedit voluptates ad, maiores culpa? Illum fugit ipsa harum, vitae et corrupti. Exercitationem?',
          imgSrc: '/logs.jpg'
        },
        {
          name: 'Settings',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempore, numquam, perferendis dolorem molestiae incidunt officiis eaque impedit voluptates ad, maiores culpa? Illum fugit ipsa harum, vitae et corrupti. Exercitationem?',
          imgSrc: '/customizable.jpg'
        }
      ]
    };
  }
});
</script>

<style scoped>
.features {
  margin-top: 5vh;
}

.spacer {
  margin-top: 20vh;
  margin-bottom: 20vh;
}
</style>