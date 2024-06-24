const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weathertDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const apiKey = "aa28f5d0826c6481341401426f86f8ae";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weathertDetails.classList.remove("active");
        notFound.classList.add("active");
        return;
      }
      container.style.height = "555px";
      weatherBox.classList.add("active");
      weathertDetails.classList.add("active");
      notFound.classList.remove("active");

      localStorage.setItem("temperature", json.main.temp);
      localStorage.setItem("humidity", json.main.humidity);
      localStorage.setItem("speed", json.wind.speed);
      localStorage.setItem("description", json.weather[0].description);

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temrature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/cloud.png";
      }
      const humid = localStorage.getItem("humidity");
      const temp = localStorage.getItem("temperature");
      const speed = localStorage.getItem("speed");
      const desc = localStorage.getItem("description");
      temperature.innerHTML = `${temp}<span>&degC</span>`;
      description.innerHTML = `${desc}`;
      humidity.innerHTML = `${humid}%`;
      wind.innerHTML = `${speed}Km/h`;
        localStorage.clear();
    });
});
