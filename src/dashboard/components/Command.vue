<template>
  <v-card flat>
    <p>Description: {{ description.content }}</p>
    <p>
      Usage:
      <code>{{ description.usage }}</code>
    </p>
    <p>
      Examples:
      <code
        class="mx-1"
        v-for="(example, index) in description.examples"
        :key="index"
        >{{ example }}</code
      >
    </p>
  </v-card>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>
