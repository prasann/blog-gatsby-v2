---
title: Scribblings on Socket.io
menuTitle: Scribblings on Socket.io
subTitle: When i tried out socket.io for the first time, it was quite an interesting learning of few new paradigms and techniques.
postDescription: When i tried out socket.io for the first time, it was quite an interesting learning of few new paradigms and techniques.
category: JavaScript,Tech
---
I was trying my hands on socket.io. On my first glance it looked extremely simple to get going. The app i was working was on node.js, so i had no trouble in including socket.io into my project.

My app had client and server component. For the server component i could able to do the npm install and got the socket.io working. Whereas for the client component i couldn't able to find the stand alone js available for download. Basically the js comes in along with the npm which means you got to take it out separately if you want to use it. Then i used the js file from their [Github repo](https://github.com/learnboost/socket.io).

By default Socket.io doesn't perform broadcast
----------------------------------------------

This is my first learning. Though it seems to be obvious after taking a good look onto the API, it wasn't very clear for me in the beginning.

_For example:_

**Server**

var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(80);

io.sockets.on('connection', function(socket) {
	socket.on('first\_msg', function(data) {
		socket.emit('reply', {
			hello: 'world'
		});
	});
});

**Client 1:**

<script src = "/socket.io/socket.io.js" > </script>
<script>
	var socket = io.connect('http:/ / localhost ');
	socket.emit('first\_msg ', { my: 'data1 ' });
</script>

**Client 2:**

<script src = "/socket.io/socket.io.js" > </script>
<script>
	var socket = io.connect('http:/ / localhost ');
	socket.on('reply ', function (data){
		console.log("Client1 had pinged server.");
	}
</script>

In this case i was expecting my _Client2_ console.log to execute but that never happened. Reason being whenever _Client1_ emits '_first\_msg_' it was _Client1_ who was receiving the reply too (obvious i know !!).

So in these cases socket.io provides an API to broadcast messages.Hence instead of

socket.emit('reply', { hello: 'world' });

it should have been

socket.broadcast.emit('reply', { hello: 'world' });

Exposed events in socketIO are just defined for socket.on methods
-----------------------------------------------------------------

I was trying to emit a custom message from my client. I need to perform some actions on its success and failure. Now i need to attach success and error callbacks. For this i found this [Exposed events](https://github.com/LearnBoost/socket.io/wiki/Exposed-events "Exposed Events") doc. The funda is that all these exposed events are defined only for socket.on which means while emitting a message i cannot bind any callbacks to it.

For error callback it is straight forward. We have

socket.on('error', () -> console.log("Error Occured"))

which can be bound on the socket so whenever an error is been thrown on the socket the defined behaviour gets executed.

**Client** emits the custom message and sends JSON data to the socket via socket.emit, also he gets an update function that handles the success callback

socket.emit ('message', {hello: 'world'});
socket.on ('messageSuccess', function (data) {
   //do something
});

**Server**\-side Gets a call from the message emit from the client and emits the messageSuccess back to the client

socket.on ('message', function (data) {
	io.sockets.emit ('messageSuccess', data);
});