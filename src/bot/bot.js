const { Telegraf } = require('telegraf');
const { Client } = require('pg');
// connections
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const bot = new Telegraf('5425287923:AAEy6NHy-QdHA6GnVJIU-rzTkSZGgPc2-KY');

// kerak bo'ladigan tugmalar :
const backend = 'backend';
const frontend = 'frontend';
const flutter = 'flutter';
const braches = [backend, frontend, flutter];

// menu :
const about = 'about';
const result = 'result';
const vacancies = 'vacancies';
const internship = 'internship';

const menu = [about, result, vacancies, internship];

// doim shu xabarni jo'natadi
bot.use((ctx, next) => {
  bot.telegram.sendChatAction(ctx.chat.id, 'typing');
  next(ctx).then();
});

bot.start((ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, 'Please choose from menu below : ', {
    reply_markup: {
      keyboard: [
        [{ text: vacancies }, { text: result }],
        [{ text: about }, { text: internship }],
      ],
      one_time_keyboard: true,
      selective: true,
      remove_keyboard: true,
      resize_keyboard: true,
    },
  });
});

bot.hears(menu, (ctx) => {
  let text = ctx.message.text;

  switch (text) {
    case vacancies:
      {
        bot.telegram.sendMessage(
          ctx.chat.id,
          'Please choose from menu below : ',
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: backend, callback_data: backend }],
                [{ text: frontend, callback_data: frontend }],
                [{ text: flutter, callback_data: flutter }],
              ],
              remove_keyboard: true,
            },
          },
        );
      }
      break;
    case about:
      {
        ctx.replyWithHTML(`<b>SUPPORT IT SOLUTIONS</b>\n\n` + ` all about our company`);
        // send location :
        bot.telegram.sendLocation(ctx.chat.id, 41.257504, 69.220178);
      }
      break;
    case result:
      {
        bot.telegram.sendMessage(ctx.chat.id, 'Your application is reviewed');
      }
      break;
    case internship:
      {
        ctx.reply(
          'It is with great pleasure that I welcome you to Support Solution internship program. We are  very excited to have you on board with us!😊 \nWe were thrilled to learn about your personal and professional interests and  endeavors, particularly in the areas of web and mobile development. We think you will enjoy the  kind of work you will be doing with us. Please, fill out the application form below!👇\nWarm Regards,\nDilfuza\nHR Specialist',
        );
        ctx.reply('https://telegra.ph/SUPPORT-Accelerator-WAVE-2-09-26');
      }
      break;
  }
});

const map = new Map();

map.set(backend, "Backend haqida qisqacha mam'lumot");
map.set(frontend, "Frontend haqida qisqacha mam'lumot");
map.set(flutter, "Flutter haqida qisqacha mam'lumot");

bot.action(braches, (ctx) => {
  ctx.deleteMessage();
  ctx.answerCbQuery('Branch is chosen');
  const branch = ctx.update.callback_query.data;
  ctx.reply(map.get(branch));
  ctx.reply(`Please send us your Full name for apply ${branch}:`, {
    reply_markup: {
      remove_keyboard: true,
    },
  });
});

// get name of user :
bot.on('text', (ctx) => {});

//locations :
bot.on('location', (ctx) => {
  console.log(ctx.update);
});

// files
bot.on('document', (ctx) => {
  console.log(ctx);
  ctx.replyWithDocument(ctx.update.message.document.file_id); // id sini bersa qaytardi o'zi
  ctx.reply('Your application is saved successfully', {
    reply_markup: {
      keyboard: [[{ text: vacancies }, { text: result }], [{ text: about }]],
      one_time_keyboard: true,
      selective: true,
      remove_keyboard: true,
      resize_keyboard: true,
    },
  });
});

bot.launch(); // start

//  function set_name(name) {
//     return client.connect(async() => {
//         client.query(`insert into roles(name) values(${name})`);
//         const all = await client.query(`select * from roles`);
//         const hammasi = all.rows;
//         console.log(hammasi);
//         return {hammasi};
//     })
// }
