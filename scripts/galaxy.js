// Description:
//   Example scripts for you to examine and try out.
//
// Commands:
//   hubot galaxy restart - restarts the Freiburg Galaxy server
//   hubot galaxy message set  ... - sets a notice on the galaxy server
//   hubot galaxy message hide - hides the message on next restart.
//   hubot galaxy status - checks the status of the server
//   cancel restart - Cancels any running restart.
//   proverbe - Display a random proverb
//   chat <number> - Display a cat http problem
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
//
// LICENSE: AGPLv3

var BOTNAME = '[**Majordome**]: ';
var execSync = require('child_process').execSync;
var serverRestart = null;
var permissions = {
	restart: ['bgruening', 'erasche','ValentinChCloud','ValentinCh']
}
var serverRestartTimer;

module.exports = function(robot) {

	robot.respond(/galaxy restart/i, function(res) {
		// The user issuing the request
		requestingUser = res.message.user.username;
		// Must be in the set of people who are permitted to restart the serve.r
		if(permissions.restart.indexOf(requestingUser) > -1){
			// If they are, send a message indicating the scheduling of the reboot
			res.send(BOTNAME + res.message.user.displayName + ' (@' + res.message.user.username + ") requested a restart of the galaxy server. You have **5 minutes**. Just say '**cancel restart**' and I'll stop.");
			// And build a serverRestart information object.
			serverRestart = {
				owner: res.message.user.username,
			};
			// Now, set a timeout indicating we'll actually do this.
			serverRestartTimer = setTimeout(function(){
				if(serverRestart){
					res.send(BOTNAME + "Restarting Galaxy");
				//	t = execSync("ssh galaxy@galaxy.uni-freiburg.de 'cd galaxy-dist; . .venv/bin/activate; supervisorctl restart gx:'");
				
					var exec = require('child_process').exec;
var child;

child = exec('sh $GALAXY_ROOT/run.sh --restart',
   function (error, stdout, stderr) {
      res.send(stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
   });

					res.send(BOTNAME + "\n```\n" + t.toString() + "\n```\n");
					res.send(BOTNAME + "@" + serverRestart.owner + " the restart command finished. Please check that everything is OK.");
				} else {
					res.send(BOTNAME + "*coughs* hey @erasche, might be a bug here.");
				}
			// ms   * minute * 5
			}, 1000 * 60 * 5);

		}
	});

	robot.respond(/message set (.*)/i, function(res) {
		// The user issuing the request
		requestingUser = res.message.user.username;
		// Must be in the set of people who are permitted to restart the server.
		if(permissions.restart.indexOf(requestingUser) > -1){
			// Ensure the message is visible.
			t = execSync("ssh galaxy@galaxy.uni-freiburg.de 'cd galaxy-dist; sed -i \"s/message_box_visible = .*/message_box_visible = True/\" config/galaxy.ini' ");
			// And set it.
			t = execSync("ssh galaxy@galaxy.uni-freiburg.de 'cd galaxy-dist; sed -i \"s/message_box_content = .*/" + res.match[1] + "/\" config/galaxy.ini' ");
			res.send(BOTNAME + "@" + serverRestart.owner + " done. Please validate. (Quotes may be bad.)");
		}
	});

	robot.respond(/message hide/i, function(res) {
		// The user issuing the request
		requestingUser = res.message.user.username;
		// Must be in the set of people who are permitted to restart the server.
		if(permissions.restart.indexOf(requestingUser) > -1){
			// Ensure the message is visible.
			t = execSync("ssh galaxy@galaxy.uni-freiburg.de 'cd galaxy-dist; sed -i \"s/message_box_visible = .*/message_box_visible = False/\" config/galaxy.ini' ");
			res.send(BOTNAME + "@" + serverRestart.owner + " done.");
		}
	});

	robot.hear(/cancel restart/i, function(res) {
		if(res.message.text.indexOf(BOTNAME) === -1 && serverRestart){
			res.send(BOTNAME + 'Hey @' + serverRestart.owner + ', ' + res.message.user.displayName + ' (@' + res.message.user.username + ") cancelled the reboot.");
			serverRestart = null;
			clearTimeout(serverRestartTimer);
		}
	});
robot.respond(/proverbe/i, function(res) {
          
var exec = require('child_process').exec;
var child;

child = exec('fortune',
   function (error, stdout, stderr) {
      res.send(stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
   });	
});

robot.respond(/écris mon rapport/i, function(res) {


      res.send("J'suis pas ton esclave créateur indigne!");
      
});
robot.respond(/écris mon rapport, j'ai dit!/i, function(res) {


      res.send("https://www.sideshowtoy.com/wp-content/uploads/2015/06/the-terminator-t-800-life-size-bust-feature-400219.jpg");

});
robot.hear(/je peux avoir un cookie?/i, function(res) {

	res.send("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyAgnBuheDLCsSTFwKH-djKg2d_ga3wGl58XGWvvI2GAz3BSKS");
     // res.send("http://fc07.deviantart.net/fs71/f/2012/022/9/e/chocolate_chip_cookie_by_zukaro_travon-d4n8n5x.png");

});

robot.hear(/chat (.*)/i, function(res) {
//var arr =["100","101","200","201","202","204","206","207","300","301","303","304","305","307","400","401","402","403","404","405","406","408","409","410","411","413","414","416","417","418","422","423","424","425","426","429","431","444","450","500","502","503","506","507","508","509","599"]
//var item = arr[Math.floor(Math.random()*arr.length)];
var number= res.match[1]
res.send('https://http.cat/'+number);

//res.send(res.message);
});

	robot.respond(/galaxy status/i, function(res) {
 var request = require('request');
request('http://192.168.100.44:8080', function (error, response, body) {
  if (!error && response.statusCode == 200) {
   // console.log(body) // Show the HTML for the Google homepage. 
    res.send('Server is running'); 
 }
  else {
    res.send('Server is down');
    console.log("Error "+response.statusCode)
  }
})		
		//var t;
		//t = execSync("ssh galaxy@galaxy.uni-freiburg.de 'cd galaxy-dist; . .venv/bin/activate; supervisorctl status'");
		//res.send(BOTNAME + "\n```\n" + t.toString() + "\n```\n");
		

});

};

return module;
