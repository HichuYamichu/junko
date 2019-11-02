<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="(command, index) in commands" :key="index">
      <v-expansion-panel-header>{{ command.name }}</v-expansion-panel-header>
      <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: {
    name: String
  },
  apollo: {
    commands: {
      query: gql`
        query Category($name: String!) {
          categories: Category(Name: $name) {
            commands {
              name
            }
          }
        }
      `,
      variables() {
        return { name: this.name }
      },
      update: data => data.categories.commands
    }
  }
}
</script>