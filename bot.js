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
controller.hears(['hello', 'hallo', 'hi', 'goodday', 'he', 'hoi', 'huh', 'heeee', 'let op'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'Woof :dog:');
});

controller.hears(['howto merge', 'howto:merge', "howto merge", "merge", "fetch", "howto fetch"],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'git add . \n git commit -m"commit message" \n git fetch upstream \n git merge upstream/development \n git commit -m"Merged message" \n git push origin development \n Now, goto http://gitlab.ixdev/texemus/ixInspection and create a new Merge Request');
});

controller.hears(['howto migrate', 'migrate'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'php artisan migrate');
});
controller.hears(['database', 'populate database', 'migrate and seed', 'seed'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'delete complete database \n php artisan migrate:refresh --seed');
});

controller.hears(['laravel composer', 'lcom', 'new project'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'composer create-project laravel/laravel {directory} "~5.0.0" --prefer-dist');
});

controller.hears(['laravel cache routes', 'route caching'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'php artisan route:cache');
});

controller.hears(['laravel generate auth', 'auth'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'php artisan make:auth');
});

controller.hears(['database dump', 'dump db'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'mysqldump -u root -p databasename > databasename.sql');
});

controller.hears(['hoe krijg ik die scheitzooi weer werkend', 'mac dennis'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'git fetch upstream \n git merge upstream/development \n delete complete database \n composer update \n composer dump-autoload \n php artisan migrate:refresh --seed');
});

controller.hears(['jack'], ['ambient', 'direct_message'], function(bot,message) {

  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {
    convo.ask('Hi! How are you?',function(response,convo) {
      convo.say('Cool, I`m ' + response.text + ' to!');
      convo.next();

    });
  })
});

controller.hears(['tell me a joke'], ['ambient', 'direct_message'], function(bot,message) {

  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

      var request = require('request');
      request('http://api.icndb.com/jokes/random?firstName=Koning&lastName=CJ.', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var sbody = JSON.parse(body)
          convo.say(sbody.value.joke);
          convo.next();
        }
      })

    });
  });







