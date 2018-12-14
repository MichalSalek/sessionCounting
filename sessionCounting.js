const example1 = ['2017-03-10 08:13:11', '2017-03-10 19:01:27', '2017-03-11 07:05:56', '2017-03-11 07:35:55', '2017-03-11 16:15:11', '2017-03-12 08:01:41', '2017-03-12 17:19:08']
// Result: True
const example2 = ['2017-03-10 18:58:11', '2017-03-10 19:01:27', '2017-03-11 07:35:55', '2017-03-11 16:15:11', '2017-03-12 08:01:41', '2017-03-12 17:19:08']
// Result: False (user entered the website during each of the three days, but had only 5 sessions)
const example3 = ['2017-03-08 17:11:13', '2017-03-11 17:22:47', '2017-03-11 19:23:51', '2017-03-11 22:03:12', '2017-03-12 08:32:04', '2017-03-12 13:19:08', '2017-03-12 17:19:08']
// Result: False (user entered the website during only last two days)
const example4 = [];
// Result: Array is empty
const example5 = ['2017-03-08 17-11-13', '2017-03-11 17-22-47'];
// Result: Time format is invalid
const example6 = ['2017/03/08 17:11:13', '2017-03-11 17:22:47'];
// Result: Data format is invalid
const example7 = ['2017/03/08 17:11:13', '2017-03-11 17/22/47'];
// Result: Data and time format is invalid - check correctness of input log.
const example8 = "https://michalsalek.pl/";
// Result: Input is not an array.
const example9 = 2 + 2;
// Result: Input is not an array.

const checkPropertyOfInput = (stringsArr) => {
    if (!stringsArr || !Array.isArray(stringsArr)) { console.log("Input is not an array."); return };
    isDateOk = true;
    isTimeOk = true;
    const regDate = new RegExp("[^/d]{4}-[^/d]{2}-[^/d]{2}");
    const regTime = new RegExp("[^/d]{2}\:[^/d]{2}\:[^/d]{2}");
    stringsArr.forEach((value) => {
        if (!regDate.test(value)) isDateOk = false;
        if (!regTime.test(value)) isTimeOk = false;
    })
    if (!isDateOk && !isTimeOk) { console.log("Check correctness of input log."); return };
    if (!isDateOk) { console.log("Date format is invalid."); return };
    if (!isTimeOk) { console.log("Time format is invalid."); return };
    return stringsArr;
}

const setStringArrToDateArr = (stringsArr) => {
    if (!stringsArr) return;
    if (stringsArr.length === 0) { console.log("Logs array is empty"); return };
    const dateArray = stringsArr.map((value) => {
        let dateObj = {
            year: parseFloat(value.substr(0, 4)),
            month: (parseFloat(value.substr(5, 2)) - 1),
            date: parseFloat(value.substr(8, 2)),
            hour: parseFloat(value.substr(11, 2)),
            min: parseFloat(value.substr(14, 2)),
            sec: parseFloat(value.substr(17, 2))
        };
        let correctDate = new Date(dateObj.year, dateObj.month, dateObj.date, dateObj.hour, dateObj.min, dateObj.sec);
        return correctDate;
    })
    if (dateArray[0] < dateArray[dateArray.length - 1]) dateArray.reverse();
    return dateArray;
}

const doesLogContainLastThreeDays = (arrToCheck) => {
    if (!arrToCheck) return;
    const present = arrToCheck[0];
    const today = new Date(present.getTime());
    today.setDate(today.getDate());
    checksumArr = [];
    arrToCheck.forEach((value) => {
        checksumArr.push(value.getDate() - (today.getDate() - 2));
    });
    return (checksumArr.includes(0 && 1 && 2)) ? arrToCheck : console.log("Log contains less than 3 days back.");
}

const lastThreeDaysOnly = (dateArr) => {
    if (!dateArr) return false;
    const present = dateArr[0];
    let maxPast = new Date(present.getTime());
    maxPast.setDate(maxPast.getDate() - 3);
    const filteredArr = [...dateArr.filter((value) => (present - value) < (present - maxPast))]
    return filteredArr;
}

const doesPopUp = (filteredDateArr) => {
    if (!filteredDateArr) return false;
    let sessionCounter = filteredDateArr.length;
    filteredDateArr.forEach((_, i, arr) => {
        if (arr[i + 1] !== undefined) {
            let presentDate = arr[i];
            let pastDate = arr[i + 1];
            if ((presentDate - pastDate) < 1800000) {
                sessionCounter -= 1;
            }
        }
    })
    console.log(`Amount of unique sessions: ${sessionCounter}`)
    return (sessionCounter >= 6) ? true : false
}

const putLogInsideMe = (logArr) => {                         // Initialization of the program
    const validInput = checkPropertyOfInput(logArr)          // Validation of input log data
    const converted = setStringArrToDateArr(validInput);     // Conversion: from String to js Date format
    const checked = doesLogContainLastThreeDays(converted);  // Checking if the array contains the latest 3 days
    const filtered = lastThreeDaysOnly(checked);             // Erasing everything except latest 3 days from array
    return doesPopUp(filtered);                              // Checking if the array contains 6 unique sessions
}

console.log(`Problem:

We would like to check what users are actively using one of our web applications and, if so, ask for their opinion. 
Each user enters the application and navigates between pages. For each user, we log whenever he or she opens main page or any other page. Whenever he or she open a page for the first time or after a break of at least 30 minutes, we count it as a new session. We will ask the user for his or her opinion only when for the last three days he or she used the application each day and in total he or she has had six unique sessions.


Task:

Write a function that will receive the log, i.e. a sequence of timestamps in chronological order. Each timestamp denotes single time the user has opened the website. The function should return True if we should ask the user for his or her opinion and False otherwise. Timestamps are strings in the format of 'YYY-MM-DD hh:mm:ss', using user's time zone. You can assume that the last entry is with today's date.

***

Script features:

- Validates the correctness of the date format in the input log
- Validates the correctness of the time in the input log
- It know about the occurrence of a leap year
- It know about the daylight saving time
- Works with millisecond accuracy
- It is easy to debug thanks to separation of functions
- Detects an empty log array and displays an error
- Counts and displays number of amount unique sessions
- Popups the info, if in the log there is no three days back


Included examples:

example1 = ['2017-03-10 08:13:11', '2017-03-10 19:01:27', '2017-03-11 07:05:56', '2017-03-11 07:35:55', '2017-03-11 16:15:11', '2017-03-12 08:01:41', '2017-03-12 17:19:08']
    result: True

example2 = ['2017-03-10 18:58:11', '2017-03-10 19:01:27', '2017-03-11 07:35:55', '2017-03-11 16:15:11', '2017-03-12 08:01:41', '2017-03-12 17:19:08']
    result: False (user entered the website during each of the three days, but had only 5 sessions)

example3 = ['2017-03-08 17:11:13', '2017-03-11 17:22:47', '2017-03-11 19:23:51', '2017-03-11 22:03:12', '2017-03-12 08:32:04', '2017-03-12 13:19:08', '2017-03-12 17:19:08']
    result: False (user entered the website during only last two days)

example4 = [];
    result: Array is empty

example5 = ['2017-03-08 17-11-13', '2017-03-11 17-22-47'];
    result: Time format is invalid

example6 = ['2017/03/08 17:11:13', '2017-03-11 17:22:47'];
    result: Data format is invalid

example7 = ['2017/03/08 17:11:13', '2017-03-11 17/22/47'];
    result: Data and time format is invalid - check correctness of input log.

example8 = "https://michalsalek.pl/";
    result: Input is not an array.

example9 = 2 + 2;
    result: Input is not an array.



putLogInsideMe(example1) <= START
`);