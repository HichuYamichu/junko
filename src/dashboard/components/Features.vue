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
        <v-img :src="feature.imgSrc" contain></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          name: 'Tags',
          content:
            'Save anything you want with simple to use and future rich tag system. Your tags can be edited or removed as you wish and checking for all avalible tags takes no time.',
          imgSrc: '/tags.jpg'
        },
        {
          name: 'Logs',
          content:
            'Get concise messages notifying you about joining/leaving members or keep track of message updates and deletes.',
          imgSrc: '/logs.jpg'
        },
        {
          name: 'Settings',
          content:
            'Of course you can set up everything as you like it. This not only allows you to set prefix and log channels but also choose predefined speech pattern for bot to use.',
          imgSrc: '/settings.jpg'
        }
      ]
    };
  }
};
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