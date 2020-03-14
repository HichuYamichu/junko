<template>
  <v-footer app absolute color="black">
    <span class="white--text">&copy; 2019-{{ date }} Hichu-Yamichu</span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    date: new Date().getFullYear()
  })
};
</script>
