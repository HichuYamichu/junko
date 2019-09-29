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
        let response = await fetch('/api/auth', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: this.login,
            password: this.password
          })
        });
        console.log(response)
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