<template>
  <div>
    <div v-for="(field, name) in fields" :key="name">
      <v-card-text>
        <span>{{ field }}</span>
        {{ selectedChannel[name] }}
      </v-card-text>
      <v-divider></v-divider>
    </div>
    <v-card-actions class="mt-5">
      <v-text-field
        v-model="message"
        label="Say"
        outlined
        :disabled="selectedChannel.type !== 'text'"
        @keyup.enter="say"
      ></v-text-field>
    </v-card-actions>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      message: "",
      selectedChannel: {},
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
    selectedChannel: {
      query: gql`
        query {
          selectedChannel: SelectedChannel @client {
            id
            name
            createdTimestamp
            type
            rawPosition
            topic
            nsfw
            bitrate
            userLimit
            parentID
            rateLimitPerUser
          }
        }
      `,
      update: ({ selectedChannel }) => selectedChannel
    }
  },
  methods: {
    say: function() {
      const variables = {
        guildID: this.$route.params.id,
        channelID: this.selectedChannel.id,
        content: this.message
      };
      const query = gql`
        query Say($guildID: String!, $channelID: String!, $content: String!) {
          Say(GuildID: $guildID, ChannelID: $channelID, Content: $content)
        }
      `;
      this.$apollo.query({ query, variables });
    }
  }
};
</script>