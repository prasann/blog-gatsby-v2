---
title: Wiring Android Wheel Widget into your application.
menuTitle: Wiring Android Wheel Widget into your application.
subTitle: Wheel component in iOS is quite famous. Integrating a similar android-wheel to your android application.
postDescription: Wheel component in iOS is quite famous. Integrating a similar android-wheel to your android application.
category: Android,Tech
---
I just saw this widget ([Android Wheel](http://code.google.com/p/android-wheel/)) and instantly got attracted to it. Just wanted to get this into my app. So here are the steps i followed to integrate this into my application.

*   Import the project into Eclipse through Svn import (File->Import) from google-code (http://android-wheel.googlecode.com/svn/trunk)
*   Once you import the project in the Eclipse, Right click on the project -> Properties -> Choose android tab and check the IsLibrary option
*   Now Right click on your project -> Properties -> Choose android tab -> In the Library section add the imported project.
  

That's it you are good to go now. The Apps in the Wheel Demo are really good enough to guide you through.