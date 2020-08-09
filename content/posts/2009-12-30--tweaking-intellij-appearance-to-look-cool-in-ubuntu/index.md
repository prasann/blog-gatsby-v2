---
title: Tweaking IntelliJ appearance to look cool in Ubuntu
menuTitle: Tweaking IntelliJ appearance to look cool in Ubuntu
subTitle: Intellij is one of the most prominent Java IDE. Opitimising its appearance on Ubuntu is described in this post.
postDescription: Intellij is one of the most prominent Java IDE. Opitimising its appearance on Ubuntu is described in this post.
category: Intellij,Tech,Ubuntu,Tricks
---
When i initially installed IntelliJ in Ubuntu the font of the IDE really sucked. I couldn't able to concentrate on my work because of the freaking font style. After looking out various forums and blogs i finally did a revamp to my Intellij that looked perfect to me. Here is a screenshot of my IDEA after modification.  

 [![Intellj on Ubuntu](/assets/images/posts/tweaking-intellij-appearance-ubuntu/thumbs/image1.png)](/assets/images/posts/tweaking-intellij-appearance-ubuntu/full/image1.png "Intellj on Ubuntu") 

If you are facing same issues try out these steps and your life with IDEA will be much better.

*   Open the file idea.vmoptions.  
    _cd {IDEA directory}/bin_  
    _
    
    _sudo vim idea.vmoptions_
    
    _
    
    Add '_\-Dawt.useSystemAAFontSettings=on'_ (without quotes) to the end of file.
    
    Save and exit the editor.
    
*   Install [Inconsolata.ttf to Ubuntu.](/2009/12/install-inconsolata-ttf-in-ubuntujaunty/)
*   Goto _System -> Preferences -> Appearance_
*   Goto the Fonts tab and click on Details and set your Resolution to 120 DPI.
*   Open IntellijIDEA. Goto Project _Settings -> Colors & Fonts_ Select General tab and Click on the button near the Name textbox.
*   Uncheck the '_Show Only Monospaced Fonts_' . Now you will find Inconsolata in the list . Select **Inconsolata** as font , Set Size to **16** and Line Spacing to **1.0** then click on Apply.
*   Back in the _Settings_ menu choose Appearance and Select '**_Use Anti-Aliased Font in Editor_**' option.

Thats it. You are done.