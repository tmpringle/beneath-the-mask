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

/* discoveries:
   - the positions for the date digits depend entirely on the DATE ITSELF (1-31).
     they stay constant (based on date) for each month
   - the positions and orientations for the month digit depend entirely on whether
     the date has one digit or two (e.g. if the date < 10 or if it's >=10)
   - the rotation for a specific month digit (say, 1) is the same whether or not
     the date has one or two digits, though
   - when translating an image that's been scaled, make sure to account for the
     scaling amount for the pixel positions
*/

function drawCalendar(month, date, dayOfWeek) {
    // JUST FOR TESTING!!!
    month = 12;

    // draws the month sprites
//    displayMonthLayer(month, foreCanvas, "f");
//    displayMonthLayer(month, midCanvas, "m");
    displayMonthBackLayer(month, date);

    // draws the date sprites
//    displayDateLayer(date, foreCanvas, "f");
//    displayDateLayer(date, midCanvas, "m");
//    displayDateLayer(date, backCanvas, "b");
}

// function that actual draws the background layer of the month sprite
// onto the canvas. date is used for position calculations
function displayMonthBackLayer(month, date) {
    let context = document.getElementById("background-canvas").getContext("2d");

    // sets up the sprite for the month's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/months/m${month}b.png`;

    // flag that affects the positioning of the month
    // (month sprite is shifted 20 pixels to the left if date has two digits)
    let doesDateHaveTwoDigits;
    if (date >= 10) {
        doesDateHaveTwoDigits = true;
    } else {
        doesDateHaveTwoDigits = false;
    }

    // draws the sprite based on the month
    spriteImg.onload = function() {
        context.save();
        context.scale(1.5, 1.5);

        switch(month) {
            case 1:  // january
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 21, 21);
                } else {
                    context.drawImage(spriteImg, 41, 21);
                }
                break;
            case 2:  // february
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 16, 19);
                } else {
                    context.drawImage(spriteImg, 36, 19);
                }
                break;
            case 3:  // march
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 15, 22);
                } else {
                    context.drawImage(spriteImg, 35, 22);
                }
                break;
            case 4:  // april
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 17, 21);
                } else {
                    context.drawImage(spriteImg, 37, 21);
                }
                break;
            case 5:  // may
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 19, 22);
                } else {
                    context.drawImage(spriteImg, 39, 22);
                }
                break;
            case 6:  // june
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 28, 22);
                } else {
                    context.drawImage(spriteImg, 48, 22);
                }
                break;
            case 7:  // july
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 27, 23);
                } else {
                    context.drawImage(spriteImg, 47, 23);
                }
                break;
            case 8:  // august
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 19, 21);
                } else {
                    context.drawImage(spriteImg, 39, 21);
                }
                break;
            case 9:  // september
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 17, 22);
                } else {
                    context.drawImage(spriteImg, 37, 22);
                }
                break;
            case 10: // october
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 4, 15);
                } else {
                    context.drawImage(spriteImg, 24, 15);
                }
                break;
            case 11: // november
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 10, 19);
                } else {
                    context.drawImage(spriteImg, 30, 19);
                }
                break;
            case 12: // december
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 4, 12);
                } else {
                    context.drawImage(spriteImg, 24, 12);
                }
                break;
        }

        context.restore();
    }
}

// function that actual draws a layer of the sprite for the first date digit
// onto the canvas and returns an Image object representing the sprite
//
// date - date of the month (1-31)
// canvas - the canvas layer we're drawing onto
// layer - represents which canvas layer we're drawing on to (f, m, b)
// px - the pixel x position of the top-left corner of the sprite on the canvas
// py - the pixel y position of the top-left corner of the sprite on the canvas
function displayDateLayer(date, canvas, layer, px, py) {
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