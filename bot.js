
const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf('1886911278:AAF9j-kftrime1FnrR9K6dwwxLj-gHfEYic')
const messages = []
const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Delete', 'delete')
  ])
  
  bot.start((ctx) => ctx.reply('Hello'))
  bot.help((ctx) => ctx.reply('Help message'))
  bot.on('message', (ctx) => ctx.telegram.sendMessage(ctx.message.chat.id, ctx.message.text, keyboard))
  bot.action('delete', (ctx) => ctx.deleteMessage())
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  