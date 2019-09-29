<template>
  <div>
    <h1>{{ guild }}</h1>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    guild: {
      error(error) {
        return this.$router.push('/404');
      },
      query: gql`
        query Guild($id: String!) {
          guild: Guild(ID: $id) {
            id
            name
          }
        }
      `,
      variables() {
        return { id: '506150345391603722' };
      }
    }
  }
};
</script>