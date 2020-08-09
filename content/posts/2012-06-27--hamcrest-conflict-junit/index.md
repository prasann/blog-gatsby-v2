---
title: Hamcrest conflict in jUnit.
menuTitle: Hamcrest conflict in jUnit.
subTitle: Hamcrest matchers are used in jUnit for assertions. There is a weird problem with the version conflict between Hamcrest and jUnit. The solution is been discussed here.
postDescription: Hamcrest matchers are used in jUnit for assertions. There is a weird problem with the version conflict between Hamcrest and jUnit. The solution is been discussed here.
category: Java,Tech
---
Using jUnit 4.8 i got into an issue when testing the few [lambda](http://code.google.com/p/lambdaj/ "LambdaJ") expressions. I was constantly getting this error while testing code involving Hamcrest matchers.

java.lang.NoSuchMethodError: org.hamcrest.core.AllOf.allOf(Lorg/hamcrest/Matcher;Lorg/hamcrest/Matcher;)Lorg/hamcrest/Matcher;

However when i ran the application it was all fine. So i could sense the issue with the jUnit.

The problem is due to hamcrest versioning issue with jUnit. jUnit uses an old version while other libraries (in my case LambdaJ) was using the latest version. The fix will be to download the junit-dep-4.\*.jar from the jUnit [download](https://github.com/KentBeck/junit/downloads "gitHub kent beck") page. Since you app already have Hamcrest class the test will run smoothly.