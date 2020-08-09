---
title: Install Inconsolata.ttf in Ubuntu(Jaunty).
menuTitle: Install Inconsolata.ttf in Ubuntu(Jaunty).
subTitle: Inconsolata is dev friendly font used by devs for their code. This post is about installing Inconsolata tru type in Ubuntu - Jaunty.
postDescription: Inconsolata is dev friendly font used by devs for their code. This post is about installing Inconsolata tru type in Ubuntu - Jaunty.
category: Tech,Ubuntu
---
As developers tend to spend most of the time in front of IDEs it makes sense to pick up the best suited font for development. And i have seen most of the developers prefer to use monochrome fonts as it yields better feel while looking at the code. It is been now widely accepted by many developers to use Inconsolata as their development font. So better start using it and prove yourself geeky ;)  
When i tried to use Inconsolata with my IntellijIDEA i couldn't find the ttf type inconsolata. And Intellij supports only ttf types. After a long search i downloaded thr ODf type and converted it to ttf using a converter and then i had the issue of installing it to my Jaunty. And i took help of my dev friends out here to resolve stuffs. So thought of consolidating the steps together as it may reduce someone else's pain.

**Steps to install Inconsolata.ttf in Ubuntu(Jaunty).**

**Step 1:** Start with downloading inconsolata font. [Inconsolata.ttf](http://www.4shared.com/file/xnMYNL0w/Inconsolata.html)

**Step 2:**

mkdir /usr/share/fonts/truetype

cd /usr/share/fonts/truetype

sudo mkdir  ttf-inconsolata

**Step 3:** Copy the Inconsolata.ttf into the directory.

sudo cp ~/Desktop/Inconsolata.ttf ttf-inconsolata

**Step 4:** Now modify the permissions to allow it to be accessed by IDE's

cd ttf-inconsolata

sudo chmod 777 Inconsolata.ttf

**Step 5:**Its not over yet. Finally before going to the IDE you need to cache the font to make it accessible.

sudo fc-cache -f -v

This will show a list of fonts cached recently. Check whether Inconsolata.ttf is been cached.

Now you can keep staring at your code for a long time as it feels a lot better :)