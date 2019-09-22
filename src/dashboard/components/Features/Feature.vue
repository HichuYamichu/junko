<template>
  <v-row align="center" justify="center">
    <v-col xl="4" xs="12" :order-xl="$vnode.key % 2" order-xs="1">
      <h3 class="display-2 py-2">{{ name }}</h3>
      <p>{{ content }}</p>
    </v-col>
    <v-col xl="4" xs="12" order-xs="2">
      <v-img :src="imgSrc" contain height="500"></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: String,
    content: String,
    imgSrc: String
  }
};
</script>