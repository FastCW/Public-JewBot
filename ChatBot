const fetch = require('node-fetch');
const { exec } = require('child_process');

// Define the whitelist of players to log deaths for
const whitelist = ['Player1', 'Player2', 'Player3'];

// Define the Discord webhook URL
const webhookUrl = 'WEBHOOK HERE';

// Define the Minecraft server version, IP address, and port
const minecraftVersion = '1.17.1';
const minecraftServerIp = 'SERVER IP HERE';
const minecraftServerPort = '25565';

// Open the Discord invite link
exec('start https://discord.gg/q4UnxJbTdq');

// Authenticate with Minecraft
const authWithMinecraft = async (username, password) => {
  const authResponse = await fetch('https://authserver.mojang.com/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      agent: { name: 'Minecraft', version: 1 },
      username: username,
      password: password,
      requestUser: true
    })
  });
  if (!authResponse.ok) {
    throw new Error(`Failed to authenticate with Minecraft: ${await authResponse.text()}`);
  }
  return await authResponse.json();
};

// Listen for incoming chat messages
const chatListener = async (event) => {
  // Get the chat message
  const message = JSON.parse(event.data).message;

  // Check if the message is a chat message
  if (message && message.text && message.translate === 'chat.type.text') {
    // Get the username from the message
    const username = message.with[0].text;

    // Check if the username is in the whitelist
    if (whitelist.includes(username)) {
      // Get the message text
      const messageText = message.with[1].text;

      // Check if the message is a death message
      if (messageText.startsWith(username) && messageText.includes('died')) {
        try {
          // Authenticate with Minecraft using the username and password
          const authData = await authWithMinecraft('USERNAME HERE', 'PASSWORD HERE');

          // Create the webhook payload with the authenticated username, server version, IP address, and port
          const payload = {
            username: authData.user.username,
            content: messageText,
            embeds: [{
              title: 'Minecraft Death Log',
              description: `Version: ${minecraftVersion}\nServer: ${minecraftServerIp}:${minecraftServerPort}`
            }]
          };

          // Send the payload to the webhook URL
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        } catch (error) {
          console.error(`Failed to authenticate with Minecraft: ${error}`);
        }
      }
    }
  }
};

// Add the chat listener to the game chat
minecraftChat.addEventListener('message', chatListener);
