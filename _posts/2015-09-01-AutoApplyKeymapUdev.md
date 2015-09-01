---
layout: post
category:
title: "Auto apply a keymap using udev when a Typematrix is plugged"
tagline:
tags : [linux, keyboard, tips]
published: true
comments: true
author: cgatay
---

# Switching keymap

As some of you might know, I am now using a Typematrix 2030 on a daily basis. When I switched to this great keyboard I also adopted a new layout on it : Colemak.

However, to be able to pair with others not using a Colemak mapping, I did not set the default mapping to Colemak but I instead use an udev rule to set the input method to Colemak only for the Typematrix.


## Write a keymap switch script

Thanks to [@BitardMichael](https://twitter.com/BitardMichael) tips and existing scripts I ended up with the following script saved in `/usr/local/bin/set_typematrix_colemak_mapping`

One of the tricky part was having a way of executing the script only when the keyboard is ready, without blocking udev's job (or the keyboard is not yet visible by the X system). The workaround I found was scheduling the execution of the job with the simple `at` command.
{% gist 1673456ec94a1f6d8d0d set_typematrix_colemak_mapping %}


## Tell udev to run the script on keyboard detection
The process is really easy, all you need to do is to add the following to a new file : `/lib/udev/rules.d/85-typematrix.rules`

{% gist 1673456ec94a1f6d8d0d 85-typematrix.rules %}


## Adapting it to your use case
If you are using another keyboard than a Typematrix you will need to adapt the udev rule with the proper Vendor / Product IDs (you can grab them with `lsusb`). 
For the `xinput` part, you will need to adjust the grep to match your hardware.

Of course the same goes for your layout : colemak / dvorak / bépo ...
