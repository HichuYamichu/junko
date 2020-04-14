<template>
  <v-card flat>
    <p>Description: {{ content }}</p>
    <p>
      Usage:
      <code>{{ usage }}</code>
    </p>
    <p>
      Examples:
      <code class="mx-1" v-for="(example, index) in examples" :key="index">{{ example }}</code>
    </p>
  </v-card>
</template>

<script>
export default {
  props: {
    content: String,
    usage: String,
    examples: Array
  }
};
</script>
