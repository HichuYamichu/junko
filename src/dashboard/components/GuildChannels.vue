<template>
  <v-layout>
    <v-flex xs6>
      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="channel in channels"
            :key="channel.id"
            @click="changeChannel(channel.id)"
          >
            <v-list-item-content>
              <v-list-item-title v-html="channel.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6 v-show="activeChannel">
      <v-card-text>
        <span>Channel ID:</span>
        {{ activeChannel.id || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel createdAt:</span>
        {{ activeChannel.createdAt || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel type:</span>
        {{ activeChannel.type || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel name:</span>
        {{ activeChannel.name || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel position:</span>
        {{ activeChannel.position || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Channel topic:</span>
        {{ activeChannel.topic || 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mt-5">
        <v-text-field
          v-model="messageContent"
          label="Say"
          outlined
          :disabled="!activeChannel"
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
      activeChannel: "",
      messageContent: ""
    };
  },
  computed: {
    guild() {
      return this.$store.getters.guild(this.$route.params.id);
    },
    channels() {
      if (this.guild.channels) {
        return this.guild.channels
          .filter(chan => chan.type !== "category")
          .sort((a, b) => a - b);
      }
      return [];
    }
  },
  methods: {
    changeChannel: function(id) {
      this.activeChannel = this.guild.channels.find(chan => chan.id === id);
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
