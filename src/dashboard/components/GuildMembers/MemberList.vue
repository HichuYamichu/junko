<template>
  <v-list rounded subheader style="max-height: 400px" class="overflow-y-auto" v-if="guild">
    <v-list-group no-action v-for="role in hoistedRoles" :key="role.id">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Hoist: {{role.name}}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="member in getRoleMembers(role.id)"
        :key="member.id"
        @click="selectMember(member.user.id)"
      >
        <v-list-item-avatar>
          <v-img
            :src="member.user.avatar ? 
          `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp`
          : 'https://cdn.discordapp.com/embed/avatars/2.png'"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-title v-text="member.displayName"></v-list-item-title>
      </v-list-item>
    </v-list-group>
    <v-list-group no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Not hoisted:</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="member in getNonHoistedMembers()"
        :key="member.id"
        @click="selectMember(member.user.id)"
      >
        <v-list-item-avatar>
          <v-img
            :src="member.user.avatar ? 
          `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp`
          : 'https://cdn.discordapp.com/embed/avatars/2.png'"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-title v-text="member.displayName"></v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
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
            members {
              displayName
              joinedTimestamp
              roles {
                id
                color
                name
              }
              user {
                avatar
                id
                tag
              }
            }
            roles {
              id
              name
              hoist
              rawPosition
            }
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  computed: {
    hoistedRoles() {
      return this.guild.roles
        .filter(role => role.hoist)
        .sort((a, b) => b.rawPosition - a.rawPosition);
    }
  },
  methods: {
    getRoleMembers: function(id) {
      return this.guild.members.filter(member => {
        return member.roles.find(r => r.id === id);
      });
    },
    getNonHoistedMembers: function() {
      return this.guild.members.filter(
        member =>
          !member.roles
            .map(r => r.id)
            .some(role => this.hoistedRoles.map(r => r.id).includes(role))
      );
    },
    selectMember: function(id) {
      const variables = { member: this.guild.members.find(member => member.user.id === id) };
      const mutation = gql`
        mutation selectMember($member: Member) {
          selectMember(Member: $member) @client
        }
      `;
      this.$apollo.mutate({ mutation, variables });
    }
  }
};
</script>