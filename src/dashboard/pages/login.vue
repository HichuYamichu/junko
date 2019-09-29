<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <form class="login">
        <v-text-field v-model="login" label="login" name="login" type="text" outlined></v-text-field>
        <v-text-field v-model="password" label="password" name="password" type="password" outlined></v-text-field>
        <v-btn @click="send">send</v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    send: async function() {
      try {
        this.$axios.post(
          '/api/auth',
          {
            login: this.login,
            password: this.password
          },
          { withCredentials: true }
        );
        this.$router.push('/admin');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 30vh;
}
</style>