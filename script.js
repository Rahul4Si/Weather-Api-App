 const Api_key= "appid=0a6d9e50dd843d83d021a9c2576a126e";
 const base_url="https://api.openweathermap.org/data/2.5/weather?q=";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let search_input=document.getElementById('input-box');

search_input.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        document.getElementById('weather-body').style.display="block";
        get_weather_details(search_input.value);
    }
});

async function get_weather_details(city){
     let url=`${base_url}${city}&${Api_key}` ;
     console.log(url);
     let data= await fetch(url).then(res=>{return res.json();});
     
   document.getElementById('city').innerHTML=`${city} , ${data.sys.country}`;
   get_date(data);
}

function get_date(data){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();

document.getElementById("date").innerText = d.getDate()+" "+ months[d.getMonth()]+" ("+days[d.getDay()]+"),"+d.getFullYear();
get_temp(data);
}

function get_temp(data){
    console.log(data);
    let temp=Math.floor(`${data.main.temp}`-273.15);
    document.getElementById('temp-span').innerHTML=`<span id="temp-span">${temp}&deg;C</span>`;
    minmax(data);
}

function minmax(data){
    let temp_max=Math.floor(`${data.main.temp_max}`-273.15);
    let temp_min=Math.floor(`${data.main.temp_min}`-273.15);
    document.getElementById('min-max').innerHTML=` <div class="min-max" id="min-max">${temp_min}&deg;C(min) / ${temp_max}&deg;C(max)</div>`;
    let weather_type=data.weather[0].main;
    document.getElementById('weather').innerHTML=` <div class="weather" id="weather">${weather_type}</div>`;
    
    console.log(weather_type);
    if(weather_type=="Haze" || weather_type=="Clouds"){
        document.body.style.backgroundImage="url('cloudy.jpeg')";
    }
    else if(weather_type=="Rain"){
        document.body.style.backgroundImage="url('rainy.jpeg')";
    }
    else if(weather_type=="Clear"){
        document.body.style.backgroundImage="url('clear.jpeg')";
    }
    else if(weather_type=="Snow"){
        document.body.style.backgroundImage="url('snowy.jpeg')";
    }
    else if(weather_type=="Thunderstorm"){
        document.body.style.backgroundImage="url('thunderstorm.jpeg')";
    }
}
