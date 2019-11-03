<template>
  <v-card flat v-if="!$apollo.loading">
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
      >{{ example }}</code>
    </p>
  </v-card>
</template>

<script>
import gql from 'graphql-tag';

export default {
  props: {
    name: String
  },
  apollo: {
    description: {
      query: gql`
        query Command($name: String!) {
          command: Command(Name: $name) {
            description {
              content
              usage
              examples
            }
          }
        }
      `,
      variables() {
        return { name: this.name };
      },
      update: data => data.command.description
    }
  }
};
</script>