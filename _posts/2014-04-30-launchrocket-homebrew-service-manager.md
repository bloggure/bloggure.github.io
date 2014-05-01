---
layout: post
category:
title: "LaunchRocket - Homebrew service manager"
tagline:
tags : [mac, homebrew, service]
published: true
comments: true
author: cgatay
---

# Manage your services #

If you're using [HomeBrew](http://brew.sh) to manage your software installation on your Mac, there is a thing that is not that easy to do : `launchd` or `launchctl` service management. Often you need to manually tell `launchd` to load the `plist` of your newly installed service. It leads to a lot of things launched at boot on your machine, and they are not easy to manage.

[LaunchRocket](https://github.com/jimbojsb/launchrocket) provides a simple PreferencePane allowing you to start/stop services when you only need to with a clean and simple GUI.

![LaunchRocket in action](/images/post/LaunchRocket.png)

You can easily install it via `brew cask` (more to come on brew cask soon) or download the [zip distribution](https://github.com/jimbojsb/launchrocket/releases)
