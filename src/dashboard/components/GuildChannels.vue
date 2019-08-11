<template>
  <v-layout>
    <v-flex xs6>
      <v-list rounded subheader style="max-height: 600px" class="overflow-y-auto">
        <v-list-group no-action v-if="getSectionChannels().length">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Category: NONE</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="channel in getSectionChannels()"
            :key="channel.id"
            @click="changeChannel(channel.id)"
          >
            <v-list-item-title v-text="channel.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action v-for="section in sections" :key="section.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Category: {{section.name}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="channel in getSectionChannels(section.id)"
            :key="channel.id"
            @click="changeChannel(channel.id)"
          >
            <v-list-item-title v-text="channel.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6 v-show="activeChannel">
      <v-card-text>
        <span>Channel ID:</span>
        {{ activeChannel.id }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel name:</span>
        {{ activeChannel.name }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel type:</span>
        {{ activeChannel.type }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel topic:</span>
        {{ activeChannel.topic }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>NSFW:</span>
        {{ activeChannel.nsfw }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel created at:</span>
        {{ activeChannel.createdAt }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel bitrate:</span>
        {{ activeChannel.type !== 'text' ? activeChannel.bitrate : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel rate limit per user:</span>
        {{ activeChannel.type !== 'text' ? activeChannel.rateLimitPerUser : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel user limit:</span>
        {{ activeChannel.type !== 'text' ? activeChannel.userLimit : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mt-5">
        <v-text-field
          v-model="messageContent"
          label="Say"
          outlined
          :disabled="!activeChannel.id"
          @keyup.enter="say"
        ></v-text-field>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      activeChannel: {},
      messageContent: ""
    };
  },
  computed: {
    guild() {
      return this.$store.getters.guild(this.$route.params.id);
    },
    sections() {
      if (this.guild.channels) {
        return this.guild.channels.filter(chan => chan.type === "category");
      }
      return [];
    }
  },
  methods: {
    changeChannel: function(id) {
      this.activeChannel = this.guild.channels.find(chan => chan.id === id);
    },
    getSectionChannels: function(sectionID = "") {
      if (this.guild.channels) {
        return this.guild.channels
          .filter(chan => chan.parentID === sectionID)
          .sort((a, b) => a.position - b.position);
      }
      return [];
    },
    say: function() {
      this.$axios.$post("/api/say", {
        guildID: this.guild.id,
        channelID: this.activeChannel.id,
        content: this.messageContent
      });
    }
  }
};
</script>

<style>
span {
  font-weight: 700;
  font-size: 1.2em;
}
</style>
