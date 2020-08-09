---
title: Cross Site HTTP(S) Requests.
menuTitle: Cross Site HTTP(S) Requests.
subTitle: Some of the tried out solutions for the cross site request issue. Should be a good place to look out for which solution to be used under a circumstance.
postDescription: Some of the tried out solutions for the cross site request issue. Should be a good place to look out for which solution to be used under a circumstance.
category: Tech
---
Browsers have a default security mechanism to prevent http(s) request from one domain to other. Since there are tons of possibilities to misuse them.

The same origin policy prevents a document or script loaded from one origin from getting or setting properties of a document from another origin. This policy dates all the way back to Netscape Navigator 2.0.

However there are lots of genuine use cases for this scenario to occur which got to be handled by the application and the browsers.

I had to face one such genuine case, and got to deal with one of the miserable browser of my time IE :(

Just documenting few techniques to overcome this problem. I am not elaborating the techniques since that can be figured out, all i wanted is to document the possible solutions and when to use them.

#### 1\. CORS - Cross Origin Resource sharing

A detailed description of how to implement is on this [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

This is a very common and an elegant solution that you can find on the net for this problem. All you will need is to add few headers on the application server. This will allow application to allow requests from other application (domain). And also all the response from the parent application will include a header

Access-Control-Allow-Origin:

Which will tell the browser to allow those specified domains to talk to the application.

This solution works well with most of the modern browsers. Check out for the CORS browser support [here.](http://caniuse.com/cors)

**Limitations with IE:**

As you can see the browser compatibility chart, IE8 and IE9 has a partial implementation to CORS.

Modern browsers could able to support CORS for XMLHttpRequest. However IE8 and IE9 supports CORS using XDomainRequest object. What this means is that they have few limitations of their own.

Some of the most important constraints are,

*   Your requests should be only GET, POST HTTP methods and not PUT, DELETE etc.
*   Both the domain (the calling and the caller) uses the same protocol. Either HTTP or HTTPS.
*   Your request should not have any custom headers.

The exhaustive list is been detailed out in this [MSDN blog](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx).

**Workaround for IE**

If you think you can live with the constraints mentioned above, then the workaround is quite simple. You got to change all the XHR to XDR to make it work. Luckily if you are using jQuery you don't need to go through changing all the requests. Instead you can use this [jQuery plugin](https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest) . I guess there are more of these available just check out before breaking your brains.

#### 2\. JSONP Solution

Using [JSONP](http://json-p.org/) response instead of JSON response.

**Advantage:** No need of any specific workaround for IE8.

**Limitation:** Works only for HTTP(S) GET request. If you are planning to use POST/PUT/DELETE this solution is not for you.

#### 3\. iFrame Hack.

This is a creepy hack. Lets say, if you want to make a call from appA to appB. In appA's landing page load a hidden iFrame with some URL of appB. Then perform all the requests to appB from that iFrame. Since iFrame's domain is appB browsers' will not complain.

**Limitation:** Here the challenge is to consume the response. Your landing page should wait for an even in the iFrame and should consume the iFrame content. Don't even think of this solution if you want to make more than 1 cross site request in a page.

#### 4\. Reverse Proxy solution

If you want your appA to make a call to appB. Set up a simple reverse proxy to the appA. And use relative paths for the Ajax requests, while the server would be acting as a proxy to any remote location.

So in appA the relative path of the request will be _/cors-ajax_. The browser will not complain since this is not pointing to a different domain. And the reverse proxy rule will redirect anything of _cors-ajax_ to appB.

More reference to this implementation:

*   [Configuring the Proxy](http://www.askapache.com/htaccess/reverse-proxy-apache.html#Configuring_Proxy)
*   [Configuring Mod Proxy - SO](http://stackoverflow.com/questions/7807600/apache-mod-proxy-configuring-proxypass-proxypassreverse-for-cross-domain-ajax)

**Limitation:** The server config are quite hard (at least for me) to understand and perform.

#### 5\. App based solution

This solution is very similar to that of the reverse proxy but you don't need to make any server config changes. The initial CORS approach sounds reasonable, but few limitations like same protocol might stop us from using it. Applications like [AnyOrigin](http://anyorigin.com/), [WhateverOrigin](http://whateverorigin.org/) does that for you. They support http and https so you can use the protocol of the main window and consume the response. If you feel unsafe of using a different domain, you can deploy it in your own infrastructure.

**Limitation:** One more app to maintain :(

#### 6\. Add a generic controller/servlet in your parent domain.

Have a controller/servlet in your app which actually does the external domain call. Have only one GET, POST method. Keep posting all your requests to the same end-point with an additional header containing the actual end-point. Inside the method extract the header, make a call and go around about it. This means that browser doesn't know its an external domain call as your app will serve as a wrapper to that external domain call.

**Limitation:** Multiple HTTP calls for single request/response.

**More on:** [How to circumvent same origin policy?](
http://stackoverflow.com/questions/3076414/ways-to-circumvent-the-same-origin-policy)