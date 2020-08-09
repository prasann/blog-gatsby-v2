---
title: Configuring Context name for an application
subTitle: Setting up a different context name than the WAR name for an application running in Tomcat
postDescription: Setting up a different context name than the WAR name for the Java application deployed in Tomcat server.
category: Java
---

Many times i have faced this necessity of  having a different Context name than that of the WAR name. Especially when i use Maven. And i also found that it is quite simple in Tomcat. While looking for it i found two approached for doing it. One using Context.xml and the other using Server.xml

**Problem Statement:** I have a WAR file myapp-build123.war and the app can be referred using _http://localhost:8080/myapp-build123_ but i need to refer my application as _http://localhost:8080/myapp_ So here is what im gonna do.

**Approach 1: _Context.xml_ (Recommended way)**

*   Create a Context file in ${TOMCAT\_HOME}/conf/Catalina/localhost directory. Name the file as myapp.xml (The file name should be the same as desired context name) The content of the file is given below.
  
```bash
<Context path="/somepath" docBase="/home/myapp-build123"/>
```

_Basically the path attribute is been ignored by Tomcat so if you want you can ignore it too._

_The docBase will contain the path of the WAR. Here i have placed my WAR file in the home directory._

*   An important thing to note here is that the WAR file cannot be placed inside the ${TOMCAT\_HOME}/webapps folder. If you place the WAR in the webapps folder then the war will get exploded with the same name as the WAR file and after that it is not possible to configure the Context name. So place the WAR anywhere in the system apart from ${TOMCAT\_HOME}/webapps folder.
  

*   Now its time to start the server and you will see a folder named myapp in the ${TOMCAT\_HOME}/webapps folder, containing the application files.
  

**Approach 2: Server.xml ( [Not Recommended](http://tomcat.apache.org/tomcat-6.0-doc/config/context.html) after Tomcat 4.x )**

*   Open the Server.xml file from ${TOMCAT\_HOME}/conf folder. Search for the Host tag and place the Context tag inside it.
  
```xml
<Host name="localhost"  appBase="webapps"
    unpackWARs="true" autoDeploy="true"
    xmlValidation="false" xmlNamespaceAware="false">
    <Context path="/myapp" docBase="/myapp-build123"/>
</Host>
```
*   In this scenario you can place the WAR file in the ${TOMCAT\_HOME}/webapps folder itself. And also it is possible to access the application by both the URLs, http://localhost:8080/myapp-build123 and http://localhost:8080/myapp.