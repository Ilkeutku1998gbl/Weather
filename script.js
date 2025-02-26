const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'e5c76581143d520798b13b0a0b88c5a1';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (image) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'Logo/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'Logo/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'Logo/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'Logo/cloud.png';
                        break;
                    case 'Haze':
                        image.src = 'Logo/haze.png';
                        break;
                    default:
                        image.src = '';
                }
            } else {
                console.error('Image element not found');
            }

            temperature.innerHTML = `${Math.round(json.main.temp - 273.15)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Hata mesajı göstermek için burada bir işlem ekleyebilirsin
        });
});
