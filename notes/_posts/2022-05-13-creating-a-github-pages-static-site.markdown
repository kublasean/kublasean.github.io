---
layout: post
title: "Creating a Github Pages Static Website Using Jekyll"
tags: jekyll
---

Github pages is a great (and free!) way to set up a static website for your portfolio or blog. You can configure 
to host any static content, but generating that content is up to you. That being said, it does have built-in integration with Jekyll and I think that is a great place to get started.

Jekyll allows you to create reusable HTML components that are processed and turned into static content. Similar to PHP you can intersperse a scripting language, Liquid, with HTML. The difference being the processing happens once when Github receives a new code commit, rather than every time a client requests a page. When you are developing locally the processing happens when a watchdog sees that a file has been edited. 

---

In order to preview how your static site will look before unveiling it to the wider world you should setup a local development environment. 
It will allow you to work much faster, and catch any glaring mistakes before they are published. 

The easiest way to use Jekyll is in a Linux environment. If you have a Linux system already, congrats you can skip step 0. If you have a Windows machine, you'll want to use a Virtual Machine or look into using Linux subsystem for Windows. 

There is apparently an unoffocial way to use Jekyll on Windows natively, but I have not tried it. Also, sorry MacOs users but I have not figured out the MacOs workflow just yet. Look out for another post later on that. 

## 0. Setup a Ubuntu 20.4 Virtual Machine (Windows Host) 
* download [official release](https://releases.ubuntu.com/20.04/) .iso file
* download [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* setup your Virtual Machine (VM) following [Ubuntu's guide](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview)

The following steps will be for *inside* your Linux environment

---

## 1 Setup (Linux)

Github has created a *gem*, a *ruby* package, that will take care of installing the correct version of Jekyll that Github Pages uses. You want to be using the 
same version so that your local development preview will match what Github serves once your code is committed and processed

### 1.1 Install Ruby

To install the Github pages *gem* we need to use the right *ruby* version. At the following page find the needed *ruby* version

[https://pages.github.com/versions/](https://pages.github.com/versions/)

At the time of writing this was *ruby 2.7.3*

Since we have to install a specific *ruby* version we need Ruby Version Manager (RVM), which will handle the *ruby* installation and allow multiple versions of *ruby* to co-exist on your Linux system

#### 1.1.1 Install RVM
Please follow [https://github.com/rvm/ubuntu_rvm](https://github.com/rvm/ubuntu_rvm) in order to install RVM. The following shows the RVM version I used
```
rvm -v

Output:
rvm 1.29.12 (manual) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
```

#### 1.1.2 Use RVM to install needed ruby
Find ruby version known to RVM that is closest to needed version
```
rvm list known

Output:
# MRI Rubies
[ruby-]1.8.6[-p420]
[ruby-]1.8.7[-head] # security released on head
[ruby-]1.9.1[-p431]
[ruby-]1.9.2[-p330]
[ruby-]1.9.3[-p551]
[ruby-]2.0.0[-p648]
[ruby-]2.1[.10]
[ruby-]2.2[.10]
[ruby-]2.3[.8]
[ruby-]2.4[.10]
[ruby-]2.5[.8]
[ruby-]2.6[.6]
[ruby-]2.7[.2]
[ruby-]3[.0.0]
ruby-head
...many more
```
From list I don't see 2.7.3 exactly - but 2.7.2 is close enough to pray it will work. Install the closest found version, and check that ruby was installed and activated
```
rvm install ruby-2.7.2
rvm use 2.7.2
ruby -v

Output:
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-linux]
```

### 1.2 Install bundler 
Github recommends that you use [bundler](https://bundler.io/) to install Jekyll, so we'll have to do that first
```
gem install bundler
bundle -v

Output:
Bundler version 2.3.12
```
Note: confusingly, you can use `bundle` and `bundler` interchangeably. For example:
```
bundler -v

Output:
Bundler version 2.3.12
```
### 1.3 Install Github Pages Gem
Navigate to where you want your site to be built. I simply used the top-level directory of my Github repository for the project. Then run `bundle init`
```
cd ~/Projects/kublasean.github.io           <---my github repo for the site
bundle init
```
This creates a *Gemfile* in which we can put the Github pages *gem* that specifies all the dependencies we need. Put the following line in your Gemfile
```
gem "github-pages", "~> 226", group: :jekyll_plugins
```
Replace "226" with the latest github-pages version from [the github pages dependency list](https://pages.github.com/versions/). Now install said dependencies by running
```
bundle install 
```

### 1.4 Create Jekyll Scaffold
We have installed the exact Jekyll version we need. Now we can use it to create the static site scaffolding using the `jekyll new` command 
```
bundle exec jekyll new --force .

Output: 
New jekyll site installed in /home/sean/Projects/kublasean.github.io
Bundle install skipped. 
```

* `bundle exec` is a prefix that uses bundler to run the version of jekyll from our Gemfile (as opposed to say, a system jekyll installation)
* `jekyll new` is the command to build our site scaffold
* The `--force` flag is necessary because we are running `jekyll new` in a directory that already exists (the current directory indicated by the period)

After running that command observe the new directory structure of your project
```
ls

Output: 
404.html  about.md  _config.yml  Gemfile  Gemfile.lock  index.md  LICENSE  _posts
```
This is the beginning of your new website, congrats!!! Take a look [here](https://jekyllrb.com/docs/structure/) briefly to get a basic understand of the newly generated files and directories

References:
* [using jekyll with bundler](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/)
* [github pages instructions issue](https://github.com/github/docs/issues/2177#issuecomment-755256507)

---

## 2 Development Cycle
If you have set everything up correctly you should now be able to locally host your new static website with `jekyll serve`. Run this in the top-level directory of your site
```
bundle exec jekyll serve

Output: 
Configuration file: /home/sean/Projects/kublasean.github.io/_config.yml
            Source: /home/sean/Projects/kublasean.github.io
       Destination: /home/sean/Projects/kublasean.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.477 seconds.
 Auto-regeneration: enabled for '/home/sean/Projects/kublasean.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```
Ctrl-click that link and you should be taken to the home page for your site. Cool!

As you make changes to your jekyll scaffolding the relevant pages will be re-loaded as long as that process is running in the terminal

Note: you DO have to restart the server (cntrl-c and re-run `jekyll serve`) after modifying the _config.yml file

---

## 3 Deployment
If you are like me, and want to serve the site from the root of the master branch, all you have to do is a normal `git commit` and `git push` whenever you're ready to publish changes to the world-at-large

Take a look [here](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for more info on using an alternate branch or sub-directory in your repo