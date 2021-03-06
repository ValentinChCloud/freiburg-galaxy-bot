# FreiburgerBot

FreiburgerBot is a chat bot built on the [Hubot][hubot] framework. It was
initially generated by [generator-hubot][generator-hubot].

Someday the galaxy portions will be abstracted out into a hubot-plugin, but give me a week or two ;)

## Running FreiburgerBot Locally

You can test your hubot by running the following, however some plugins will not
behave as expected unless the [environment variables](#configuration) they rely
upon have been set.

You can start FreiburgerBot locally by running:

```
ROOM="Galaxy/Lobby" TOKEN=<your-personal-token> HUBOT_LOG_LEVEL=debug ./bin/hubot -a gitter
```

the token can be obtained from https://developer.gitter.im/apps

## Running Under Your Account

If you wish to run it under your account (i.e. it impresonates you) since gitter makes it complex to have multiple accounts / bot accounts...

you'll need to edit `node_modules/hubot-gitter/index.js` and comment out the line about not processing messages sent by the bot.

```javascript
 // Listen to room message
 const events = room.streaming().chatMessages()
 events.on('chatMessages', ({ model }) => {
   // Do not process messages sent by bot
   //if (model.fromUser == null || model.fromUser.id === this.user.id) return

   model.fromUser.room = room
   const message = new TextMessage(model.fromUser, model.text, model.id)
   this.receive(message)
```
