<template>
  <div v-if="guild">
    <v-card-text>
      <span>Guild ID:</span>
      {{ guild.id }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild icon:</span>
      {{ guild.icon }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild created at:</span>
      {{ guild.createdAt }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild description:</span>
      {{ guild.description }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild member count:</span>
      {{ guild.memberCount }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild region:</span>
      {{ guild.region }}
    </v-card-text>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    guild: {
      query: gql`
        query Guild($id: String!) {
          guild: Guild(ID: $id) {
            id
            name
            icon
            createdAt
            description
            memberCount
            region
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id};
      }
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
