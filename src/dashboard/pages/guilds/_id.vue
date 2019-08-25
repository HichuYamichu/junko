<template>
  <v-card v-if="guild">
    <v-app-bar flat color="secondary">
      <v-toolbar-title class="font-weight-medium display-1">Guild name: {{ guild.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
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
        <v-expansion-panel-content class="channelList">
          <guild-channels></guild-channels>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Members</v-expansion-panel-header>
        <v-expansion-panel-content class="memberList">
          <guild-members></guild-members>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Tags</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import gql from "graphql-tag";
import GuildInfo from "@/components/GuildInfo";
import GuildChannels from "@/components/GuildChannels/GuildChannels";
import GuildMembers from "@/components/GuildMembers/GuildMembers";

export default {
  name: "Guild",
  components: {
    GuildInfo,
    GuildChannels,
    GuildMembers
  },
  apollo: {
    guild: {
      query: gql`
        query Guild($id: String!) {
          guild: Guild(ID: $id) {
            id
            name
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  head() {
    return {
      title: this.guild ? `${this.guild.name}` : "Loading"
    };
  }
};
</script>

<style>
.channelList {
  max-height: 650px;
}

.memberList {
  max-height: 420px;
}
</style>