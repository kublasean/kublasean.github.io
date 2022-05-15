---
layout: post
title: "VirtualBox 6.1 Shared Folders Configuration for Ubuntu 20.04"
tag: VirtualBox
---

I often find the need to copy files from my Windows host machine to my Ubuntu 20.04 VirtualBox VM. Here's how I set up a shared folder to do just that

## 1. VirtualBox Configuration
* Boot up VirtualBox and select the VM you want to add a shared folder to

* Open "Settings > Shared Folders" 

![shared-folders-settings](/notes/img/virtualbox_sharedfolder_01.PNG)

* Click the folder with the "+" to add a new shared folder
* Select where the host folder is, and check the box to auto-mount the shared folder 

!["new-shared-folder-settings"](/notes/img/virtualbox_sharedfolder_02.PNG)

* Click "OK"

## 2. Ubuntu VM Configuration
Launch your VM. You should see a new location mounted in your filesystem

 ![new-folder-appears](/notes/img/virtualbox_sharedfolder_03.PNG)

To make access easier, add yourself to the vboxsf group. In a terminal run:
```
sudo adduser $USER vboxsf

Output:
[sudo] password for sean: 
Adding user `sean' to group `vboxsf' ...
Adding user sean to group vboxsf
Done.
```

Now reboot your VM. After restarting you should be able to view views in the shared folder without having to change to *root*

 ![viewing-new-folder](/notes/img/virtualbox_sharedfolder_04.PNG)