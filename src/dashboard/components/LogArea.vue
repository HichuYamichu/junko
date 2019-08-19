<template>
  <v-textarea
    :id="`${source}-textarea`"
    readonly
    filled
    :value="getLogs"
    background-color="black"
    color="white"
    height="700"
  ></v-textarea>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: {
    source: String
  },
  data() {
    return {
      logs: [],
      start: -40,
      stop: -1,
      firstLoad: true
    };
  },
  created() {
    this.fetchLogs();
  },
  updated() {
    this.$nextTick(() => {
      if (this.firstLoad) {
        const textarea = this.$el.querySelector(`#${this.source}-textarea`);
        textarea.scrollTop = textarea.scrollHeight;
        this.firstLoad = false;
      }
    });
  },
  computed: {
    getLogs() {
      return this.logs.join("\n");
    }
  },
  methods: {
    fetchLogs: async function() {
      const variables = {
        source: this.source,
        start: this.start,
        stop: this.stop
      };
      const query = gql`
        query Logs($source: String!, $start: Int!, $stop: Int!) {
          logs: Logs(Source: $source, Start: $start, Stop: $stop) {
            content
          }
        }
      `;
      const {
        data: {
          logs: { content }
        }
      } = await this.$apollo.query({ query, variables });
      this.logs = content
    }
  }
};
</script>