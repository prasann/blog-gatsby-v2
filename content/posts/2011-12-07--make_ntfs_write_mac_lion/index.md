---
title: Make your NTFS drive writable under Mac Lion
menuTitle: Make your NTFS drive writable under Mac Lion
subTitle: Make your NTFS drive writabe under mac lion.
postDescription: Make your NTFS drive writabe under mac lion.
category: Mac,Tech
---
Just now i got my new MBP pre loaded with Lion OSX and one of the surprises i stepped onto is NTFS write issue on the Mac.

Based on a few blog posts and comments I managed to find a way that worked for me, so I thought I’d put it all here in one place for others.

**Pre requisites:**

Get [HomeBrew](http://mxcl.github.com/homebrew/ "homebrew") installed in your machine. And of course this needs XCode tools to be installed.

**Steps:**

1) Install latest Fuse4X (a fork of MacFUSE) and NTFS-3G packages:

brew install fuse4x
brew install ntfs-3g

2) Type brew info fuse4x-kext in the terminal. You will be shown a message similar to this:

In order for FUSE-based filesystems to work, the fuse4x kernel extension
must be installed by the root user:
sudo cp -rfX /usr/local/Cellar/fuse4x-kext/0.8.13/Library/Extensions/fuse4x.kext /System/Library/Extensions
sudo chmod +s /System/Library/Extensions/fuse4x.kext/Support/load\_fuse4x

Perform both the operation.  
3) And after this i simply followed this [blog post entry](http://fernandoff.posterous.com/ntfs-write-support-on-osx-lion-with-ntfs-3g-f). Since you have already installed Fuse4x and ntfs-3g you can directly jump to

> "Ok, at this point you should have a functional fuse4x and ntfs-3g install."

and create an alternative

/sbin/ntfs\_mount

script as described there.  
And at last you got make one change to get things working.  
The script in the bog post is for MacPort users. For HomveBrew users you got to make this change.  
replace

/opt/local/bin/ntfs-3g

with

/usr/local/bin/ntfs-3g

And that's it. Just try mounting a NTFS drive and you should have write permissions to your drive. If you face any issues check out the log @

/var/log/ntfsmnt.log

or try re-booting the machine in the worst case.