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
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                :d="channel.type === 'text' ? textChannelSVG : voiceChannelSVG"
              />
            </svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                :d="channel.type === 'text' ? textChannelSVG : voiceChannelSVG"
              />
            </svg>
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
    },
    textChannelSVG() {
      return "M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z";
    },
    voiceChannelSVG() {
      return "M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z";
    }
  },
  methods: {
    changeChannel: function(id) {
      this.activeChannel = this.guild.channels.find(chan => chan.id === id);
    },
    getSectionChannels: function(sectionID) {
      if (this.guild.channels) {
        return this.guild.channels
          .filter(
            chan => chan.parentID === sectionID && chan.type !== "category"
          )
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
