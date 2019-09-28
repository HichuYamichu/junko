<template>
  <div>
    <h1>{{ guild }}</h1>
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
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  }
  // middleware(ctx) {
  //   const variables = {
  //     guildID: '506150345391603722',
  //     channelID: '506150345391603724',
  //     content: 'aaaaa'
  //   };
  //   const query = gql`
  //     query IsLoggedIn() {
  //       IsLoggedIn() {
  //         State
  //       }
  //     }
  //   `;
  //   console.log(ctx);
  //   ctx.app.apolloProvider.defaultClient.query({ query });
  //   return ctx.redirect('/404');
  // }
};
</script>