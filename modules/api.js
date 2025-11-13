const Base_Url='https://api.openweathermap.org/data/2.5/weather';

const Api_key="04d7f2e9653cfa8e0bd75aed5df1bf28";

export async function getWeather(city) {
    
    try{
        const response= await fetch(`${Base_Url}?q=${city}&appid=${Api_key}&units=metric`)
        if(!response.ok){
            throw new Error('City not found')
        }
        const data= await response.json();
        return data;

    }catch(error){
        throw error;
    }
}