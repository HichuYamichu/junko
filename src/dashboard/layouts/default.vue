<template>
  <v-app dark>
    <v-navigation-drawer :clipped="true" fixed app>
      <v-list>
        <v-list-item v-for="(guild, i) in guilds" :key="i" nuxt :to="`/guilds/${guild.id}`">
          <v-list-item-avatar v-if="guild.icon">
            <v-img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="guild.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app color="black">
      <v-toolbar-title @click="index">JUNKO DASHBOARD</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn large depressed color="black" nuxt to="/logs">logs</v-btn>
        <v-btn large depressed color="black">reload</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    guilds: {
      query: gql`
        {
          Guilds {
            id
            name
            icon
          }
        }
      `,
      update: ({ Guilds }) => Guilds,
    }
  },
  methods: {
    index: function() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
