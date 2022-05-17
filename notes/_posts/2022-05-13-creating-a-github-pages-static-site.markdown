---
layout: post
title: "Painless Static Website Hosting with Github Pages and Jekyll"
tags: Jekyll
---

Github pages is a great (and free!) way to set up a static website for your portfolio or blog. You can configure it
to host any static content, but generating that content is up to you. That being said, Github pages has built-in integration with Jekyll.

Jekyll allows you to create reusable HTML components that are processed and turned into static content. Similar to PHP you can intersperse a scripting language, Liquid, with HTML. The difference being the processing happens once when Github receives a new code commit, rather than every time a client requests a page. When you are developing locally the processing happens when a watchdog sees that a file has been edited. 

---

In order to preview how your static site will look before unveiling it to the wider world you should setup a local development environment. 
It will allow you to work much faster, and catch any glaring mistakes before they are published. 

The easiest way to use Jekyll is in a Linux environment. If you have a Linux system already skip to step 1. If you have a Windows machine, you'll want to use a Virtual Machine or look into using Linux subsystem for Windows. 

There is apparently an unoffocial way to use Jekyll on Windows natively, but I have not tried it. Mac users can enjoy a Linux-like terminal built in, so I will include steps for that as well. 

## 0. Setup a Ubuntu 20.04 Virtual Machine (Windows Host) 
* Download [Ubuntu 20.04 desktop official release](https://releases.ubuntu.com/20.04/) .iso file
* Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Setup your Virtual Machine (VM) following [Ubuntu's guide](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) for usage with VirtualBox

The following steps will be for *inside* a Linux environment or in your MacOs terminal

---

## 1 Setup (Linux or MacOs)

Github has created a *gem*, a *ruby* package, that will take care of installing the correct version of Jekyll that Github Pages uses. You want to be using the 
same version so that your local development preview will match what Github serves once your code is committed and processed

### 1.1 Install Ruby (Linux)

To install the Github pages *gem* we need to use the right *ruby* version. At the following page find the needed *ruby* version

[https://pages.github.com/versions/](https://pages.github.com/versions/)

At the time of writing this was *ruby 2.7.3*

Since we have to install a specific *ruby* version we need Ruby Version Manager (RVM), which will handle the *ruby* installation and allow multiple versions of *ruby* to co-exist on your Linux system

#### 1.1.1 Install RVM (Linux)
Please follow [https://github.com/rvm/ubuntu_rvm](https://github.com/rvm/ubuntu_rvm) in order to install RVM. The following shows the RVM version I used
```
rvm -v

Output:
rvm 1.29.12 (manual) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
```

#### 1.1.2 Use RVM to install needed ruby (Linux)
Find a ruby version known to RVM that is closest to the needed version
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

### 1.1 Install Ruby (MacOs)
If you are a Mac user, I found *ruby-install* combined with *chruby* to be a little easier to install/manage ruby. You will need [Homebrew](https://brew.sh/) in order to do this. Check your brew installation with:

```
brew -v

Output: 
Homebrew 3.4.11
Homebrew/homebrew-core (git revision 35b894d9c54; last commit 2022-05-17)
```

First of all, your Mac probably already has a system ruby installed so check the version with:
```
ruby -v

Output:
ruby 2.6.8p205 (2021-07-07 revision 67951) [universal.x86_64-darwin21]
```
Unfortunately, this is not the version required by Github. Check [here](https://pages.github.com/versions/) for that version. At the time of writing this was 2.7.3. Otherwise you could stop here and skip to step 1.2

#### 1.1.1 Install [chruby](https://github.com/postmodern/chruby#readme) (MacOs)
```
brew install chruby

Output:
(Installation stuff...)
Add the following to the ~/.bash_profile or ~/.zshrc file:
  source /usr/local/opt/chruby/share/chruby/chruby.sh
(...More installation stuff...)
```
Notice the line from the output that instructs us to add a line to "~/.bash_profile" or "~/.zshrc." Let's do so. For newer Macs the terminal is [ZSH](https://apple.stackexchange.com/questions/388622/zsh-zprofile-zshrc-zlogin-what-goes-where), so you'll want to use "~/.zshrc." The following will create the file if it doesn't exist, or append to it
```
echo "source /usr/local/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
cat ~/.zshrc

Output:
source /usr/local/opt/chruby/share/chruby/chruby.sh
```
Now restart your terminal by closing it and re-opening it and check that chruby exists
```
chruby --version

Output:
chruby: 0.3.9
```
#### 1.1.2 Install [ruby-install](https://github.com/postmodern/ruby-install#readme) (MacOs)
```
brew install ruby-install
ruby-install --version

Output:
ruby-install: 0.8.3
```
#### 1.1.3 Install ruby version using ruby-install (MacOs)
List available ruby versions
```
ruby-install 

Output:
Stable ruby versions:
  ruby:
    2.6.10
    2.7.6
    3.0.4
    3.1.2
  jruby:
    9.3.4.0
  rbx:
    5.0
  truffleruby:
    22.1.0
  truffleruby-graalvm:
    22.1.0
  mruby:
    3.0.0
```
Closest to 2.7.3 seems to be 2.7.6, so I will install that. This might take a minute if it requires compiling from source, which happened in my case
```
ruby-install 2.7.6

Output:
(Lots of downloading and compiling...)
>>> Successfully installed ruby 2.7.6 into /Users/sean/.rubies/ruby-2.7.6
```
Now we will use *chruby* to switch from the system *ruby* to the one we just downloaded. First you must restart your terminal in order for *chruby* to detect the newly downloaded version. Then list available rubies with:
```
chruby

Output:
   ruby-2.7.6
```
Now change to the new ruby version, you can leave off the "ruby-" prefix if you like
```
chruby 2.7.6
```
Run `chruby` again and you'll see that you have switched to your new version, indicated by the "*"
```
chruby

Output:
 * ruby-2.7.6
```
You can also `ruby -v` to confirm that your terminal environment has switched
```
ruby -v

Output:
ruby 2.7.6p219 (2022-04-12 revision c9c2245c0a) [x86_64-darwin21]
```
This will last while you keep your terminal open, you'll need to setup [auto-switching](https://github.com/postmodern/chruby#auto-switching) if you want to automatically switch to a version when you open a new terminal or navigate to a project directory. Otherwise when you restart your terminal you'll need to run `chruby 2.7.6` again

The following steps assume you have switched to the ruby version you need in your terminal
### 1.2 Install bundler (Linux or MacOs)
Github recommends that you use [bundler](https://bundler.io/) to install Jekyll, so we'll have to do that first
```
gem install bundler
bundle -v

Output:
Bundler version 2.3.12
```
Note: confusingly, you can use `bundle` and `bundler` commands interchangeably. For example:
```
bundler -v

Output:
Bundler version 2.3.12
```
I will be using `bundle` since it is one less letter to type
### 1.3 Install Github Pages Gem (Linux or MacOs)
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

### 1.4 Create Jekyll Scaffold (Linux or MacOs)
We have installed the exact Jekyll version we need. Now we can use it to create the static site scaffolding using the `jekyll new` command 
```
bundle exec jekyll new --force .

Output: 
New jekyll site installed in /home/sean/Projects/kublasean.github.io
Bundle install skipped. 
```

* `bundle exec` is a prefix that uses bundler to run the version of Jekyll from our Gemfile (as opposed to say, a system Jekyll installation)
* `jekyll new` is the command to build our site scaffold
* The `--force` flag is necessary because we are running `jekyll new` in a directory that already exists (the current directory indicated by the period)

After running that command observe the new directory structure of your project
```
ls

Output: 
404.html  about.md  _config.yml  Gemfile  Gemfile.lock  index.md  LICENSE  _posts
```
This is the skeleton of your new website, congrats!!! Take a look [here](https://jekyllrb.com/docs/structure/) briefly to get a basic understanding of the newly generated files and directories

References:
* [using jekyll with bundler](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/)
* [github pages instructions issue](https://github.com/github/docs/issues/2177#issuecomment-755256507)

---

## 2 Development Cycle (Linux or MacOs)
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
Ctrl-click that link and you should be taken to the home page for your site. Cool!!!!

As you make changes to your Jekyll scaffolding the relevant pages will be re-loaded as long as that process is running in the terminal

Note: you DO have to restart the server (cntrl-c and re-run `jekyll serve`) after modifying the _config.yml file

---

## 3 Deployment (Linux or MacOs)
If you are like me, and want to serve the site from the root of the master branch, all you have to do is a normal `git commit` and `git push` whenever you're ready to publish changes to the world-at-large

Take a look [here](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for more info on using an alternate branch or sub-directory in your repo
