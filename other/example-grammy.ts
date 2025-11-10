import process from 'node:process'
import { Bot } from 'grammy'
import { fetchNews } from 'somewhere'

async function main() {
  const channelIdStr = process.env.CHANNEL_ID
  if (!channelIdStr) {
    throw new Error('CHANNEL_ID is not provided')
  }
  const channelId = Number.parseInt(channelIdStr)
  if (Number.isNaN(channelId)) {
    throw new TypeError('invalid CHANNEL_ID')
  }
  const token = process.env.BOT_TOKEN
  if (!token) {
    throw new Error('BOT_TOKEN is not provided')
  }
  const bot = new Bot(token)
  const news = await fetchNews()
  let sent
  if (news.photo != null) { // Call sendMessage, if news has a photo.
    sent = await bot.api.sendPhoto(
      -(1000000000000 + channelId), // Don't forget to convert to Bot API dialog ID.
      news.photo,
      {
        caption: news.text,
        parse_mode: 'HTML', // Don't forget to specify parse mode.
      },
    )
  }
  else {
    sent = await bot.api.sendMessage(
      -(1000000000000 + channelId), // Don't forget to convert to Bot API dialog ID.
      news.text,
      { parse_mode: 'HTML' }, // Don't forget to specify parse mode.
    )
  }
  console.log('Sent message ID:', sent.message_id)
}

main().catch(console.error)
