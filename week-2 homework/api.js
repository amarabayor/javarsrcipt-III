window.onload = main;

const config = {
  weatherUrl: 'https://api.weatherbit.io/v2.0/current',
  wetherApiKey: '758021d5964c4c0a824ec799c9585cc3',
  weatherIconUrl: 'https://www.weatherbit.io/static/img/icons/',
  mapboxApiKey: 'pk.eyJ1IjoibmFtbGkiLCJhIjoiY2tnM2k3YW94MGF3dzJxcW5uNHl5bjRkbyJ9.QYJaY-c7BegGsbWSG-Zaeg'
};

const cities = [];
cities.push({
  name: "Barcelona",
  latitude: 41.41,
  longitude: 2.19,
});
cities.push({
  name: "Sevilla",
  latitude: 42.41,
  longitude: 3.19,
});
cities.push({
  name: "Madrid",
  latitude: 41.21,
  longitude: 2.80,
});

let searchCityBtn = document.getElementById('btnSearch');
let searchInput = document.getElementById('inputSearch');
let cardBlock = document.querySelector('.weather-cards');
let map;



function main() {
  let droMap = drowMap();
  let wetherData = getWeatheData(cities);
  let search = searchWeather();
}

function drowMap() {
  
  mapboxgl.accessToken = config.mapboxApiKey;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.550343, 41.665957],
    zoom: 4,
  });
  map.scrollZoom.disable();


}

function searchWeather() {
  searchCityBtn.addEventListener('click', filterCity);
}

function filterCityClick(filter) {
  filter.preventDefault();
  filterCity();
};

function filterCity() {
  let searchResault = cities.filter((item) => {
    if (item.name.toLowerCase().includes(searchInput.value)) {
      return true;
    }
  });
  
  cardBlock.innerHTML = '';
  getWeatheData(searchResault);
};

function getWeatheData(data) {
  for (const citi of data) {
    fetch(config.weatherUrl + '?key=' + config.wetherApiKey + '&city=' + citi.name)
      .then(resp => resp.json())
      .then(resp => {
        render(resp.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
};

function render(data) {
  for (const city of data) {
    let cardInnerContent = `
      <h1 class='text-center'>${city.city_name}</h1>
      <div class="card-body text-center">
        <img src='${config.weatherIconUrl}${city.weather.icon}.png'>
        <h2 class="card-title">${city.temp} С°</h2>
        <h3 class='h3'>${city.weather.description}</h3>
        <h4 class='h4'>${city.ob_time}</h4>
      </div>
    `;
    let card = creatWetherCard(cardInnerContent);
    cardBlock.appendChild(card);
console.log(city.lon + "-" + city.lat);
    var markers = new mapboxgl.Marker().setLngLat([city.lon, city.lat]).addTo(map);
  }
    var bounds = new mapboxgl.LngLatBounds();

  markers.features.forEach(function(feature) {
      bounds.extend(feature.geometry.coordinates);
  });

   map.fitBounds(bounds);
};

function creatWetherCard(innerContent) {
  card = document.createElement('div');
  card.classList.add("card", "mx-2");
  card.innerHTML = innerContent;
  return card;
};

