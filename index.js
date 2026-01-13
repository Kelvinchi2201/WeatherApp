const API_KEY="fc95922b5cfc47ee06795a31a1d121db";



const getWeather = async (city) => {
   const apiKey = API_KEY;
   const lang = 'es';
   const units = 'metric';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`; 
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
            if (respuesta.status === 401) throw new Error("API Key inválida o aún no activa");
            if (respuesta.status === 404) throw new Error("Ciudad no encontrada");
            throw new Error("Error en la petición");
        }
    const datos = await respuesta.json();
    
    const climaSimplificado = {
            nombre: datos.name,
            pais: datos.sys.country,
            temp: Math.round(datos.main.temp),
            sensacion: Math.round(datos.main.feels_like),
            humedad: datos.main.humidity,
            descripcion: datos.weather[0].description,
            icono: `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`,
            viento: datos.wind.speed
        };
        console.log("Datos recibidos:", climaSimplificado);
        return climaSimplificado;
};

document.querySelector('#searchBtn').addEventListener('click', async () => {
    const cityInput = document.querySelector('#cityInput');
    const city = cityInput.value;

    if (!city) {
        alert("Por favor, escribe una ciudad");
        return;
    }

    const info = await getWeather(city);

    if (info) {
        
        const container = document.querySelector('#weather-container');
        const cityName = document.querySelector('#cityName');
        const temperature = document.querySelector('#temperature');
        const description = document.querySelector('#description');
        const humidity = document.querySelector('#humidity');
        const wind = document.querySelector('#wind');
        const weatherIcon = document.querySelector('#weatherIcon');

    
        cityName.textContent = `${info.nombre}, ${info.pais}`;
        temperature.textContent = info.temp;
        description.textContent = info.descripcion;
        humidity.textContent = info.humedad;
        wind.textContent = info.viento;
        weatherIcon.src = info.icono;

        
        container.classList.remove('hidden');
    }
});



