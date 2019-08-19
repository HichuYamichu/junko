<template>
  <v-card>
    <v-app-bar flat color="secondary">
      <v-toolbar-title class="font-weight-medium display-1">Logs</v-toolbar-title>
    </v-app-bar>
    <v-card-text>
      <v-tabs>
        <v-tab>Bot</v-tab>
        <v-tab>API</v-tab>
        <v-tab-item class="scroll-target">
          <log-area source="bot-logs" key="bot-logs" />
        </v-tab-item>
        <v-tab-item>
          <log-area source="api-logs" key="api-logs" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from "graphql-tag";
import LogArea from '@/components/LogArea'

export default {
  components: {
LogArea
  }
};
</script>