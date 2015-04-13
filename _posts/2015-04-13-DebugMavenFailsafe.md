---
layout: post
category:
title: "Debug Failsafe Integration Test easily"
tagline:
tags : [maven, debug, integration, failsafe, arquillian, tips]
published: true
comments: true
author: cgatay
---

# Arquillian testing

Arquillian testing is very convenient to get a full environment deployed on an application server and test quickly. 
However sometimes we need to debug what's inside.


## Launch Maven in Debug mode
One way of doing it can be launching Maven in debug mode with the `mvnDebug` command instead of the classical `mvn`.
It will open a JPDA debugger on port 8000 by default, you then just need to connect to it with your preferred IDE.
But, if there is forked processes, you won't be able to debug inside them.

## Launch Failsafe Integration Tests in Debug mode
When using Arquillian, there is a high probability that Arquillian is running in a forked process (with embedded containers). 

There is an easy way to tell `maven-failsafe-plugin` to wait for a debugger when starting : use the `-Dmaven.failsafe.debug` property.


You can even specify the options as you would in `$JAVA_OPTS` to change ports / wait...
