---
title: Expanding Amazon EBS Volume in a EC2 instance.
menuTitle: Expanding Amazon EBS Volume in a EC2 instance.
subTitle: Even after increasing the size of the EBS volume in the AWS console, the actual size of the EBS wasn't increased. Have to follow the following steps to grow the EBS size.
postDescription: Even after increasing the size of the EBS volume in the AWS console, the actual size of the EBS wasn't increased. Have to follow the following steps to grow the EBS size.
category: Tech,AWS
---
I had an AWS image which was created using an EC2 instance of size 8 GB. Whenever i try to launch an instance i usually change the storage size to something say 20 GB. But once the system is launched when i do a

df -h

i still see 8 GB and not 20 GB.

On further reading i understood i need to resize the disk size. So i did the same using

sudo resize2fs /dev/xvde1

But i was getting the following error:

 The filesystem is already \*\*\* blocks long. Nothing to do!

Then to reolve this issue i have to perform the following steps.

*   SSH to the machine.

fdisk /dev/xvde

*   You should be seeing this message.

WARNING: DOS-compatible mode is deprecated. It's strongly recommended to switch off the mode (command 'c') and change display units to sectors (command 'u')

*   Enter 'u' to change display units
*   Enter 'p' to view the current paritions.
*   Enter 'd' to delete current partitions.
*   Enter 'n' to create a new partition.
*   Enter 'p' to set it as primary partitions.
*   Enter '1' to set it as primary partitions.
*   Set the desired space. If nothing is given the entire space is allotted.
*   Enter 'a' to make it bootable.
*   Enter '1' and 'w' to write and save the changes.
*   Reboot the instance from AWS console.
*   Now if you resize the parition it worked all fine.

sudo resize2fs /dev/xvde1

Check the partition size, it should be all set with more space.