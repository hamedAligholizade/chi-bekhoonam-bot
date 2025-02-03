const books = [
  {
    title: 'بوف کور',
    author: 'صادق هدایت',
    description: 'یک رمان روانشناختی که به عنوان یکی از مهمترین آثار ادبیات مدرن ایران شناخته می‌شود.'
  },
  {
    title: 'شازده احتجاب',
    author: 'هوشنگ گلشیری',
    description: 'داستان زوال یک خاندان اشرافی که با روایتی پیچیده و چندلایه بیان شده است.'
  },
  {
    title: 'سووشون',
    author: 'سیمین دانشور',
    description: 'روایتی از زندگی خانواده‌ای در شیراز در دوران جنگ جهانی دوم.'
  },
  {
    title: 'چشم‌هایش',
    author: 'بزرگ علوی',
    description: 'داستان عشق و هنر در بستر تحولات اجتماعی ایران.'
  },
  {
    title: 'کلیدر',
    author: 'محمود دولت‌آبادی',
    description: 'حماسه‌ای روستایی که زندگی مردم خراسان را به تصویر می‌کشد.'
  }
];

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * books.length);
  return books[randomIndex];
}

function formatBookMessage(book) {
  return `📚 پیشنهاد کتاب برای شما:

📖 نام کتاب: ${book.title}
✍️ نویسنده: ${book.author}
📝 درباره کتاب: ${book.description}

برای دریافت پیشنهاد جدید، دوباره از دستور /suggest استفاده کنید.`;
}

async function suggestBookHandler(msg, bot) {
  try {
    const book = getRandomBook();
    await bot.sendMessage(msg.chat.id, formatBookMessage(book), {
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Error in book suggestion:', error);
    await bot.sendMessage(msg.chat.id, 'متأسفانه در پیشنهاد کتاب مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
  }
}

module.exports = {
  suggestBookHandler
}; 