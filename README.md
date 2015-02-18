# websockethook
A simple web service to receive web hooks over a web socket.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This is a Sinatra based web service. When you run it, you can connect to it using any standard Web Socket client, and register a web hook. When you perform a POST on that newly created web hook, you will receive a message via the web socket.
