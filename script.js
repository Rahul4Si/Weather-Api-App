 const Api_key= "appid=0a6d9e50dd843d83d021a9c2576a126e";
 const base_url="https://api.openweathermap.org/data/2.5/weather?q=";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let search_input=document.getElementById('input-box');

search_input.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        get_weather_details(search_input.value);
    }
});

async function get_weather_details(city){
     let url=`${base_url}${city}&${Api_key}` ;
     console.log(url);
     let data= await fetch(url).then(res=>{return res.json();});
     console.log(data.sys.country);
     
   document.getElementById('city').innerHTML=`${city},${data.sys.country}`;
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
    console.log(temp);
    document.getElementById('temp-span').innerHTML=`<span id="temp-span">${temp}</span>`;
}