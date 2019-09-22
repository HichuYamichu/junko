<template>
  <div>
    <v-overlay v-if="!guild" absolute>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <div v-else>
      <div v-for="(field, name) in fields" :key="name">
        <v-card-text>
          <span>{{ field }}</span>
          {{ guild[name] }}
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      fields: {
        id: "ID:",
        name: "name:",
        description: "description",
        region: "region:",
        createdTimestamp: "created timestamp:",
        icon: "icon:",
        memberCount: "member count:",
      }
    };
  },
  apollo: {
    guild: {
      query: gql`
        query Guild($id: String!) {
          guild: Guild(ID: $id) {
            id
            name
            icon
            createdTimestamp
            description
            memberCount
            region
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
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
