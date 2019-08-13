<template>
  <v-layout>
    <v-flex xs6>
      <v-list rounded subheader style="max-height: 400px" class="overflow-y-auto">
        <v-list-group no-action v-for="role in roles" :key="role.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Hoist: {{role.name}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="member in getHoistedMembers(role.id)"
            :key="member.id"
            @click="changeMember(member.user.id)"
          >
            <v-list-item-avatar>
              <v-img
                :src="member.user.avatar"
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
            @click="changeMember(member.user.id)"
          >
            <v-list-item-avatar>
              <v-img
                :src="member.user.avatar"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="member.displayName"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs6 v-show="activeMember">
      <v-card-text>
        <span>Member ID:</span>
        {{ activeMember.user ? activeMember.user.id : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Member display name:</span>
        {{ activeMember.user ? activeMember.displayName : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Member tag:</span>
        {{ activeMember.user ? activeMember.user.tag : 'N/A'}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Member joined at:</span>
        {{ activeMember.user ? activeMember.joinedAt : 'N/A' }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Member avatar URL:</span>
        {{ activeMember.user ? `https://cdn.discordapp.com/avatars/${activeMember.user.id}/${activeMember.user.avatar}.webp` : 'N/A'}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <span>Member roles:</span>
        <v-chip
          v-for="(role, id) in getActiveMemberRoles()"
          :key="id"
          :color="`#${toHex(role.color)}`"
          small
          class="mx-2"
        >{{role.name}}</v-chip>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      activeMember: {},
      messageContent: ""
    };
  },
  computed: {
    guild() {
      return this.$store.getters.guild(this.$route.params.id);
    },
    roles() {
      if (this.guild.roles) {
        return this.guild.roles
          .filter(role => role.hoist)
          .sort((a, b) => b.position - a.position);
      }
      return [];
    }
  },
  methods: {
    changeMember: function(id) {
      this.activeMember = this.guild.members.find(
        member => member.user.id === id
      );
    },
    getHoistedMembers: function(id) {
      if (this.guild.members) {
        return this.guild.members.filter(member =>
          member._roles ? member._roles.includes(id) : false
        );
      }
      return [];
    },
    getNonHoistedMembers: function() {
      if (this.guild.members) {
        return this.guild.members.filter(member =>
          member._roles
            ? !member._roles.some(role =>
                this.roles.map(r => r.id).includes(role)
              )
            : true
        );
      }
      return [];
    },
    getActiveMemberRoles: function() {
      if (this.guild.roles && this.activeMember._roles) {
        return this.guild.roles.filter(role =>
          this.activeMember._roles.includes(role.id)
        );
      }
      return [];
    },
    toHex: function(val) {
      return val.toString(16);
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