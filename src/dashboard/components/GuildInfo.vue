<template>
  <div>
    <v-card-text>
      <span>Guild ID:</span>
      {{ guild.id }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild icon:</span>
      {{ guild.icon || 'N/A' }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild created at:</span>
      {{ guild.createdAt || 'N/A' }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild description:</span>
      {{ guild.description || 'N/A' }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild memberCount:</span>
      {{ guild.memberCount || 'N/A' }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <span>Guild region:</span>
      {{ guild.region || 'N/A' }}
    </v-card-text>
  </div>
</template>

<script>
export default {
  computed: {
    guild() {
      return this.$store.getters.guild(this.$route.params.id);
    }
  }
};
</script>

<style>
  span {
    font-weight: 700;
    font-size: 1.2em
  }
</style>
