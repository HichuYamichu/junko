import Api from '@/api/api'

export default {
  fetchGuilds () {
    return Api().get('guilds')
  },
  fetchGuild (guildID) {
    return Api().get(`guild/${guildID}`)
  },
  say (msg) {
    return Api().post('say', msg)
  }
}