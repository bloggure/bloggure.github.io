---
layout: post
title: Use VirtualBox to do a real install
categories:
- www
- os
tags:
- tips
- hack
status: publish
type: post
published: true
comments: true
author : cgatay
---

# Install from VirtualBox ?
If you are like me, you have got plenty of hard drives hanging around and never got an optical drive or an usb stick. One thing that could reveal itself to be hard is installing a new Operating System on any machine without any of the two I mentionned earlier.

In this short tips and tricks post, I will show you how you can use VirtualBox raw disks feature (I guess here for compatibility with VMWare) to install a new Operating System from your old one (yes, without the 10 minutes part were you can do nothing else with your computer).

# Prerequisites

What you will need in order for this to work :

 * a Linux setup with root access (sudoing will be fine)
 * a second hard drive where you want to put your brand new Operating System
 * ISO file of the OS you want to install

# Install

First of all, install VirtualBox on your system (`yum`, `apt-get`, whatever your package system is).
Then you will need to find out what is the identifier of the drive you want to use as a new (`sudo fdisk -l` can tell you everything you need to know about your disks).

In my example lets say I want to install on a 300GB hard drive, I got this `fdisk` output

    cgatay@cgatay2:~$ sudo fdisk -l
    [sudo] password for cgatay:

    Disk /dev/sda: 251.1 GB, 251059544064 bytes
    255 heads, 63 sectors/track, 30522 cylinders, total 490350672 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x000efa30

       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1   *        2048   489302015   244649984   83  Linux
    /dev/sda2       489304062   490348543      522241    5  Extended
    /dev/sda5       489304064   490348543      522240   82  Linux swap / Solaris

    Disk /dev/sdb: 400.1 GB, 400088457216 bytes
    255 heads, 63 sectors/track, 48641 cylinders, total 781422768 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x0003f041

       Device Boot      Start         End      Blocks   Id  System
    /dev/sdb1   *          63   390627047   195313492+   7  HPFS/NTFS/exFAT
    /dev/sdb2       390627048   781422767   195397860    c  W95 FAT32 (LBA)

    Disk /dev/sdc: 1000.2 GB, 1000204886016 bytes
    255 heads, 63 sectors/track, 121601 cylinders, total 1953525168 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x00048185

       Device Boot      Start         End      Blocks   Id  System
    /dev/sdc1   *        2048      499711      248832   83  Linux
    /dev/sdc2          499712  1952790527   976145408   83  Linux
    /dev/sdc3      1952792574  1953523711      365569    5  Extended
    /dev/sdc5      1952792576  1953523711      365568   82  Linux swap / Solaris

    Disk /dev/sdd: 300.1 GB, 300090728448 bytes
    255 heads, 63 sectors/track, 36483 cylinders, total 586114704 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x000cb074

       Device Boot      Start         End      Blocks   Id  System
    /dev/sdd1   *        2048   574060543   287029248   83  Linux
    /dev/sdd2       574062590   586113023     6025217    5  Extended
    /dev/sdd5       574062592   586113023     6025216   82  Linux swap / Solaris

The interesting line is the one stating `Disk /dev/sdd: 300.1 GB`. From now on I will use /dev/sdd as the target of my install.

For the rest of the commands to work you need to run everything as root (by sudoing), I think there is more "cleaner" way of doing this by correctly setting `suid` flags but I did not took the time to look after this.

You need to create the hard disk file that will point to your physical install, then launch VirtualBox as root (there is a lot of chances that your regular user can't do everything he wants on a device):

    sudo VBoxManage internalcommands createrawvmdk -filename disk.vmdk -rawdisk /dev/sdd; #replace /dev/sdd with your device
    sudo VirtualBox;

From there, this is a simple VirtualBox machine setup, you just need to select the created disk.vmdk file for the hard disk of your Virtual Machine, mount the ISO and proceed with the install. At the end of the install, you can shut down the VirtualMachine, reboot your computer and use the boot selection menu of your bios (or change the boot order) to boot directly on your newly installed system.

If you are on a Linux system, you can issue a `update-grub` that will detect all your operating systems and will create the boot menu (you can still boot your old one this way).

# Disclaimer

This method has been tested multiple times for installing Windows as well as Linuxes without any hurt. However, it might kill kitten or trigger a nuclear war if used incorrectly, in such cases, I decline responsibility.

# Thoughts

As a side note, I think a Linux host is not required, you can achieve the same with a Windows operating system, the command line surely just need some improvements to point to the physical disk.
