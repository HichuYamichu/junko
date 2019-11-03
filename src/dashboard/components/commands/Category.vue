<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="(command, index) in commands" :key="index">
      <v-expansion-panel-header class="title">{{ command.name }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <command :name="command.name" />        
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Command from './Command';
import gql from 'graphql-tag';

export default {
  components: {
    Command
  },
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
        return { name: this.name };
      },
      update: data => data.categories.commands
    }
  }
};
</script>