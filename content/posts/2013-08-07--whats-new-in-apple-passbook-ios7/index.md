---
title: What's new in Apple Passbook iOS7
menuTitle: What's new in Apple Passbook iOS7
subTitle: New features in passbook application in the iOS7.
postDescription: New features in passbook application in the iOS7.
category: Tech
---
I'm currently working in a project that integrated with iOS Passbook application to deliver digital passes to their users. Spent some time in investigating the changes to passbook application in iOS7 (beta 4). Here is a quick summary of it.

Apple listened to its user's feedback and have come with some features which increases the usability of the application.

**Add multiple passes to Passbook.**

Yes, you can able to add multiple passes to the Passbook application in one go. So, if you are issuing multiple passes to your users, probably have a page with all the passes and you can have download all link, which downloads all the passes in one shot.

**Delivery through Barcode.**

Apple have added one more delivery mechanism to the passbook. Currently you can deliver a pass through Safari browser (with vnd.apple.pkpass as header) or Through email attachment or to stream from your native iOS application. Now in the new passbook app they have added a barcode scanner. So the content of the pass can be crisped into a barcode and can be delivered to the Passbook application.

**Anchor tags at the back of the pass.**

Currently you can have links, but you cannot have link text. For example if you want to link [http://www.google.com](http://google.com) to 'Click here' it is not possible. But it will be possible from iOS7

**Expiration date for Passes.**

Now passes can have its own expiration date. It's a meta data that you can set and after that the passes will be destroyed from the Apple passbook automatically.

**Usage restriction by Geo location.**

You can restrict the usage of passes, within a specific geo location. For example if you are issuing a coupon, then you can make sure that your users could able to access the coupons within a specific geo co-ordinates.

All these are nice features that are provided in iOS7. So far i was happy with all these news, until i read that, ([Dev forum link](https://devforums.apple.com/thread/190987?tstart=0))

**The rendering algorithms are significantly different from the previous versions.**

This seems to be a major issue to me, since i have to now test the appearance of my pass with new version. And have to think about optimising the design across all the versions.