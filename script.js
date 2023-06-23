document.addEventListener('DOMContentLoaded', function() {
    const cityNameElement = document.getElementById('city-name');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const temperatureElement = document.getElementById('temperature');
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const cityImageContainer = document.getElementById('city-image-container');
    const apiKey = '8a717fc201d9450fbfb145357232306';
  
    const fetchWeatherData = async (city) => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        const weatherData = await response.json();
  
        const weatherDescription = weatherData.current.condition.text;
        const temperature = `${weatherData.current.temp_c}°C`;
  
        cityNameElement.textContent = city.charAt(0).toUpperCase() + city.slice(1);
        weatherDescriptionElement.textContent = weatherDescription;
        temperatureElement.textContent = temperature;
  
        const imageUrl = `https://source.unsplash.com/featured/?${city}`;
        cityImageContainer.style.backgroundImage = `url(${imageUrl})`;
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSearch = () => {
      const city = cityInput.value;
      if (city.trim() !== '') {
        fetchWeatherData(city);
      }
    };
  
    const searchWeather = () => {
      const cityName = cityInput.value.trim();
      if (cityName !== '') {
        fetchWeatherData(cityName);
      }
    };
  
    // Kullanıcının konumunu al ve hava durumunu getir
    const fetchWeatherByLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
            .then(response => response.json())
            .then(data => {
              const city = data.location.name;
              fetchWeatherData(city);
            })
            .catch(error => {
              console.error('Hava durumu verisi alınırken bir hata oluştu:', error);
            });
        }, error => {
          console.error('Konum bilgisine erişilemedi:', error);
        });
      } else {
        console.error('Tarayıcınız konum bilgisini desteklemiyor.');
      }
    };
  
    // Enter tuşuna basıldığında arama yapılmasını sağla
    cityInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchWeather();
      }
    });
  
    searchButton.addEventListener('click', handleSearch);
  
    // Kullanıcının konumunu varsayılan olarak göster
    fetchWeatherByLocation();
  });
  