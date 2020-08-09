---
title: Integrating CKEditor with Rails asset pipeline.
menuTitle: Integrating CKEditor with Rails asset pipeline.
subTitle: Integrating CKEditor plugin into rails asset pipeline.
postDescription: Integrating CKEditor plugin into rails asset pipeline.
category: Tech
---
We are using [ckeditor](http://ckeditor.com/) in our rails application (Rails 4.2).

Number of network calls made by the ckeditor and its plugins are quite alot and we were facing difficulty in integrating them with the Rails asset pipeline.

My initial approach is to use a [ckeditor rails gem](https://github.com/tsechingho/ckeditor-rails). However getting it to work was complicated. On top of it we had some custom plugins written for ckeditor and making it to work with ckeditor rails gem was almost impossible.

Taking some pointers from this [issue](https://github.com/galetahub/ckeditor/issues/307) finally could get into some working solution.

1.  Move all the CKEditor files into vendor/assets/javascript/ckeditor
2.  In application.js add
    
    //= require ckeditor/ckeditor
    
3.  ckeditor.js looks up for other ckeditor relative to CKEDITOR\_BASEPATH location. So before loading ckeditor in JS add a line to set that environment variable.
    
    window.CKEDITOR\_BASEPATH = '/assets/ckeditor/';
    
4.  Add
    
    config.assets.precompile << \['ckeditor/\*'\]
    
    to your application.rb file.
5.  Finally add a file called precompile\_hook.rake This rake task will help in compiling the ckeditor files and add it to the assets folder. The content of the rake task is here. [precompile\_hook.rake](https://gist.github.com/prasann/c8978041777cb443fb77)

  

Here is the screenshot of the network calls before and after adding ckeditor to asset pipeline.

  

 [![Before adding to asset pipeline](/assets/images/posts/add_ckeditor_to_rails/thumbs/before.png)](/assets/images/posts/add_ckeditor_to_rails/full/before.png "Before adding to asset pipeline") [![After adding to asset pipeline](/assets/images/posts/add_ckeditor_to_rails/thumbs/after.png)](/assets/images/posts/add_ckeditor_to_rails/full/after.png "After adding to asset pipeline") 

Even after adding ckeditor to asset pipeline the it did not effectively reduce all calls into one. Still the ckeditor's plugin calls are been fired separately.