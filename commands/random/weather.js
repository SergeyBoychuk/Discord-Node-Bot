const commando = require('discord.js-commando');
const API_KEY = 'c209a831342bd685d4de92478ca23258';
const http = require('http');







class Weather extends commando.Command {
    constructor(client, weatherTemp) {
        
        super(client, {
            name: 'weather',
            group: 'random',
            memberName: 'weather',
            description: 'Find the weather'
            
        });
        
    }
    async run(message, args) {
        
        http.get(`http://api.openweathermap.org/data/2.5/weather?q=${args}&APPID=${API_KEY}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            })

            res.on('end', () => {
                try {
                    let weather = JSON.parse(data);
                    console.log(weather);
                    let kelvinTemperature = weather.main.temp;
                    let farenheightTemperature = (((kelvinTemperature-273.15)*1.8)+32).toFixed(2);
                    console.log(farenheightTemperature);
                    message.reply(`The Weather in ${args} is ${farenheightTemperature}℉`);
                } catch(e) {
                    message.reply("Bro, that city doesn't exist")
                }
                
            });
            
        });
    }
}

module.exports = Weather;


