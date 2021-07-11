require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const fetch = require('node-fetch')
const notes = require('./db.js')


let noteCollection = null
notes().then((collection) => {
  noteCollection = collection
  console.log('collection successfully retrieved',noteCollection);
})
.catch((err) => console.error('Collection retrieval failed',err))

const bot = new Telegraf(process.env.BOT_TOKEN)
const messages = []

  bot.start((ctx) => ctx.reply('Hello'))
  bot.help((ctx) => ctx.reply('Help message'))
  bot.hears(/http.*/, async (ctx) => {
    
    const newNote = {
      content: ctx.message.text
    }
    await noteCollection.insertOne(newNote)
    .then((res) => {
      console.log('Successfully inserted');
    ctx.telegram.sendMessage(ctx.message.chat.id, 'note saved')
  })
    .catch((err) => {
      ctx.telegram.sendMessage(ctx.message.chat.id, 'save failed')
    })
  })
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  