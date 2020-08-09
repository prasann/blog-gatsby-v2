---
title: Gradle, Spring MVC App.
menuTitle: Gradle, Spring MVC App.
subTitle: A skeleton sample app demostrating gradle set up with Spring MVC along with basic logging and deployment in tomcat environment.
postDescription: A skeleton sample app demostrating gradle set up with Spring MVC along with basic logging and deployment in tomcat environment.
category: Tech,Java
---
Will try to list down few of my learnings to set up a Spring MVC app with Gradle. And also this time i tried using Servlet 3.0 spec which means no .xml files for Spring configuration.

Refer to the [GitHub repo](https://github.com/prasann/GradleSpringApp) for the source code. I will be giving some notes on the code.

#### Create build.gradle file

build.gradle can be pretty much simple to start with. I started with adding java and war plugin followed by adding dependencies to the Spring artifacts. I have to define

runtime 'javax.servlet:jstl:1.2'

to make sure it doesn't get packaged as part of the war.

Then thought it will be awesome to start the application in one command instead of building the war and deploying it in local instance. After some initial searching landed onto this [Cargo plugin](https://github.com/bmuschko/gradle-cargo-plugin) This lets you to configure the server of your choice and get it working. So after doing some basic configuration got this working.

Now

gradle war cargoRunLocal

since the task name is not so user friendly, just added an alias to it.

task serve(dependsOn: cargoRunLocal) << {
}
	

#### Setup Spring

I decided to play around with Servlet 3.0 style of Spring configuration. This means that i do not need to create web.xml or applicationContext.xml files. Instead i can go with complete Java style configuration.

Application containers (tomcat 7+ in my case) will look for implementation of WebApplicationInitializer and will load that class on the startup. Initializer.java in my src will be equivalent for web.xml

MvcConfig.java will be equivalent to applicationContext.xml file. This contains all the bean initialization, property place holders and more.

As you can see most of the configurations are handled by annotations.

#### Setup Unit Tests

Setting up Unit tests are no different to Gradle. As i mentioned i have used Java style configuration for my Spring classes. So the style of testing my controllers will also be different.

InitControllerTest.java will be my controller test. I have initialized a mock web application in the

@Before

method and the rest of the stuff are handled by annotations.

#### Setup Logging

Setting up slf4j is quite straight forward. You have to add slf4j-log4j, log4j jars and add a log4j.properties to the

src/main/resources

In the log4j.properties you can define the way your appenders should work.