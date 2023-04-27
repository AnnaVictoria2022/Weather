gsap.to('#input', {opacity:1, delay:0.5, duration:1})

const apiGeolocation = {
    endpoint: 'https://api.ipgeolocation.io/ipgeo',
    key: 'cf82f371b0574fb190795fbdcbed893c'
}

const api = {
    endpoint: 'https://api.openweathermap.org/data/2.5/',
    key:'69762e91f4a0b7784c13c979fd648c16'
}

async function getLocation(){
    const location = await fetch(`${apiGeolocation.endpoint}?apiKey=${apiGeolocation.key}`);
    const resultLocation = await location.json();
    getInfo(resultLocation.city);
}
getLocation();

const input = document.querySelector('#input');
input.addEventListener('keypress', enter);

function enter(e){
    if (e.keyCode === 13){
        getInfo(input.value);
        input.value = "";
    }
}
async function getInfo(data){
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=imperial&appid=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result){
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)} <span>°F </span>`;


    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML =" Feels like: " + `${Math.round(result.main.feels_like)} <span>°F </span>`;

    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].main}`;
    displayBackground(result)

    let variation = document.querySelector('#variation');
    variation.innerHTML = "Min:" + " " + `${Math.round(result.main.temp_min)} <span>°F  </span>` + "Max:" + " " + `${Math.round(result.main.temp_max)}<span>°F </span>`;
}

function getOurDate() {
    const myDate = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[myDate.getDay()];

    let todayDate = myDate.getDate();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[myDate.getMonth()];

    let year = myDate.getFullYear();

    let showDate = document.querySelector('#date');
    showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
}

//Background
function displayBackground(result){
    let conditions = `${result.weather[0].main}`;
    let container = document.querySelector("#container");
    
    if (conditions === 'Clouds'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1527708676371-14f9a9503c95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80')";
    } 
    else if (conditions === 'Clear'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1517574150334-6d3578f2cc5a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387')";
    }
    else if (conditions === 'Sunny'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1597571063304-81f081944ee8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436')";
    }
    else if (conditions === 'Rain'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435')";
    }
    else if (conditions === 'Thunderstorm'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1511289081-d06dda19034d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=392&q=80')";
    }
    else if (conditions === 'Snow'){
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1520491417561-88c817c63414?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388')";
    }
    else {
        container.style.backgroundImage = "url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887')";
    }
}





