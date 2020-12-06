---
layout: post
category:
title: "macOS tools checklist"
tagline:
tags : [macos, tools, checklist]
published: true
comments: true
author: cgatay
---

# Welcome to the mac world

Wether you're new to macOS or an user coming from different machines, the tools we tend to use is very important to be productive.

Here you'll find my list and what I install on a fresh machine to get started.

## System tools

First and foremost, I start with [`brew`](https://brew.sh) to handle all my packages, but instead of doing so manually, I use my [`dotfiles`](https://github.com/CedricGatay/dotfiles.git) and my "magic"
install script that does all the heavy lifting for me.

## Keyboard tools

I use a TypeMatrix with a Colemak layout and also the internal keyboard of my laptop with its default layout.
Colemak layout is available on a fresh macOS install but it is far from perfect as there are a lot of missing dead keys 
(to type accented letters mainly), so I start by installing the layout provided on this page: [Colemak mac](https://colemak.com/Mac)

To easily switch between the two and get almost the same feeling, I use [Karabiner Elements](http://karabiner-elements.pqrs.org/).

## Everyday tools

 * [sdkman](https://sdkman.io): to manage installation of various sdk (mainly Java based)
 * [iTerm](https://iterm2.com): nice terminal app with profiles
 * [tmux](https://github.com/tmux/tmux/wiki): multi terminal in one window, switching terminal with a keystroke
 * [zsh](https://www.zsh.org): Z-Shell
 * [starship](https://starship.rs): fast shell prompt 
 * [ripgrep](https://github.com/BurntSushi/ripgrep): faster `grep`
 * [bat](https://github.com/sharkdp/bat): nice `cat` alternative (with paging / highlighting)
 * [exa](https://github.com/ogham/exa): replacement for `ls`
 * [Alfred](https://www.alfredapp.com): Spotlight with more features, this is my main app launcher / switcher
 * [SetApp](https://go.setapp.com/invite/cgatay): App subscription service, use many tools from this (BetterTouchTool, iStat, BarTender...)