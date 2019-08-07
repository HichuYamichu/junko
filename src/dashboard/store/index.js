import Vue from 'vue';

export const state = () => ({
  guilds: []
});

export const mutations = {
  SET_GUILDS(state, guildIDs) {
    state.guilds = guildIDs.map(id => {
      return {
        id: id
      };
    });
  },

  UPDATE_GUILD(state, guildNew) {
    const index = state.guilds.findIndex(g => g.id === guildNew.id);
    Vue.set(state.guilds, index, guildNew);
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const { ids } = await this.$axios.$get('/api/guilds');
    commit('SET_GUILDS', ids);
  },

  async fetchGuild({ commit }, id) {
    const res = await this.$axios.$get(`/api/guild/${id}`);
    console.log(res);
    commit('UPDATE_GUILD', res);
  }
};

export const getters = {
  guilds: state => state.guilds,
  guild: state => id => {
    return state.guilds.find(g => g.id === id);
  }
};
