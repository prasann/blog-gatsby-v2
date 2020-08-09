---
title: Start nginx when upstream is unavailable
subTitle: Workaround to start nginx in local docker setup, if one of the defined upstream isn't available.
postDescription: nginx will not start if one of the defined upstreams is not available. Here is a workaround to get through with those situations.
category: DevOps
---
### Upstreams in Nginx

`upstream` is an nginx directive to define groups of servers. Servers can listen on differnt ports, and it is possible to mix and match the UNIX-domain sockets and TCP connections. You can read about it [here.](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)

### Issue with upstream

If you are using proxy\_pass with upstream definitions in nginx config, then nginx checks for the server availability during the startup phase. A sample nginx.conf with upstream is here, lots of the .conf file is redacted to focus on the point in discussion.
```nginx
    http {
        ...
        upstream service-a {
            server service-a-ip-or-name:3000;
        }
        
        server {
            ...
            location /service-a/ {
                proxy_pass http://service-a/;
            }
        }
    }
```    

In the above mentioned scenario, nginx server will check for service-a while start-up phase. If service-a is down, you will see an error like host not found in upstream service-a

### The Workaround

This workaround is for services running in local setup in different docker containers. So, instead of using `upstream` directive you can directly point your service-discoverable-name in the proxy pass. The only thing while running docker containers, you need to add an additional nginx directive `resolver` and make it point to docker's internal DNS resolver. 127.0.0.11 The above mentioned config can be re-written as mentioned.
```nginx
    http {
        ...
        resolver 127.0.0.11;
        
        server {
            ...
            location /service-a/ {
                proxy_pass http://service-a-ip-or-name:3000/;
            }
        }
    }
```    

_Note: nginx approach is very valid in production like setups. However, in developer boxes it may not be possible to have all the services running while nginx starts. The workaround mentioned here should be mostly used in local or in dev setup and not advisable to use in prodcution like setup._