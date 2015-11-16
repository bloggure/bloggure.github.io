---
layout: post
category:
title: "Avoid Proxy Headaches in Docker with redsocks"
tagline:
tags : [docker, proxy, tips]
published: true
comments: true
author: cgatay
---

# Proxying with Docker

When using docker under a corporate proxy, it can be cumbersome to have a working networking in all containers. You often end up being blocked by specific network access which does not seem to be properly forwarded to the proper proxy. For example when using `apt`.

## Classic way of doing

There is a [documented way](https://docs.docker.com/engine/articles/systemd/#http-proxy) of using a proxy, by adding command-line switches to your docker deamon. However, it does not seem to work everytime and could require exporting additional settings to your in-container applications (in my experience though).

## Why not using docker

[Nicolas](https://github.com/ncarlier/) pointed me an image he created to help with the setup of a corporate proxy. It uses [redsocks](http://darkk.net.ru/redsocks/) under the hood that listen to the docker socket and automatically add the glue to do the forwarding through the proxy.

Easy proxying in docker is just one command away ! (fill in the blank of your proxy ip and port)

    docker run \
           --restart=always \
           --privileged=true \
           --net=host \
           -d ncarlier/redsocks \
           $PROXY_IP $PROXY_PORT
