---
layout: post
category:
title: "Homebrew Cask - commandline install on Mac"
tagline:
tags : [mac, homebrew, cask]
published: true
comments: true
author: cgatay
---

# Command line nerd #

As a command line geek, I always have at least one open and tend to use it for everything on my machine.

[HomeBrew](http://brew.sh) is a very convenient tool to install command line tools to your Mac without cluttering up your environment. You can use it like your Linux friends are using `apt-get` or `yum` and it feels really nice.

One thing that your friend can do and you cannot, is installing Google Chrome only using command line, this is where [HomeBrew Cask](https://github.com/phinze/homebrew-cask) comes to the rescue.

# Installation guide #

Cask will be up and running in a very few steps :

    $ brew tap phinze/cask
    $ brew install brew-cask
    $ brew cask install dropbox #for example

# Usage hint #
This tool is really nice because it allows you to script your machine setup. No more headaches forgetting the installation of <mypreferred.app> when you want to use it.

Don't hesitate to add a small script in your `.dotfiles` to seed your software on new machines, and if your preferred software is missing, it is really easy to add new casks.
