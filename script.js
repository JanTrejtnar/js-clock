let is24HourFormat = true;

function getTime () {
    const today = new Date();
    let hours = !is24HourFormat && today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    hours = checkEditTime(hours);
    minutes = checkEditTime(minutes);
    seconds = checkEditTime(seconds);

    updateClock(hours, minutes, seconds);
    updateDate(today);
    setTimeout(getTime, 1000);
}

function checkEditTime (unit) {
    return unit < 10 ? "0" + unit : unit;
}

function updateClock (hours, minutes, seconds) {
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

function updateDate (date) {
    document.getElementById("date").innerText = date.toLocaleDateString();

    // "disable" non-current weekdays
    for (let weekday = 0; weekday < 7; weekday++) {
        const currentElement = document.getElementById("weekdays").children[weekday];
        
        if (date.getDay() === weekday) {
            currentElement.style.color = "white";
            currentElement.style.fontWeight = "bold";
        }
    }
}

document.getElementById("toggleFormat").addEventListener("click", function () {
    is24HourFormat = !is24HourFormat;

    document.getElementById("toggleFormat").innerText = is24HourFormat ? "12-hour format" : "24-hour format";
    const ampm = document.getElementById("ampm")
    ampm.style.display = is24HourFormat ? "none" : "inline";
    ampm.innerText = new Date().getHours() >= 12 ? "PM" : "AM";

    getTime();
});

getTime();