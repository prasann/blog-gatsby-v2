---
title: Testing APIary using Dredd.
menuTitle: Testing APIary using Dredd.
subTitle: Test API blueprint mardown files by simply hosting them on GitHub and setting up a pipeline in Travis CI.
postDescription: Test API blueprint mardown files by simply hosting them on GitHub and setting up a pipeline in Travis CI.
category: Tech
---
[API Blueprint](http://apiblueprint.org/) is a documentation-oriented API description language. A couple of semantical assumptions over the plain Markdown.

[Dredd](https://github.com/apiaryio/dredd) is a command-line tool for testing API documentation written in API Blueprint format against its backend implementation.

I could able to setup dredd quite easily on my Mac by installing Node and npm. However its not quite straight forward in Windows. I faced lots of difficulties while installing node, npm and dredd.

So i decided to use [Travis](http://travis-ci.org/) to setup the testing pipeline for my jobs. All i needed to do is to have a .travis.yml file to install node\_js and install dredd using npm.

Added a simple script file to run the dredd tool inside the job. And that's it. As part of the code i also checked in the API markdown files which will run againt the APIs