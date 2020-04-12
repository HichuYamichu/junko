<template>
  <v-row class="pa-5" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="align-end fill-height display-1"
          >Prefix</v-card-title
        >
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
        <v-card-title class="align-end fill-height display-1"
          >Command help</v-card-title
        >
        <v-card-text class="text--primary">
          <p><code>&lt;thing&gt;</code> - fill with appropriate content</p>
          <p>
            <code>&lt;thing1 | thing2&gt;</code> - multiple content types
            available
          </p>
          <p>
            <code>[thing]</code> - parameter is optional or has a default value
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" class="my-5">
      <h1 class="display-2" align="center">Commands</h1>
    </v-col>
    <v-col cols="12">
      <v-expansion-panels v-for="(category, index) in categories" :key="index">
        <v-expansion-panel>
          <v-expansion-panel-header class="display-1 capital">{{
            category.name
          }}</v-expansion-panel-header>
          <v-expansion-panel-content class="mt-3">
            <v-card
              v-for="(command, index) in category.commands"
              :key="index"
              outlined
              class="pa-3 my-4"
            >
              <span class="title capital">{{ command.name }}</span>
              <command :name="command.name" />
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import Command from '@/components/Command';

export default {
  components: {
    Command,
  },

  async asyncData(context) {
    const res = fetch('/api/commands');
    console.log(res);
    return { categories: [] };
  },
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>
