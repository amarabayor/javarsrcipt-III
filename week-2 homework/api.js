window.onload = main;
let configuration = {
weatherUrl: "https://api.weatherbit.io/v2.0/current",
 apikey: "1f6f5e02926b43ed903ea698591b8e3d",
 weatherIconUrl:"https://www.weatherbit.io/static/img/icons/"

}
const cities = [];
cities.push({
    name: "Barcelona",
    latitude: 41.41,
    longitude: 2.19,
});
cities.push({
    name: "Sevilla",
    latitude: 41.41,
    longitude: 2.19,
});
cities.push({
    name: "Madrid",
    latitude: 41.41,
    longitude: 2.19,
});
cities.push({
  name: "Lleida",
  latitude: 41.41,
  longitude: 2.19,
});


function  main(){
    let weatherData = getweatherdata(cities);
   
}

function getweatherdata(data){
    for (const citi of data){
        fetch(configuration.weatherUrl+"?key="+configuration.apikey+"&city="+citi.name)
        .then(resp=> resp.json())
        .then(resp=>{
            render(resp.data)
        })
        .catch(error=>{
            console.error("Error:", error);

        })
    }

}
function render(data){
    for (const city of data) {
        console.log(city)
        let cardInnerContent =`
        <h4 class="text-center">${city.city_name}</h4>
         <div class="card-body text-center">
         <img src="${configuration.weatherIconUrl}${city.weather.icon}.png">
          <h5 class="card-title">${city.temp} C°</h5>
          <h6 class="num">${city.weather.description}</h6>
          <h6 class="figure">${city.ob_time}</h6>
          </div>`;
      let card = createweathercard(cardInnerContent)
        document.querySelector(".weather-card", "text-center").appendChild(card); 
        
        
    }
   
}


function createweathercard(innercontent){
    card =document.createElement("div");
    card.classList.add("card", "mx-4");
    card.innerHTML = innercontent;
    return card;
};

let Button =document.querySelector(".button")
let searchinput =document.querySelector(".form-control");
let textForSearch = searchinput.value;
Button.addEventListener('click', (event)=>{
  event.preventDefault();
  filterCity();


  })

  function filterCity() {
    let searchResault = cities.filter((item) => {
      if (item.name.toLowerCase().includes(searchinput.value)) {
        return true;
      }
    });
    let cardBlock=document.querySelector(".weather-card")
    cardBlock.innerHTML = '';
    getweatherdata(searchResault);

}

