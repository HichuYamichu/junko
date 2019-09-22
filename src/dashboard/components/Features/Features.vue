<template>
  <div class="features">
    <feature
      class="spacer"
      v-for="(feature, index) in features"
      :key="index"
      :name="feature.name"
      :content="feature.content"
      :imgSrc="feature.imgSrc"
    />
  </div>
</template>

<script>
import Feature from './Feature';
export default {
  components: {
    Feature
  },
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
          name: 'Customizable',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempore, numquam, perferendis dolorem molestiae incidunt officiis eaque impedit voluptates ad, maiores culpa? Illum fugit ipsa harum, vitae et corrupti. Exercitationem?',
          imgSrc: '/customizable.jpg'
        }
      ]
    };
  }
};
</script>

<style>
.features {
  margin-top: 5vh;
}

.spacer {
  margin-top: 20vh;
  margin-bottom: 20vh;
}
</style>