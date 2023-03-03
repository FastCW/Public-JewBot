const repl = require('repl')
const mineflayer = require('mineflayer')
const { Webhook } = require('discord-webhook-node');
const kleur = require('kleur')
const colors = require('colors')

// hi change this to ur webhook url
const hook = new Webhook("");
const IMAGE_URL = 'https://cdn.discordapp.com/attachments/1070478101726892117/1070575120009154600/Screenshot_20230105-220804_Gallery.jpg';
const hook_name = 'TPA REQUESTS';
hook.setAvatar(IMAGE_URL);
hook.setUsername(hook_name);

const USERNAME = 'TPA REQUESTS'
const PORT = 25565

// add player names to here ok
var whitelist = [
	'YSERNAME'
]
/*
const bot = mineflayer.createBot({
	host: '6b6t.org',
	port: PORT,
	username: USERNAME,
	version: "1.18.2"
})
*/
// DO NOT CHANGE THIS ^^^ its cracked mc not regular
const bot = mineflayer.createBot({
    host: 'IP',
    port: 25565,
    username: 'email',
    password: 'password',
    version: '1.18.2', 
    auth: 'microsoft'      // you can obfuscate this part if you want!!
  })

// DO NOT CHANGE ANYTHING FROM HERE DOWN IF YOU DO NOT KNOW WHAT YOU ARE DOING!!!!

const r = repl.start(USERNAME + '> ')
bot.once('login', async () => {
    bot.setControlState("sneak", true)

	// dont change
	// setTimeout(() => {bot.chat("/login ")}, 5000)
	// comment this if you are not going to use this in 6b
	bot.setControlState("forward", true)
	setTimeout(() => {bot.setControlState('forward', false)}, 15000)
	// comment this if you are not going to use this in 6b
	
	log("logging in as: " + USERNAME)
	
	r.context.bot = bot
	//r.context.hook = hook
	
	r.on('exit', () => {
		bot.end()
    })
})

bot.on('message', async (message) =>{
    if (message.toString().includes("Teleport request recieved from")) {
        var username = message.toString().split("Teleport request recieved from ")[1].slice(0, -1)
        // this is the string for the tp (donutsmp rn) you can change it to what the server says
        /*
        if (username.startsWith('[')) {
            username = username.split(' ')[1]
        }
        */ // dont mind this part ^^^
        
        if (whitelist.includes(username)) {
            hook.send('accepted **' + username + '**s tpa request (sexy mf LMFAO)')
            info(username + " is in the whitelist accepting tp")
            say(`/tpa accept ${username}`)
        } else {
            hook.send('denied **' + username + '**s tpa request (dumb mf LMFAO)')
            say(`/tpacancel`)
            info(`${username} tried to tpa but is not in the whitelist`)
        }
        
        // this is the denied and accept msgs
        
    }
    log(message)
})

function info(msg) {
    log('['.green + 'INFO'.green + '] '.green + msg)
}

function say(msg) {
    info("saying: " + msg)
    bot.chat(msg)
}

// hot function makes repl not look shit when typing use this instead of console.log
const log = (msg) => {
  const promptOffset = r._prompt.length + r.line.length;
  r.outputStream.write('\033[2K\033[1G'); // Erase to beginning of line, and reposition cursor at beginning of line
  r.outputStream.write(msg + "\n");
  r.outputStream.write('' + r._prompt + r.line); // Redraw existing line
  r.outputStream.write('\033[' + (promptOffset + 1) + 'G'); // Move the cursor to where it was
};
