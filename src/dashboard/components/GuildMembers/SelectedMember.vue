<template>
  <div>
    <v-card-text>
      <span>Member ID:</span>
      {{ selectedMember.user ? selectedMember.user.id : '' }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Member display name:</span>
      {{ selectedMember.displayName}}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Member tag:</span>
      {{ selectedMember.user ? selectedMember.user.tag : ''}}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Member joined at:</span>
      {{ selectedMember.joinedTimestamp }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Member avatar URL:</span>
      {{ selectedMember.user ? selectedMember.user.avatar ?
      `https://cdn.discordapp.com/avatars/${selectedMember.user.id}/${selectedMember.user.avatar}.webp`
      : 'https://cdn.discordapp.com/embed/avatars/2.png' : ''}}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Member roles:</span>
      <v-chip
        v-for="(role, id) in selectedMember.roles"
        :key="id"
        :color="`#${toHex(role.color)}`"
        small
        class="mx-2"
      >{{role.name}}</v-chip>
    </v-card-text>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      message: "",
      selectedMember: {},
      fields: {
        id: "ID:",
        name: "name:",
        type: "type:",
        nsfw: "NSFW:",
        topic: "topic:",
        createdTimestamp: "created at:",
        bitrate: "bitrate:",
        rateLimitPerUser: "rate limit per user:",
        userLimit: "user limit:"
      }
    };
  },
  apollo: {
    selectedMember: {
      query: gql`
        query {
          selectedMember: SelectedMember @client {
            user {
              id
              tag
              avatar
            }
            roles{
              name
              color
              id
            }
            displayName
            joinedTimestamp
          }
        }
      `,
      update: ({ selectedMember }) => selectedMember
    }
  },
  methods: {
    toHex: function(val) {
      return val.toString(16);
    }
  }
};
</script>