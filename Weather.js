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

//message part
/*
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});*/
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
    var Command =match[1];
     
        request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊今日天氣預報_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
                if(Command ==' gd')// weather general information
                bot.sendMessage(chatId,'偽毒話你知今日天氣預報概況係'+res.generalSituation);
                else if(Command ==' fd')
                {
                    bot.sendMessage(chatId,'偽毒話你知今日天氣預測內容係'+res.forecastDesc
                    +'預測時段就係'+res.forecastPeriod);
                }
            })
            }
        });
});

bot.onText(/\/weaToPre(.+)/,function(msg,match){
    var chatId=msg.chat.id;
    var nextDay =match[1];
    wCode ='fnd';
    request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`,function(error,response,body){
        if(!error && response.statusCode ==200){
        bot.sendMessage(chatId,'_偽毒同你睇緊九日天氣預報_',{parse_mode:'Markdown'})
        .then(function(msg){
            var res=JSON.parse(body);   
            bot.sendMessage(chatId,'偽毒話你知黎緊'+res["weatherForecast"][nextDay]["week"]+'天氣預報係'+res["weatherForecast"][nextDay]["forecastWeather"]);
        })
        }
    });

});