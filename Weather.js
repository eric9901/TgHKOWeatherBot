var TelegramBot = require('node-telegram-bot-api');
var token='1250642246:AAEcHZo4fZinIowfm_-q-ECm_jbUvdGF59A';
var bot = new TelegramBot(token, {polling:true});
var request = require('request');
bot.onText(/\/movie(.+)/,function(msg,match){
    var movie =match[1];
    var chatId=msg.chat.id;
    request(`http://www.omdbapi.com/?apikey=67b859ad&t=${movie}`,function(error,response,body){
     if(!error && response.statusCode ==200){
         bot.sendMessage(chatId, '_Looking for _' + movie+ '...',{parse_mode:'Markdown'})
         .then(function(msg){
            var res=JSON.parse(body);
            bot.sendMessage(chatId, );
            bot.sendPhoto(chatId, res.Poster,{caption: 'Result:\nTitle ' + res.Title +'\nYear: '+res.Year+'\nRaterd: '+res.Rated+'\nReleased: '+res.Released })
         })
     }
    });
});

bot.onText(/\/echo(.+)/,function(msg,match){
    var chatId = msg.chat.id;
    var echo = match[1];
    bot.sendMessage(chatId,echo);
});
// now weather report
bot.onText(/\/weare(.+)/,function(msg,match){
    var chatId = msg.chat.id;
    var wCode = match[1];
    request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊而家天氣_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
                bot.sendMessage(chatId,'偽毒話你知而家天氣係'+res.updateTime);
            })
            }
        });
    bot.sendMessage(chatId,echo);
});
//day weather prediction 
bot.onText(/\/weaPre(.+)/,function(msg,match){
    var chatId=msg.chat.id;
    var weather =match[1];
    let wCode='c';
    if (weather===' a')   {
        wCode='flw';
        request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=${wCode}&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊今日天氣預報_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
                bot.sendMessage(chatId,'偽毒話你知今日天氣預報係'+res.generalSituation);
            })
            }
        });
    }
    else  if(weather===' b')     {
        wCode ='fnd';
        request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=${wCode}&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊九日天氣預報_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
            
                //var tem=JSON.parse(res);
               
                bot.sendMessage(chatId,'偽毒話你知黎緊九日天氣預報係'+res["weatherForecast"][1]["forecastWeather"]);
            })
            }
        });
    }
    
   


});