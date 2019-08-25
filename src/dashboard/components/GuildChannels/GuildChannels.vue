<template>
  <v-layout>
    <v-flex xs6>
      <channel-list />
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6>
      <selected-channel />
    </v-flex>
  </v-layout>
</template>

<script>
import ChannelList from './ChannelList'
import SelectedChannel from './SelectedChannel'

export default {
  components: {
    ChannelList,
    SelectedChannel
  },
};
</script>

<style>
span {
  font-weight: 700;
  font-size: 1.2em;
}
</style>