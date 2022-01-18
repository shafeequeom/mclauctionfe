<template>
  <v-card class="white--text">

    <v-card-text>
      <div class="value text-center">Value: {{ called_value }}</div>
      <v-img :src="image" height="150" contain></v-img>
      <div class="team text-center">{{ name }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "http://mclabudhabi.com/wp-content/uploads/2021/02/MUSAFFA.png",
    },
    name: {
      type: String,
      default: "Team Name",
    },
    called_value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.team {
  font-size: 1em;
  padding: 4px;
  font-weight: 700;
  color: #000;
}
.value {
  font-size: 2em;
  padding: 8px;
  font-weight: 700;
  background-color: #056823;
  color: rgb(255, 255, 255);
  border-radius: 3px;
}
</style>
