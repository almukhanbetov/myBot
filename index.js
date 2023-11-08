const telegramApi = require("node-telegram-bot-api");
const {testOptions, againOptions}  = require('./options')
const token = "6633477610:AAGa7SrBPMio3B3evo9aT_lxcAB6h4nUYcQ";

const bot = new telegramApi(token, {"polling": true})
bot.setMyCommands([
    {command : "/start", description : "Стартовая команда"},
    {command : "/info", description : "Информация о Вас"},
    {command : "/test", description : "Тестовые вопросы"},
])
const startGame = async(chatId) =>{
    await bot.sendMessage(chatId, "Стартуем TECT загадай число от 0 до 9")
    const nomRand = Math.floor(Math.random()*10)
    chats[chatId] = nomRand
    await bot.sendMessage(chatId, "Отгадай", testOptions);
}
const chats = {}
const start = () =>{
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id
    
        if(text === "/start"){
            await bot.sendSticker(chatId, `https://cdn.tlgrm.app/stickers/463/343/46334338-7539-4dae-bfb6-29e0bb04dc2d/192/3.webp`)
            return bot.sendMessage(chatId, "Стартуем Я бот")
        }
        if(text === "/info"){
            return bot.sendMessage(chatId, `${msg.from.first_name}`)
        }
        if(text === "/test"){
           return startGame(chatId);
        }    
    })
    bot.on('callback_query', msg=>{
        const data = msg.data
        const chatId = msg.message.chat.id
        // bot.sendMessage(chatId, `Ты выбрал цифру ${data}`)
        if(data === '/again'){
            return startGame(chatId);    
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю вы угадали цифру ${chats[chatId]}`,againOptions)
        }else{
            return bot.sendMessage(chatId, `К сожалению вы не угадали ${chats[chatId]}`,againOptions)
        }
        
    })
}
start()