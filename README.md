# Beneath the Mask...
Website: https://tmpringle.github.io/beneath-the-mask/

A simple website that plays a version of "Beneath the Mask" from Persona 5, depending on the weather and day conditions in your area.
Inspired largely by the tane.us Animal Crossing music website by Brian Lee (https://tane.us/ac/), and utilizes the Tomorrow.io Weather API (https://www.tomorrow.io/weather-api/).

There are 4 versions of Beneath the Mask that the website can choose, based on conditions that mirror when these versions play in the actual game:
- Beneath the Mask -instrumental version- ~ Day theme (6:00 - 17:59)
- Beneath the Mask ~ Night theme (18:00 - 5:59)
- Beneath the Mask -rain, instrumental version- ~ Rainy/snowy day theme
- Beneath the Mask -rain- ~ Rainy/snowy night theme

The website defaults to the sunny/cloudy version of the song (based on the user's time). Once a user clicks on the sun icon and allows their location to be accessed, the website will then change the song based on the weather conditions in their area. After the user shares their location, the website checks for weather and day/night changes every 5 minutes. If a user blocks their location, however, the website won't check for the weather.
