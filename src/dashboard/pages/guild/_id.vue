<template>
  <v-card>
    <v-app-bar flat color="secondary">
      <v-toolbar-title class="font-weight-medium display-1">Guild name: {{ guild.name || 'N/A'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="fetchGuild">
        <v-icon>fetch</v-icon>
      </v-btn>
    </v-app-bar>
    <v-expansion-panels multiple class="accent">
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Info</v-expansion-panel-header>
        <v-expansion-panel-content>
          <guild-info></guild-info>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Channels</v-expansion-panel-header>
        <v-expansion-panel-content>
          <guild-channels></guild-channels>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Members</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Tags</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import GuildInfo from "@/components/GuildInfo";
import GuildChannels from "@/components/GuildChannels";

export default {
  name: "Guild",
  components: {
    GuildInfo,
    GuildChannels
  },
  computed: {
    guild() {
      return this.$store.getters.guild(this.$route.params.id);
    }
  },
  methods: {
    fetchGuild() {
      this.$store.dispatch('fetchGuild', this.$route.params.id)
    }
  }
};
</script>

<style>
</style>