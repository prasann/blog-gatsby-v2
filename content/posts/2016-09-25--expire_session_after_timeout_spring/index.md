---
title: Spring security session timeouts
subTitle: Setup session timeouts in spring security. This will explain how to setup the idle timeout and also the max timeout for separate sessions.
postDescription: Setup session timeouts in spring security. This will explain how to setup the idle timeout and also the max timeout for separate sessions.
category: Java
---
Using Spring security we were building an application which has 2 types of users Internal and External. Our requirement was

1.  Internal and External users have different idle timeouts.
2.  External user's session should be invalidated after 30 mins. Irrespective of whether the user is active or not.

#### Setting up Idle timeout in Spring security

Spring provides out of box option to configure an idle timeout value. This invalidation is done by Spring security and happens while making a request after specified amount of time.

We were able to achieve this by setting up setMaxInactiveIntervalInSeconds on the session object while creation.

#### Setting up Max timeout in Spring security

The above technique can be used only for setting the idle time. But our second scenario is to invalidate the session irrespective of whether the user is active or not.

We ended up writing a custom filter which to invalidate the session manually whenever the session age is greater than the specified value.

This filter will invalidate the session when the maximum time has reached for that session.