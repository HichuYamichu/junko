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
      <v-card>
        <v-expansion-panels accordion>
          <v-expansion-panel v-for="(item,i) in 5" :key="i">
            <v-expansion-panel-header>Item</v-expansion-panel-header>
            <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

