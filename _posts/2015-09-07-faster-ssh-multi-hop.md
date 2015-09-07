---
layout: post
category:
title: "Faster ssh multi hop"
tagline:
tags : [ssh, tips]
published: true
comments: true
author: cgatay
---

# Multi Hop

It is often required that, for security reason, you have to hop through a SSH gateway to access other machines. While this is perfectly fine and simple to do, it is often cumbersome to open a new session.
However, with a small script you can speed up your access to machines even with such a restriction in place.

## Classical way of hop'ing

Let's say our gateway is named `gateway` and our target host `myAppHost` the classical way of doing it would be :

```shell
ssh gateway
you@gateway $ hostname
gateway.my.tld
you@gateway $ ssh myAppHost
you@myAppHost $ hostname
myAppHost.my.tld
```

## Faster way of hop'ing

A quicker way of doing this is to specify the ssh command directly, there is one thing to tell ssh though: allocating a TTY even if it does not seem to be connected to one. 
In fact, the command supplied to ssh is not supposed to be interactive, that is why you need to give this hint to SSH : 

```shell
ssh -t gateway ssh myAppHost
you@myAppHost $ hostname
myAppHost.my.tld
```

## Script this !
The script is really simple, and only consists in the following

```shell
#!/bin/sh
ssh -t gateway ssh $1
```

Save this in your path and give it the run permission then you are all set (mine is named `gssh`). All you have to do to connect is now a simple `gssh myAppHost` 
