<template>
  <v-layout>
    <v-flex xs6>
      <member-list />
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6>
      <selected-member />
    </v-flex>
  </v-layout>
</template>

<script>
import MemberList from './MemberList'
import SelectedMember from './SelectedMember'

export default {
  components: {
    MemberList,
    SelectedMember
  },
  data() {
    return {
      activeMember: {},
      messageContent: ""
    };
  },
};
</script>

<style>
span {
  font-weight: 700;
  font-size: 1.2em;
}
</style>