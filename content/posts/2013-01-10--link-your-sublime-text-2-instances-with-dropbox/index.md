---
title: Link your Sublime Text 2 instances with Dropbox
menuTitle: Link your Sublime Text 2 instances with Dropbox
subTitle: Sublime text has a key mapping file where it stores all the shortcut. Here is a way to share your preferences and key maps across two machines using a dropbox account.
postDescription: Sublime text has a key mapping file where it stores all the shortcut. Here is a way to share your preferences and key maps across two machines using a dropbox account.
category: Tech
---
After started using **Sublime Text 2 (ST2)**, was completely head over heels for it. After using it for some time, figured out that ST2 uses a settings file to remember the plugins, open tabs etc. I was using my laptop (Mac) and sometimes uses my PC (Windows) do type blog post or some other stuff. So thought of giving a try in syncing these two using Dropbox folder.

The idea is to have the settings file in the Dropbox folder and to have a symlink in the OS to point to. This means whatever changes i did to a ST2 instance will reflect in my other instance too.

**Prerequisites:**

*   Install ST2 in both the machines.
*   Have a DropBox account and install the software in both the machines.

### **In Mac:**

Move the entire Sublime Text folder into the Dropbox folder.

mv '~/Library/Application\\ Support/Sublime\\ Text\\ 2/' '~/Dropbox/Sublime\\ Text\\ 2'

Next step is to create a symlink in the original location so that it the folder in the Dropbox will be used to store the settings.

ln -s '~/Library/Application\\ Support/Sublime\\ Text\\ 2' '~/Dropbox/Sublime\\ Text\\ 2'

### **In Windows:**

Windows don't have symlink concept. So we have to settle with [NTFS symbolic link](http://en.wikipedia.org/wiki/NTFS_symbolic_link "NTFS Junction Point")

mklink /J 'C:/Users/user\_name/Dropbox/Sublime Text 2' 'C:/User/user\_name/Applications/Sublime Text 2'

That's it, now you don't need to worry about the sync between these two instances.