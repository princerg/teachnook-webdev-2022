const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  weatherForecast = wrapper.querySelector(".weather-forecast"),
  fIcon1 = weatherForecast.querySelector(".img1"),
  fIcon2 = weatherForecast.querySelector(".img2"),
  fIcon3 = weatherForecast.querySelector(".img3"),
  fIcon4 = weatherForecast.querySelector(".img4"),
  fIcon5 = weatherForecast.querySelector(".img5"),
  fIcon6 = weatherForecast.querySelector(".img6"),
  fIcon7 = weatherForecast.querySelector(".img7"),
  arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", (e) => {
  // if user pressed enter btn and input value is not empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=8&appid=72fb8cbeac14cd9a5dc8eeb510df9f3f`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
  api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=8&appid=72fb8cbeac14cd9a5dc8eeb510df9f3f`;
  fetchData();
}

function onError(error) {
  // if any error occur while getting user location then we'll show it in infoText
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  // getting api response and returning it with parsing into js obj and in another
  // then function calling weatherDetails function with passing api result as an argument
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    // if user entered city name isn't valid
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    console.log(info)
    //getting required properties value from the whole weather information
    const city = info.city.name;
    const country = info.city.country;
    const { description, id } = info.list[0].weather[0];
    const { temp, humidity } = info.list[0].main;
    const { speed } = info.list[0].wind;
    const unixTimestamp = info.list[0].dt;
    const dateObject = new Date(unixTimestamp * 1000);
    const date = dateObject.toLocaleString();
    const day = dateObject.toLocaleString("default", { weekday: "long" })
    //weekdays for forecast
    const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const timestamp = info.list[1].dt;
    const dateObj = new Date(timestamp * 1000);
    const dayNumber = dateObj.getDay();
    const day1 = Weekdays[dayNumber%7];
    const day2 = Weekdays[(dayNumber + 1%7)];
    const day3 = Weekdays[(dayNumber + 2)%7];
    const day4 = Weekdays[(dayNumber + 3)%7];
    const day5 = Weekdays[(dayNumber + 4)%7];
    const day6 = Weekdays[(dayNumber + 5)%7];
    const day7 = Weekdays[(dayNumber + 6)%7];
    //getting required properties for weather forecast
    const min1 = info.list[1].main.feels_like;
    const min2 = info.list[2].main.feels_like;
    const min3 = info.list[3].main.feels_like;
    const min4 = info.list[4].main.feels_like;
    const min5 = info.list[5].main.feels_like;
    const min6 = info.list[6].main.feels_like;
    const min7 = info.list[7].main.feels_like;

    //finding day

    // using custom weather icon according to the id which api gives to us
    if (id == 800) {
      wIcon.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "icons/rain.svg";
    }

    for (i = 1; i < 8; i++) {
      var itr = info.list[i].weather[0].id;
      if (itr == 800) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      } else if (itr >= 200 && itr <= 232) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      } else if (itr >= 600 && itr <= 622) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      } else if (itr >= 701 && itr <= 781) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      } else if (itr >= 801 && itr <= 804) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      } else if ((itr >= 500 && itr <= 531) || (itr >= 300 && itr <= 321)) {
        fIcon1.src = "icons/clear.svg";
        fIcon2.src = "icons/clear.svg";
        fIcon3.src = "icons/clear.svg";
        fIcon4.src = "icons/clear.svg";
        fIcon5.src = "icons/clear.svg";
        fIcon6.src = "icons/clear.svg";
        fIcon7.src = "icons/clear.svg";
      }
    }
    //passing a particular weather info to a particular element
    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText = speed;
    weatherPart.querySelector(".date").innerText = date;
    weatherPart.querySelector(".day").innerText = day;
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    //weather forecast

    weatherForecast.querySelector(".weather-forecast .min-1").innerText = min1;
    weatherForecast.querySelector(".weather-forecast .min-2").innerText = min2;
    weatherForecast.querySelector(".weather-forecast .min-3").innerText = min3;
    weatherForecast.querySelector(".weather-forecast .min-4").innerText = min4;
    weatherForecast.querySelector(".weather-forecast .min-5").innerText = min5;
    weatherForecast.querySelector(".weather-forecast .min-6").innerText = min6;
    weatherForecast.querySelector(".weather-forecast .min-7").innerText = min7;

    weatherForecast.querySelector(".weather-forecast .day1").innerText = day1;
    weatherForecast.querySelector(".weather-forecast .day2").innerText = day2;
    weatherForecast.querySelector(".weather-forecast .day3").innerText = day3;
    weatherForecast.querySelector(".weather-forecast .day4").innerText = day4;
    weatherForecast.querySelector(".weather-forecast .day5").innerText = day5;
    weatherForecast.querySelector(".weather-forecast .day6").innerText = day6;
    weatherForecast.querySelector(".weather-forecast .day7").innerText = day7;

    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
