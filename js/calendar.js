// self-explanatory (months are indexed from 0)
function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

// gets the date, as in the day of the month
function getCurrentDate() {
    return new Date().getDate();
}

// as in day of the week
function getCurrentDay() {
    return new Date().getDay();
}


function displayCalendar() {
    let month = getCurrentMonth();
    let date = getCurrentDate();
    let dayOfWeek = getCurrentDay();

    drawCalendar(month, date, dayOfWeek);
}

function drawCalendar(month, date, dayOfWeek) {
    const backCanvas = document.getElementById("background-canvas");
    const backContext = backCanvas.getContext("2d");

    const midCanvas = document.getElementById("middle-canvas");
    const midContext = midCanvas.getContext("2d");

    const foreCanvas = document.getElementById("foreground-canvas");
    const foreContext = foreCanvas.getContext("2d");

    let dateDigit1;
    let dateDigit2;

    if (date >= 10) {
        dateDigit1 = Math.floor(date / 10);
        dateDigit2 = date % 10;
    } else {
        dateDigit1 = date;
    }

/*    if (canvas.getContext) {
        const context = canvas.getContext("2d");
    } else { // canvas is not supported by the browser, so don't worry about it
        return;
    }
*/

/* for now, before i come up with a better system, i could make functions for
   the months, dates, and days of the week that take in an image, a context,
   and a pixel position
*/

    const monthDigitF = new Image();
    monthDigitF.onload = function() {
        foreContext.drawImage(monthDigitF, 19, 24);
    };
    monthDigitF.src = `images/calendar/months/m${month}f.png`;

    const monthDigitM = new Image();
    monthDigitM.onload = function() {
        midContext.drawImage(monthDigitM, 9, 15);
    };
    monthDigitM.src = `images/calendar/months/m${month}m.png`;

    const monthDigitB = new Image();
    monthDigitB.onload = function() {
        backContext.drawImage(monthDigitB, 0, 10);
    };
    monthDigitB.src = `images/calendar/months/m${month}b.png`;

    const dateDigit1F = new Image();
    dateDigit1F.onload = function() {
        foreContext.drawImage(dateDigit1F, 83, 14);
    };
    dateDigit1F.src = `images/calendar/dates/${dateDigit1}f.png`;

    const dateDigit1M = new Image();
    dateDigit1M.onload = function() {
        midContext.drawImage(dateDigit1M, 65, 5);
    };
    dateDigit1M.src = `images/calendar/dates/${dateDigit1}m.png`;

    const dateDigit1B = new Image();
    dateDigit1B.onload = function() {
        backContext.drawImage(dateDigit1B, 55, 0);
    };
    dateDigit1B.src = `images/calendar/dates/${dateDigit1}b.png`;

    if (date >= 10) {
        const dateDigit2F = new Image();
        dateDigit2F.onload = function() {
            foreContext.drawImage(dateDigit2F, 128, 14);
        };
        dateDigit2F.src = `images/calendar/dates/${dateDigit2}f.png`;
        
        const dateDigit2M = new Image();
        dateDigit2M.onload = function() {
            midContext.drawImage(dateDigit2M, 115, 5);
        };
        dateDigit2M.src = `images/calendar/dates/${dateDigit2}m.png`;
        
        const dateDigit2B = new Image();
        dateDigit2B.onload = function() {
            backContext.drawImage(dateDigit2B, 106, 0);
        };
        dateDigit2B.src = `images/calendar/dates/${dateDigit2}b.png`;
    }
}

// TODO: implement checking for date changes