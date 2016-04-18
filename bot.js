var Botkit = require('botkit');
var env = require('./env.js');

console.log(env.token)
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: env.token,
}).startRTM()

// give the bot something to listen for.
controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'Hello yourself.');

});

controller.hears(['howto merge', 'howto:merge', "howto merge", "merge", "fetch", "howto fetch"],['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'git add . \n git commit -m"commit message" \n git fetch upstream \n git merge upstream/development \n git commit -m"Merged message" \n git push origin development \n Now, goto http://gitlab.ixdev/texemus/ixInspection and create a new Merge Request');
});

controller.hears(['howto migrate', 'migrate'],['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'php artisan migrate');

});
controller.hears(['database', 'populate database', 'migrate and seed', 'seed'],['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'php artisan migrate:refresh --seed');
});