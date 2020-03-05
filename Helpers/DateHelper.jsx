import moment from "moment";

export default class DateHelper {

    static getDurationSinceDate = (date) => {
       let days = moment().diff(moment(date), "days");
       let result = "";
       if (days === 0) {
        result = "today"
       }
       else {
           result = days + " days ago";
       }
       return result;
    }
}