import Moment from 'moment';

export default function(dt) {
	let days = {
    sameDay: "[Today]",
    nextDay: "ddd",
    nextWeek: "ddd",
    lastDay: "ddd",
    lastWeek: "ddd"
  }

  return Moment(dt * 1000).calendar(null, days);
}
  	