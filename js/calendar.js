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
   - the positions for the date digits they stay constant (based on date) for each month.
        - dates 1-9 have unique positions and rotations
        - for two digit dates, the first and second digits are always in the same
          position/rotation (respective of number)
   - the positions and orientations for the month digit depend entirely on whether
     the date has one digit or two (e.g. if the date < 10 or if it's >=10)
   - the rotation for a specific month digit (say, 1) is the same whether or not
     the date has one or two digits, though
   - when translating an image that's been scaled, make sure to account for the
     scaling amount for the pixel positions
*/

function drawCalendar(month, date, dayOfWeek) {
    resetCanvasses();

    // JUST FOR TESTING!!!
    date = 19;

    // draws the month sprites
    displayMonthFrontLayer(month, date);
    displayMonthMidLayer(month, date);
    displayMonthBackLayer(month, date);

    // draws the date sprites
//    displayDateFrontLayer(date);
    displayDateMidLayer(date);
    displayDateBackLayer(date);
}

// function that gets rid of all current drawings on the canvasses
function resetCanvasses() {
    document.getElementById("foreground-canvas").getContext("2d").reset();
    document.getElementById("middle-canvas").getContext("2d").reset();
    document.getElementById("background-canvas").getContext("2d").reset();
}

// function that actual draws the frontmost layer of the month sprite
// onto the canvas. date is used for position calculations
function displayMonthFrontLayer(month, date) {
    let context = document.getElementById("foreground-canvas").getContext("2d");

    // sets up the sprite for the month's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/months/m${month}f.png`;

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
                    context.drawImage(spriteImg, 44, 38);
                } else {
                    context.drawImage(spriteImg, 64, 38);
                }
                break;
            case 2:  // february
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 35, 35);
                } else {
                    context.drawImage(spriteImg, 55, 35);
                }
                break;
            case 3:  // march
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 33, 35);
                } else {
                    context.drawImage(spriteImg, 53, 35);
                }
                break;
            case 4:  // april
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 36, 36);
                } else {
                    context.drawImage(spriteImg, 56, 36);
                }
                break;
            case 5:  // may
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 38, 37);
                } else {
                    context.drawImage(spriteImg, 58, 37);
                }
                break;
            case 6:  // june
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 48, 36);
                } else {
                    context.drawImage(spriteImg, 68, 36);
                }
                break;
            case 7:  // july
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 47, 40);
                } else {
                    context.drawImage(spriteImg, 67, 40);
                }
                break;
            case 8:  // august
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 44, 35);
                } else {
                    context.drawImage(spriteImg, 64, 35);
                }
                break;
            case 9:  // september
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 44, 36);
                } else {
                    context.drawImage(spriteImg, 64, 36);
                }
                break;
            case 10: // october
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 22, 33);
                } else {
                    context.drawImage(spriteImg, 42, 33);
                }
                break;
            case 11: // november
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 27, 33);
                } else {
                    context.drawImage(spriteImg, 47, 33);
                }
                break;
            case 12: // december
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 24, 33);
                } else {
                    context.drawImage(spriteImg, 44, 33);
                }
                break;
        }

        context.restore();
    }
}

// function that actual draws the middle layer of the month sprite
// onto the canvas. date is used for position calculations
function displayMonthMidLayer(month, date) {
    let context = document.getElementById("middle-canvas").getContext("2d");

    // sets up the sprite for the month's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/months/m${month}m.png`;

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
                    context.drawImage(spriteImg, 29, 29);
                } else {
                    context.drawImage(spriteImg, 49, 29);
                }
                break;
            case 2:  // february
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 23, 24);
                } else {
                    context.drawImage(spriteImg, 43, 24);
                }
                break;
            case 3:  // march
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 23, 26);
                } else {
                    context.drawImage(spriteImg, 43, 26);
                }
                break;
            case 4:  // april
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 24, 26);
                } else {
                    context.drawImage(spriteImg, 44, 26);
                }
                break;
            case 5:  // may
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 27, 28);
                } else {
                    context.drawImage(spriteImg, 47, 28);
                }
                break;
            case 6:  // june
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 35, 27);
                } else {
                    context.drawImage(spriteImg, 55, 27);
                }
                break;
            case 7:  // july
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 36, 29);
                } else {
                    context.drawImage(spriteImg, 56, 29);
                }
                break;
            case 8:  // august
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 30, 26);
                } else {
                    context.drawImage(spriteImg, 50, 26);
                }
                break;
            case 9:  // september
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 29, 26);
                } else {
                    context.drawImage(spriteImg, 49, 26);
                }
                break;
            case 10: // october
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 8, 21);
                } else {
                    context.drawImage(spriteImg, 28, 21);
                }
                break;
            case 11: // november
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 18, 24);
                } else {
                    context.drawImage(spriteImg, 38, 24);
                }
                break;
            case 12: // december
                if (doesDateHaveTwoDigits) {
                    context.drawImage(spriteImg, 11, 19);
                } else {
                    context.drawImage(spriteImg, 31, 19);
                }
                break;
        }

        context.restore();
    }
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

function displayDateMidLayer(date) {
    if (date < 10) {
        displaySmallDateMidLayer(date);
    } else {
        let firstDigit = Math.floor(date / 10);
        let secondDigit = date % 10;

        displayFirstDigitDateMidLayer(firstDigit);
        displaySecondDigitDateMidLayer(secondDigit);
    }
}

function displaySmallDateMidLayer(date) {
    let context = document.getElementById("middle-canvas").getContext("2d");

    // sets up the sprite for the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${date}m.png`;

    // draws the sprite based on the date
    spriteImg.onload = function() {
        context.save();
        context.scale(1.5, 1.5);

        switch(date) {
            case 1:
                context.rotate((Math.PI / 180) * 6.1);
                context.drawImage(spriteImg, 117, -6);
                break;
            case 2:
                context.rotate((Math.PI / 180) * 5.9);
                context.drawImage(spriteImg, 115, 2);
                break;
            case 3:
                context.rotate((Math.PI / 180) * 7.4);
                context.drawImage(spriteImg, 115, -7);
                break;
            case 4:
                context.rotate((Math.PI / 180) * 6.5);
                context.drawImage(spriteImg, 109, -9);
                break;
            case 5:
                context.rotate((Math.PI / 180) * 6.5);
                context.drawImage(spriteImg, 112, -6);
                break;
            case 6:
                context.rotate((Math.PI / 180) * 6.9);
                context.drawImage(spriteImg, 112, -4);
                break;
            case 7:
                context.rotate((Math.PI / 180) * 6.9);
                context.drawImage(spriteImg, 111, -5);
                break;
            case 8:
                context.rotate((Math.PI / 180) * 7);
                context.drawImage(spriteImg, 112, -8);
                break;
            case 9:
                context.rotate((Math.PI / 180) * 6);
                context.drawImage(spriteImg, 113, -1);
                break;
        }

        context.restore();
    }
}

function displayFirstDigitDateMidLayer(firstDigit) {
    let context = document.getElementById("middle-canvas").getContext("2d");

    // sets up the sprite for the first digit of the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${firstDigit}m.png`;

    // draws the sprite based on the first digit of the date
    spriteImg.onload = function() {
        context.save();
        context.scale(1.5, 1.5);
        context.rotate((Math.PI / 180) * -3.5);

        switch(firstDigit) {
            case 1:
                context.drawImage(spriteImg, 80, 26);
                break;
            case 2:
                context.drawImage(spriteImg, 78, 33);
                break;
            case 3:
                context.drawImage(spriteImg, 79, 28);
                break;
        }

        context.restore();
    }
}

function displaySecondDigitDateMidLayer(secondDigit) {
    let context = document.getElementById("middle-canvas").getContext("2d");

    // sets up the sprite for the second digit of the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${secondDigit}m.png`;

    // draws the sprite based on the second digit of the date
    spriteImg.onload = function() {
        context.save();

        switch(secondDigit) {
            case 0:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 1.1);
                context.drawImage(spriteImg, 143, 8);
                break;
            // TODO: date 11 (at least) has a blank white spot. deal with it somehow?
            case 1:
                context.scale(1.45, 1.45);
                context.rotate((Math.PI / 180) * 2.9);
                context.drawImage(spriteImg, 144, 2);
                break;
            case 2:
                context.scale(1.4, 1.4);
                context.drawImage(spriteImg, 147, 18);
                break;
            case 3:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 1);
                context.drawImage(spriteImg, 148, 10);
                break;
            case 4:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.5);
                context.drawImage(spriteImg, 142, 2);
                break;
            case 5:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.8);
                context.drawImage(spriteImg, 146, 3);
                break;
            case 6:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2);
                context.drawImage(spriteImg, 145, 10);
                break;
            // TODO: date 17 (at least) aslso has a blank white spot
            case 7:
                context.scale(1.35, 1.35);
                context.rotate((Math.PI / 180) * 1.9);
                context.drawImage(spriteImg, 153, 8);
                break;
            case 8:
                context.scale(1.35, 1.35);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 153, 5);
                break;
            case 9:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 1.3);
                context.drawImage(spriteImg, 147, 12);
                break;
        }

        context.restore();
    }
}

function displayDateBackLayer(date) {
    if (date < 10) {
        displaySmallDateBackLayer(date);
    } else {
        let firstDigit = Math.floor(date / 10);
        let secondDigit = date % 10;

        displayFirstDigitDateBackLayer(firstDigit);
        displaySecondDigitDateBackLayer(secondDigit);
    }
}

function displaySmallDateBackLayer(date) {
    let context = document.getElementById("background-canvas").getContext("2d");

    // sets up the sprite for the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${date}b.png`;

    // draws the sprite based on the date
    spriteImg.onload = function() {
        context.save();
        context.scale(1.5, 1.5);

        switch(date) {
            case 1:
                context.rotate((Math.PI / 180) * 5.5);
                context.drawImage(spriteImg, 108, -11);
                break;
            case 2:
                context.rotate((Math.PI / 180) * 5.5);
                context.drawImage(spriteImg, 108, -3);
                break;
            case 3:
                context.rotate((Math.PI / 180) * 5.7);
                context.drawImage(spriteImg, 108, -8);
                break;
            case 4:
                context.rotate((Math.PI / 180) * 5.8);
                context.drawImage(spriteImg, 100, -10);
                break;
            case 5:
                context.rotate((Math.PI / 180) * 5.9);
                context.drawImage(spriteImg, 103, -7);
                break;
            case 6:
                context.rotate((Math.PI / 180) * 5.9);
                context.drawImage(spriteImg, 105, -5);
                break;
            case 7:
                context.rotate((Math.PI / 180) * 6.4);
                context.drawImage(spriteImg, 102, -8);
                break;
            case 8:
                context.rotate((Math.PI / 180) * 6.4);
                context.drawImage(spriteImg, 104, -11);
                break;
            case 9:
                context.rotate((Math.PI / 180) * 6.75);
                context.drawImage(spriteImg, 103, -11);
                break;
        }

        context.restore();
    }
}

function displayFirstDigitDateBackLayer(firstDigit) {
    let context = document.getElementById("background-canvas").getContext("2d");

    // sets up the sprite for the first digit of the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${firstDigit}b.png`;

    // draws the sprite based on the first digit of the date
    spriteImg.onload = function() {
        context.save();
        context.scale(1.5, 1.5);
        context.rotate((Math.PI / 180) * -3.5);

        switch(firstDigit) {
            case 1:
                context.drawImage(spriteImg, 72, 18);
                break;
            case 2:
                context.drawImage(spriteImg, 73, 27);
                break;
            case 3:
                context.drawImage(spriteImg, 72, 22);
                break;
        }

        context.restore();
    }
}

function displaySecondDigitDateBackLayer(secondDigit) {
    let context = document.getElementById("background-canvas").getContext("2d");

    // sets up the sprite for the second digit of the date's background
    var spriteImg = new Image();
    spriteImg.src = `images/calendar/dates/${secondDigit}b.png`;

    // draws the sprite based on the second digit of the date
    spriteImg.onload = function() {
        context.save();

        switch(secondDigit) {
            case 0:
                context.scale(1.5, 1.5);
                context.rotate((Math.PI / 180) * 0.1);
                context.drawImage(spriteImg, 125, 5);
                break;
            case 1:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.9);
                context.drawImage(spriteImg, 141, -5);
                break;
            case 2:
                context.scale(1.45, 1.45);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 135, 4);
                break;
            case 3:
                context.scale(1.45, 1.45);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 136, 0);
                break;
            case 4:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 133, -1);
                break;
            case 5:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 136, 1);
                break;
            case 6:
                context.scale(1.5, 1.5);
                context.drawImage(spriteImg, 125, 10);
                break;
            case 7:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 136, 1);
                break;
            case 8:
                context.scale(1.35, 1.35);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 144, -2);
                break;
            case 9:
                context.scale(1.4, 1.4);
                context.rotate((Math.PI / 180) * 2.3);
                context.drawImage(spriteImg, 137, -1);
                break;
        }

        context.restore();
    }
}

function displayCalendar() {
    let month = getCurrentMonth();
    let date = getCurrentDate();
    let dayOfWeek = getCurrentDay();

    drawCalendar(month, date, dayOfWeek);
}

// TODO: implement checking for date changes