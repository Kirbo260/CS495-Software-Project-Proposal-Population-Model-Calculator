// Checks the different time inputs and formats 
// Time can be a single value (e.g. 5) or a comma-separated list of values (e.g. 0,1,2,3)
// Time can be null if we are solving for it
// Time can be an array of values if we are calculating population at multiple time points
// time format can be seconds, minutes, hours, days, weeks, months, or years (e.g. 5s, 10m, 2h, 1d, 3w, 6mo, 1y)
// convert each to years for calculations (e.g. 5s = 5/31536000 years, 10m = 10/525600 years, 2h = 2/8760 years, 1d = 1/365 years, 3w = 3/52 years, 6mo = 0.5 years, 1y = 1 year)

export default class TimeChecker {
    constructor(time, timeFormat) {
        this.time = time;
        this.timeFormat = timeFormat;
    }

    TimeDivider(time, timeNumber) {
        for (let i = 0; i < time.length; i++) {
            time[i] = time[i] / timeNumber;
        }
        return time;
    }

    MaxTime() {
        let maxTime = 0;
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] > maxTime) {
                maxTime = this.time[i];
            }
        }
        return maxTime;
    }

    TimeCheck() {
        if (this.time == null) {
            return null;
        }

        let t = Array.isArray(this.time) ? this.time : [this.time]; // time can be an array for multiple time points or a single value

        if (t.some(isNaN)) { // Check if any value in the time array is not a number
            throw new Error("Time must be a number or an array of numbers.");
        }

        if (this.timeFormat === "none") {
            return t; // If no time format is provided, return the time array as is
        }

        // Convert time to years based on the time format provided
        if (this.timeFormat != "y"){
            if (this.timeFormat === "s") {
                return this.TimeDivider(t, 31536000); // convert seconds to years
            }
            else if (this.timeFormat === "m") {
                return this.TimeDivider(t, 525600); // convert minutes to years
            }
            else if (this.timeFormat === "h") {
                return this.TimeDivider(t, 8760); // convert hours to years
            }
            else if (this.timeFormat === "d") {
                return this.TimeDivider(t, 365); // convert days to years
            }
            else if (this.timeFormat === "w") {
                return this.TimeDivider(t, 52); // convert weeks to years
            }
            else if (this.timeFormat === "mo") {
                return this.TimeDivider(t, 12); // convert months to years
            }
        }
        return t; // return the time array as is if it's already in the correct format (e.g. years)
    }
}