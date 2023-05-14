// a potential image loader i could use:
// https://thinkpixellab.com/pxloader/

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

function drawCalendar(month, date, dayOfWeek) {
    // the elements for each layer canvas
    const backCanvas = document.getElementById("background-canvas");
    const midCanvas = document.getElementById("middle-canvas");
    const foreCanvas = document.getElementById("foreground-canvas");

    // the first and second digits of the date of the month (1-31)
    let dateDigit1;
    let dateDigit2;

    // sets first and second digits of the current date of the month
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

/* i'll probably also need custom rendering for each month and digit */

    // draws the month sprites
    const monthDigitF = displayMonthLayer(month, foreCanvas, "f", 19, 24);
    const monthDigitM = displayMonthLayer(month, midCanvas, "m", 9, 15);
    const monthDigitB = displayMonthLayer(month, backCanvas, "b", 0, 10);

    // draws the first date digit sprites
    const dateDigit1F = displayFirstDigitLayer(dateDigit1, foreCanvas, "f", 83, 14);
    const dateDigit1M = displayFirstDigitLayer(dateDigit1, midCanvas, "m", 65, 5);
    const dateDigit1B = displayFirstDigitLayer(dateDigit1, backCanvas, "b", 55, 0);

    // draws the second date digit sprites
    if (date >= 10) {
        const dateDigit2F = displaySecondDigitLayer(dateDigit2, foreCanvas, "f", 128, 14);
        const dateDigit2M = displaySecondDigitLayer(dateDigit2, midCanvas, "m", 115, 5);
        const dateDigit2B = displaySecondDigitLayer(dateDigit2, backCanvas, "b", 106, 0);
    }
}

// function that actual draws a layer of the month sprite onto the canvas
// and returns an Image object representing the sprite
//
// month - number of the current month (1-12)
// canvas - the canvas layer we're drawing onto
// layer - represents which canvas layer we're drawing on to (f, m, b)
// px - the pixel x position of the top-left corner of the sprite on the canvas
// py - the pixel y position of the top-left corner of the sprite on the canvas
function displayMonthLayer(month, canvas, layer, px, py) {
    let context = canvas.getContext("2d");

    var spriteImg = new Image();
    spriteImg.onload = function() {
        context.drawImage(spriteImg, px, py);
    }
    spriteImg.src = `images/calendar/months/m${month}${layer}.png`

    return spriteImg;
}

// function that actual draws a layer of the sprite for the first date digit
// onto the canvas and returns an Image object representing the sprite
//
// dateDigit - first digit of the date (1-9)
// canvas - the canvas layer we're drawing onto
// layer - represents which canvas layer we're drawing on to (f, m, b)
// px - the pixel x position of the top-left corner of the sprite on the canvas
// py - the pixel y position of the top-left corner of the sprite on the canvas
function displayFirstDigitLayer(dateDigit, canvas, layer, px, py) {
    let context = canvas.getContext("2d");

    var spriteImg = new Image();
    spriteImg.onload = function() {
        context.drawImage(spriteImg, px, py);
    }
    spriteImg.src = `images/calendar/dates/${dateDigit}${layer}.png`

    return spriteImg;
}

// function that actual draws a layer of the sprite for the second date digit
// onto the canvas and returns an Image object representing the sprite
// 
// for now, this has the same functionality as the display function for the
// first date digit. the first and second digits of the calendar are displayed
// differently in Persona 5, though, so the functionality will be slightly
// differently in the end product.
//
// dateDigit - second digit of the date (0-9)
// canvas - the canvas layer we're drawing onto
// layer - represents which canvas layer we're drawing on to (f, m, b)
// px - the pixel x position of the top-left corner of the sprite on the canvas
// py - the pixel y position of the top-left corner of the sprite on the canvas
function displaySecondDigitLayer(dateDigit, canvas, layer, px, py) {
    let context = canvas.getContext("2d");

    var spriteImg = new Image();
    spriteImg.onload = function() {
        context.drawImage(spriteImg, px, py);
    }
    spriteImg.src = `images/calendar/dates/${dateDigit}${layer}.png`

    return spriteImg;
}


function displayCalendar() {
    let month = getCurrentMonth();
    let date = getCurrentDate();
    let dayOfWeek = getCurrentDay();

    drawCalendar(month, date, dayOfWeek);
}

// TODO: implement checking for date changes