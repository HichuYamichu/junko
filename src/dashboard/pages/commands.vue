<template>
  <v-row class="pa-5" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="align-end fill-height display-1">Prefix</v-card-title>
        <v-card-text class="text--primary">
          <p>
            Default:
            <code>!</code> or
            <code>@mention</code>
          </p>
          <p>
            Example:
            <code>!help</code> or
            <code>@Junko help</code>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class="align-end fill-height display-1">Command help</v-card-title>
        <v-card-text class="text--primary">
          <p>
            <code>&lt;thing&gt;</code> - fill with appropriate content
          </p>
          <p>
            <code>&lt;thing1 | thing2&gt;</code> - multiple content types available
          </p>
          <p>
            <code>[thing]</code> - parameter is optional or has a default value
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-expansion-panels
        v-for="(category, index) in categories"
        :key="index"
        class="my-4"
      >
        <v-expansion-panel >
          <v-expansion-panel-header class="display-1 categoryName">{{ category.name }}</v-expansion-panel-header>
          <v-expansion-panel-content class="mt-3">
            <category :name="category.name" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import Category from '@/components/commands/Category';
import gql from 'graphql-tag';

export default {
  components: {
    Category
  },
  apollo: {
    categories: {
      query: gql`
        query {
          categories: Categories {
            name
          }
        }
      `
    }
  }
};
</script>

<style scoped>
.categoryName {
  text-transform: capitalize;
}
</style>