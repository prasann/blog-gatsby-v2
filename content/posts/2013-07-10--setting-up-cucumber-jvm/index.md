---
title: Setting up Cucumber-jvm
menuTitle: Setting up Cucumber-jvm
subTitle: Setting up cucumber BDD framework in your Java project.
postDescription: Setting up cucumber BDD framework in your Java project.
category: Tech,Java
---
[Cucumber JVM](https://github.com/cucumber/cucumber-jvm "Cucumber JVM") is Java implementation of Cucumber BDD.

### **Integrating into the Project**

The installation using maven is super simple, just add the dependency and you are ready to go. Make sure you add both command line interface (cucumber-core) and the IDE interface (cucumber-junit)

I was using Intellij and add Intellij Cucumber plugin, to make the navigations easier.

One thing i liked very much is the ability to add custom annotations to the feature. You can add a custom annotation and can create Before and After hook for them.

In .feature file

@Email
Feature:

In the step definitions file.

@Before({"@Email"})
@After({"@Email"})

### **Integrating with Spring**

For Spring integration you need to add one more component of the cucumber-jvm _(cucumber-spring)_

It is advisable to have a test runner class which can run all the feature files in one go especially when you are runnning in the CI.

The structure of the test runner class will be :

@RunWith(Cucumber.class)
public class CucumberAdapterTest {
}

Make sure to place all the feature files in the same package as of this Runner class. Or you can specify the path using the cucumber options, like this.

@RunWith(Cucumber.class)
@Cucumber.Options(features = "classpath:\*\*/\*.feature")
public class CucumberAdapterTest {
}

If you are placing all the step definition in other package you can add that to the annotation using glue attribute.

@RunWith(Cucumber.class)
@Cucumber.Options(features = "classpath:\*\*/\*", glue = {"path of the step definitions"})
public class CucumberAdapterTest {
}

This will look up for cucumber.xml file in the classpath. This xml file can hold all the bean definitions. My cucumber.xml was super simple.

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	http://www.springframework.org/schema/context 
	http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <import resource="classpath\*:/application-context.xml"/>

    <context:component-scan base-package="path of the step definition"/>
    <context:annotation-config/>
</beans>

The step defnitions can lie in a different package and make sure you use glue attribute to wire them in the Runner class.

public class StepDefinitions {
	@Autowired
	EntityRepository entityRepository;

	@Given("^Register a user$")
	public void registerUser() throws Throwable {

	}
}

### **Integrating with Spring Transactions**

One last thing that i wanted to do is to hook up Spring transactions. So all the data created by the features have to be removed after the test completes. So you can write independent tests without bothering about the data.

You can use '_txn_' annotation that comes with Cucumber-JVM. All you need to do is to wire up that package along with your adapter class.

@RunWith(Cucumber.class)
@Cucumber.Options(glue = {"cucumber.api.spring"})
public class CucumberAdapterTest {
}

and

@txn
Scenario: Some scenario to test