---
title: UrlGenerationError after upgrading to Rails 4.2
menuTitle: UrlGenerationError after upgrading to Rails 4.2
subTitle: On a REST model new action, form_for tag breaks and raises UrlGenerationError after upgrading to Rails 4.2
postDescription: On a REST model new action, form_for tag breaks and raises UrlGenerationError after upgrading to Rails 4.2
category: Tech,Rails
---
On upgrading my rails app from 4.0 to 4.2.5 i steeped onto a wierd issue where my form\_for tag breaks and starts throwing exception.

A REST model on new action raised an UrlGenerationError exception because of the form\_for tag.

For ex: if User is a model my form\_for looked like this

    form\_for(@user, url: user\_path(@user)) do |f|
  

Raised exception was

    No route matches {:action=>"show", :controller=>"users", :id=>nil} missing required keys: \[:id\]
  

The @user object’s id is nil since it’s not yet saved in the database. Previously if it was nil that is been skipped by the the url generation. All these occurrences started throwing errors.

I have to change the form\_for tag to

    form\_for(@user) do |f|
  

This posts the form to default users\_path.

### Nested objects:

    form\_for(@user, url: user\_address\_path(@user, @address)) do |f|
  

was changed to

    form\_for(\[@user, @address\]) do |f|