---
title: Wiring Jasmine 2.0 with Phantom JS
menuTitle: Wiring Jasmine 2.0 with Phantom JS
subTitle: This post describes the steps that are necessary for to wire Jasmine 2.0 test suites with phantomJS.
postDescription: This post describes the steps that are necessary for to wire Jasmine 2.0 test suites with phantomJS.
category: Javascript,Tech
---
Briefed out the steps that i did to run my Jasmine test suite in my CI.

1.  Download phantomjs.exe (Our CI server was running in a Windows server). [Download link](http://phantomjs.org/download.html)
2.  Use [run-jasmine.js](https://gist.github.com/prasann/9972777). This runner code is taken from phantomJS example and modified to run Jasmine 2.0 and to format the output as we needed.
3.  Assuming phantomjs.exe, run-jasmine.js and SpecRunner.html (Specrunner file) are in the same level in a directory, execute this command

		phantomjs.exe run-jasmine.js SpecRunner.html \[--debug\]
	

The --debug is optional. If run on the debug mode it will print the stack trace of the failed specs and also prints all the specs that are been executed.

SpecRunner.html is very similar to the one that comes along with Jasmine 2.0 samples. The SpecRunner.html that comes with Jasmine 1.3 will not work, as the way of booting Jasmine is changed in the latest version. The only changes I made to the SpecRunner.html is to modify my src and spec file locations.