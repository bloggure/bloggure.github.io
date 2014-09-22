---
layout: post
category:
title: "Rescue a VPS upgrade with chroot"
tagline:
tags : [debian, vps, upgrade, chroot]
published: true
comments: true
author: cgatay
---

# Oops
A few days ago, I finally decided to upgrade the installed Linux on my dedicated box hosted at [OVH](http://www.kimsufi.com). As with every task you tend to postpone until it is too late, it failed miserably, Murphy's law I am looking at you right now !

During the install process, the machine hanged (I am not sure whether the machine is faulty or not, it seems to shut down under heavy load). Fortunately for me, OVH is kind enough to send a tech resets the machine, and if it does not ping when booted, the tech reboots the machine in rescue mode.

# Rescue mode
The rescue mode is a lightweight Linux booted on the machine so you can run `fsck`and other commands to rescue your filesystem (you can even `scp` files to backup before a reinstall for example.

My problem was simple, I needed to allow `dpkg` to finish its job in order for me to get a working machine. Then I think of the good old powerful `chroot` command and I remembered how powerful Unixes are !

# Mounting filesystems
As you should know, `chroot` is a command allowing to change the root of a file system, litterally jailing it into a directory (popular things of today like pico containers like Docker are improved versions of chroot).

The partition layout of my machine is the following : 

 * sda1 contains the root filesystem
 * sda2 contains home directories

I issued the following commands to "jail" the rescue mode into my machine :

    {% highlight bash %}
$ mount /dev/sda1 /mnt
$ mount /dev/sda2 /mnt/home
    
$ mount -o bind /proc /mnt/proc
$ mount -o bind /dev /mnt/dev
$ mount -o bind /dev/pts /mnt/dev/pts
$ mount -o bind /sys /mnt/sys 
$ chroot /mnt/
    {% endhighlight %}

From then, I was on my machine, with my files and so on, so I have been able to run `dpkg` to finish the install :

    {% highlight bash %}
$ dpkg --configure --a
    {% endhighlight %}

Finally, `dpkg` sent me back to a working prompt and I have been able to reboot the machine (do not forget to change boot disk in OVH manager to `hd` or `netboot` to prevent rebooting in rescue mode).
