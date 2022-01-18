<template>
  <div>
    <div class="main_container pt-4 pb-8 pa-10">
      <v-container fluid>
        <!-- <v-card class="mt-2 pa-4">
          
        </v-card> -->
        <v-card elevation="12">
          <div class="bg-aurora pa-4">
            <v-row>
              <v-col md="4">
                <v-img :src="require('@/assets/ec.png')" contain></v-img>
              </v-col>
              <v-col md="1"></v-col>
              <v-col md="3">
                <v-select
                  :items="[
                    'All',
                    'Bowler',
                    'Batsman',
                    'All Rounder',
                    'Wicket Keeper',
                  ]"
                  solo
                  @change="getRandomPlayer"
                  v-model="roleFilter"
                >
                </v-select>
              </v-col>
              <v-col md="4">
                <v-autocomplete
                  :items="nameEntries"
                  :loading="nameLoading"
                  solo
                  v-model="nameFilter"
                  :search-input.sync="name"
                  return-object
                  @click:clear="nameFilter = {}"
                  @change="nameChange"
                  clearable
                  placeholder="Name search.."
                  item-text="first_name"
                  item-value="id"
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4">
                <v-img
                  :src="
                    player.image
                      ? player.image
                      : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'
                  "
                  height="350"
                >
                </v-img>
                <div class="basevalue">
                  Current Value: {{ player.value }} Points
                </div>
              </v-col>
              <v-col md="2"></v-col>
              <v-col md="6">
                <v-row>
                  <v-col md="12" class="pl-4">
                    <div class="text-capitalize name">
                      {{ player.first_name }}
                    </div>
                  </v-col>
                  <v-col md="6" class="pl-4">
                    <div class="role">{{ player.player_role }}</div>
                    <div class="mobile">{{ player.mobile_number }}</div>
                    <div class="nationality">
                      {{ player.nationality }}
                      <span v-if="player.nationality == 'India'">
                        - {{ player.state }}</span
                      >
                    </div>
                  </v-col>
                  <v-col md="6">
                    <v-row>
                      <v-col md="6" v-if="player.status == 'Sold'">
                        <v-btn color="error"
                          ><v-icon class="mr-2">mdi-cancel</v-icon> Sold</v-btn
                        >
                        <v-img v-for="bid in bids" :key="bid.id"
                        :src="
                          bid.team.image
                            ? bid.team.image
                            : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'
                        "
                        height="150"
                      >
                      </v-img>
                      </v-col>
                      
                      <!--<v-col md="6" v-if="player.status != 'Sold'">
                        <v-btn
                          color="success"
                          fab
                          x-large
                          @click="updateStatus('sold')"
                          >Mark<br />Sold</v-btn
                        >
                      </v-col>
                      <v-col md="6" v-if="player.status != 'Sold'">
                        <v-btn
                          color="warning"
                          x-large
                          fab
                          @click="updateStatus('hold')"
                          >Hold<br />Player</v-btn
                        >
                      </v-col>-->
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="4"></v-col>
              <v-col md="8" style="margin-top: -8em">
                <v-row>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-col md="2">
                    <div class="text-center">
                      <span class="score">{{
                        player.bowling_innings || "NA"
                      }}</span
                      ><br />
                      <span class="score_text">Bowling Innings</span>
                    </div>
                  </v-col>
                  <v-col md="2">
                    <div class="text-center">
                      <span class="score">{{
                        player.total_wickets || "NA"
                      }}</span
                      ><br />
                      <span class="score_text">Total Wickets</span>
                    </div>
                  </v-col>
                  <v-col md="2">
                    <div class="text-center">
                      <span class="score">{{
                        player.batting_innings || "NA"
                      }}</span
                      ><br />
                      <span class="score_text">Batting Innings</span>
                    </div>
                  </v-col>
                  <v-col md="2">
                    <div class="text-center">
                      <span class="score">{{ player.total_score || "NA" }}</span
                      ><br />
                      <span class="score_text">Total Score</span>
                    </div>
                  </v-col>
                  <v-col md="2" v-if="player.player_role == 'Wicket Keeper'">
                    <div class="text-center">
                      <span class="score">{{
                        player.total_dismissals || "NA"
                      }}</span
                      ><br />
                      <span class="score_text">Total Dismissals</span>
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </div>
    <v-container>
      <v-row class="mt-3">
        <v-col md="3" v-for="bid in bids" :key="bid.id">
          <team-card
            :image="bid.team.image"
            :name="bid.team.name"
            :id="bid.id"
            :called_value="bid.called_value"
          ></team-card>
        </v-col>
        <!--<v-col md="3">
          <v-card>
            <v-card-title class="text-center">Add Bid </v-card-title>
            <v-card-text>
              <v-select
                label="Team"
                :items="teams"
                outlined
                v-model="bidForm.team_id"
                dense
                item-text="name"
                item-value="id"
              >
                <template v-slot:item="{ item, attrs, on }">
                  <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Credits: {{ item.credits }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
              <v-text-field
                label="Bid value"
                v-model="bidForm.called_value"
                outlined
                dense
              ></v-text-field>
              <v-btn block color="primary" @click="addBid"
                ><v-icon>mdi-plus</v-icon> Add</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar.show"
      bottom
      :color="snackbar.color"
      right
      timeout="4000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import TeamCard from "@/components/TeamCard";
export default {
  components: {
    TeamCard,
  },
  data() {
    return {
      teams: [],
      player: {},
      bids: [],
      bidForm: {},
      roleFilter: "All",
      nameFilter: {},
      // mobileFilter: {},
      // mobileEntries: [],
      nameEntries: [],
      name: "",
      // mobile: "",
      // mobileLoading: false,
      nameLoading: false,
      playerId: null,
      snackbar: { show: false, message: "Success", color: "success" },
    };
  },
  mounted() {
    this.getRandomPlayer();
  },
  watch: {
    name(val) {
      console.log(val);
      if (val == null) return;
      if (this.nameFilter != null && this.nameFilter.first_name == val) return;
      this.playerId = null;
      this.searchPlayer("name", val);
    },
    // mobile(val) {
    //   if (val != null && this.mobileFilter.first_name != val) {
    //     this.playerId = null;
    //     this.searchPlayer("mobile", val);
    //   }
    // },
  },
  methods: {
    // mobileChange() {
    //   this.roleFilter = "All";
    //   this.playerId = this.mobileFilter.id;
    //   this.getRandomPlayer();
    // },
    nameChange() {
      this.roleFilter = "All";
      this.playerId = this.nameFilter != null ? this.nameFilter.id : null;
      this.getRandomPlayer();
    },
    getRandomPlayer() {
      let url =
        this.roleFilter != "All" ? "player_role=" + this.roleFilter : "";
      url += this.playerId != null ? "id=" + this.playerId : "";
      this.$http
        .get(`players/random?${url}`)
        .then((res) => {
          if (res.status == 200) {
            this.player = res.data.data != null ? res.data.data : {};
            this.bidForm.player_id =
              this.player.id != null ? this.player.id : 1;
            this.getBids();
            this.getTeams();
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
    getTeams() {
      this.$http
        .get("team/list")
        .then((res) => {
          if (res.status == 200) {
            this.teams = res.data.data != null ? res.data.data : [];
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
    getBids() {
      if (this.player.id == null) return;
      this.$http
        .get(`auction/bid/list/${this.player.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.bids = res.data.data != null ? res.data.data : [];
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
    addBid() {
      if (this.player.id == null) return;
      this.$http
        .post(`auction/bid`, this.bidForm)
        .then((res) => {
          if (res.status == 200) {
            this.bidForm = {
              player_id: this.player.id,
            };
            this.snackbar = {
              show: true,
              message: "Bid Added Successfully",
              color: "success",
            };
            this.getBids();
            this.getTeams();
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
    /*deleteBid(id) {
      this.$http
        .post(`auction/bid/delete/${id}`)
        .then((res) => {
          if (res.status == 200) {
            this.snackbar = {
              show: true,
              message: "Bid Deleted Successfully",
              color: "success",
            };
            this.getBids();
            this.getTeams();
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },*/
    updateStatus(status) {
      if (this.player.id == null) return;
      let formData = { player_id: this.player.id };
      if (status == "hold") {
        formData.called_value = this.player.value;
        formData.status = "Hold";
      } else {
        formData.called_value = this.bids[this.bids.length - 1].called_value;
        formData.team_id = this.bids[this.bids.length - 1].team_id;
        formData.status = "Sold";
      }
      this.$http
        .post(`auction/bid/update`, formData)
        .then((res) => {
          if (res.status == 200) {
            this.player = res.data.data;
            this.snackbar = {
              show: true,
              message: `Player ${status}`,
              color: "success",
            };
            this.getTeams();
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
    searchPlayer(type, value) {
      if (type == "name") {
        this.nameLoading = true;
      } else if (type == "mobile") {
        this.mobileLoading = true;
      }
      this.$http
        .get(`players?${type}=${value}`)
        .then((res) => {
          if (res.status == 200) {
            const data = res.data.data;
            if (type == "name") {
              this.nameLoading = false;
              this.nameEntries = data;
            } else if (type == "mobile") {
              this.mobileEntries = data;
              this.mobileLoading = false;
            }
          }
        })
        .catch(() => {
          this.snackbar = {
            show: true,
            message: "Error",
            color: "error",
          };
        });
    },
  },
};
</script>

<style scoped>
.main_container {
  background-color: #fff;
  /* background-image: url("../assets/bg.jpg");
  background-position: 50% 21%; */
}

.name {
  font-size: 3em;
  font-weight: 700;
  margin-top: -20px;
}
.role {
  font-size: 2em;
}
.mobile,
.nationality,
.state {
  font-size: 1.5em;
  font-weight: 300;
}
.score {
  font-size: 3em;
  font-weight: 400;
}
.score_text {
  font-weight: 00;
}
.bg-aurora {
  color: #fff;
  background: -webkit-linear-gradient(-70deg, #0f425d 60%, rgba(0, 0, 0, 0) 30%),
    url("${player.image ? player.image : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'}");
  background: -o-linear-gradient(-70deg, #0f425d 60%, rgba(0, 0, 0, 0) 30%),
    url("${player.image ? player.image : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'}");
  background: -moz-linear-gradient(-70deg, #0f425d 60%, rgba(0, 0, 0, 0) 30%),
    url("${player.image ? player.image : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'}");
  background: linear-gradient(-70deg, #0f425d 60%, rgba(0, 0, 0, 0) 30%),
    url("${player.image ? player.image : 'http://mclabudhabi.com/wp-content/uploads/2021/01/cropped-mcl-1.png'}");
  background-size: cover;
}
.basevalue {
  background-color: #fa7c30;
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 1.3em;
  font-weight: 600;
}
</style>
