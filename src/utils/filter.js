import moment from "moment";
import Vue from "vue";

Vue.filter("dateformat", (arg) => {
  return moment(arg).format("Do MMM YYYY");
});

Vue.filter("dayDateFormat", (arg) => {
  return moment(arg).format("dddd, MMMM Do YYYY");
});

export default Vue.filter;
