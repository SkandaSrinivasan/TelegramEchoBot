require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const notes = require('./db.js')


let noteCollection = null
notes().then((collection) => {
  noteCollection = collection
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
      ctx.reply('Note saved')
  })
    .catch((err) => {
      ctx.reply('save failed')
    })
  })
  bot.launch()
  
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  