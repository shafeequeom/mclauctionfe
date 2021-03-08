<template>
  <v-container fluid class="pa-10">
    <v-simple-table class="credit_table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Mobile</th>
            <th class="text-left">Nationality</th>
            <th class="text-left">State</th>
            <th class="text-left">Player Role</th>
            <th class="text-left">Batting Innings</th>
            <th class="text-left">Total Score</th>
            <th class="text-left">Bowling Innings</th>
            <th class="text-left">Total Wickets</th>
            <th class="text-left">Total Dismissals</th>
            <th class="text-left">Player Type</th>
            <th class="text-left">Weightage</th>
            <th class="text-left">Value</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in players" :key="item.id">
            <td>{{ item.first_name }}</td>
            <td>{{ item.mobile_number }}</td>
            <td>{{ item.nationality }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.player_role }}</td>
            <td>{{ item.batting_innings }}</td>
            <td>{{ item.total_score }}</td>
            <td>{{ item.bowling_innings }}</td>
            <td>{{ item.total_wickets }}</td>
            <td>{{ item.total_dismissals }}</td>
            <td>{{ item.player_type }}</td>
            <td>{{ item.weightage }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
      circle
      v-model="page"
      :length="totalPages"
      total-visible="10"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      players: [],
      page: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.getPlayers();
  },
  watch: {
    page() {
      this.getPlayers();
    },
  },
  methods: {
    getPlayers() {
      this.$http.get(`players?page=${this.page}`).then((res) => {
        if (res.status == 200) {
          this.players = res.data.data;
          this.totalPages = res.data.totalPages;
        }
      });
    },
  },
};
</script>

<style scoped>
.credit_table table thead tr th {
  background: #cc9600 !important;
  color: #fff !important;
}
</style>
