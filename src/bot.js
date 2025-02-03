const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config');
const { initDatabase } = require('./database/init');
const queries = require('./database/queries');
const { statsHandler } = require('./commands/stats');
const { broadcastHandler } = require('./commands/broadcast');
const { suggestBookHandler } = require('./commands/books');

async function startBot() {
  try {
    // Initialize database first
    await initDatabase();

    // Initialize bot
    const bot = new TelegramBot(config.botToken, { polling: true });

    // Command handlers
    bot.onText(/\/start/, async (msg) => {
      const { id: userId, username, first_name, last_name } = msg.from;
      const botName = (await bot.getMe()).username;

      try {
        await queries.saveUser(userId, username, first_name, last_name, botName);
        await bot.sendMessage(msg.chat.id, 'به ربات پیشنهاد کتاب خوش آمدید! 👋\n\nبرای دریافت پیشنهاد کتاب، از دستور /suggest استفاده کنید.');
      } catch (error) {
        console.error('Error saving user:', error);
        await bot.sendMessage(msg.chat.id, 'متأسفانه در پردازش درخواست شما مشکلی پیش آمد.');
      }
    });

    bot.onText(/\/stats/, (msg) => statsHandler(msg, bot));
    bot.onText(/\/broadcast (.+)/, (msg) => broadcastHandler(msg, bot));
    bot.onText(/\/suggest/, (msg) => suggestBookHandler(msg, bot));

    // Error handling
    bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
    });

    console.log('Bot is running...');
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

startBot(); 