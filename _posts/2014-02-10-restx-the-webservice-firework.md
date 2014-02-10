---
layout: post 
category: 
title: "RestX the webservice firework"
tagline: 
tags : [java, webservice, tdd] 
published: true
---

# Another Java Rest framework #

If you're a somewhat experienced Java developer I guess you've encountered a lot of framework when it comes to write web services.

[Restx.io](http://www.restx.io) is a new kid on the block leveraging high velocity with a focus on testability through a set of unique and great features :

  * each rest endpoint generates its documentation from its tests (real killer feature here : we hate writing docs but we live writing tests!)
  * a built in monitoring engine
  * everything that can be done at compile time is done at that time (annotations / dependency injection) 
  * it is written in good old plain Java (IDE support : I'm looking at you Play Framework!)
  * auto compile (we don't like waiting!)

I've tested it on a few small projects, I can't wait to try it on a real project !