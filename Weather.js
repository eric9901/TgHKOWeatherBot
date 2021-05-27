var TelegramBot = require('node-telegram-bot-api');
var token='1250642246:AAEcHZo4fZinIowfm_-q-ECm_jbUvdGF59A';
var bot = new TelegramBot(token, {polling:true});
var request = require('request');

//show the command and explaintion
bot.onText(/\/Help/,(msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,"command list:\n /weare: current each distanct temperature\n /WeaPre fd: general today weather prediction\n /Weapre: detail today weather prediction\n /wea9DPre x:maximun 9 day weather prediction, x is the number of day beyond today that youwant to predict.");

});

// current weather report
bot.onText(/\/weare/,(msg)=>{
    var chatId = msg.chat.id;

    request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒話你知而家十八個天交台觀察點氣溫係_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
                res=res["temperature"]["data"];
                for (i = 0; i < 18; i++) {
                bot.sendMessage(chatId,res[i]["place"]+':'+res[i]["value"]+'c');}
            })
           }
        });
});
//general informatyion of today weather prediction  
bot.onText(/\/weaPre(.+)/,function(msg,match){
    var chatId=msg.chat.id;
    var Command =match[1];
    if(Command ==' fd')
        request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊今日天氣預報_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body);
               
                
                    bot.sendMessage(chatId,'偽毒話你知今日天氣預測內容係'+res.forecastDesc
                    +'預測時段就係'+res.forecastPeriod);
                
            })
            }
        });
});
//detail informatyion of today weather prediction  
bot.onText(/\/weaPre/,function(msg){
    var chatId=msg.chat.id;
    var W="/weaPre";
    if(msg.text.toString() === W){
        request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`,function(error,response,body){
            if(!error && response.statusCode ==200){
            bot.sendMessage(chatId,'_偽毒同你睇緊今日天氣預報_',{parse_mode:'Markdown'})
            .then(function(msg){
                var res=JSON.parse(body); 
                var WeaMess='偽毒話你知今日天氣預報概況係'+res.generalSituation+'\n展望:'+res.outlook;
                if(res.tcInfo!='')
                WeaMess+='\n熱烈氣旋資訊:'+res.tcInfo;
                if(res.fireDangerWarning!='')
                WeaMess+='\n火災危險:'+res.fireDangerWarning;
                bot.sendMessage(chatId,WeaMess);

            })
            }
        });
    }
});

// nine day weather perdiction
bot.onText(/\/wea9DPre(.+)/,function(msg,match){
    var chatId=msg.chat.id;
    var nextDay =parseInt(match[1])-1;
    wCode ='fnd';
    request(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc`,function(error,response,body){
        if(!error && response.statusCode ==200){
        bot.sendMessage(chatId,'_偽毒同你睇緊九日天氣預報_',{parse_mode:'Markdown'})
        .then(function(msg){
            var res=JSON.parse(body);   
            res=res["weatherForecast"]
            bot.sendMessage(chatId,'偽毒話你知黎緊'+res[nextDay]["week"]+'嘅天氣預報\n果日'+res[nextDay]["forecastWeather"]);
        })
        }
    });

});