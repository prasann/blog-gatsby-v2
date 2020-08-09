---
title: Slicing Microservices
subTitle: Writing a custom error handler to handle all the exceptions that are thrown within the express application. 
postDescription: Handling exceptions in an express application, responding back with standard error response.
category: node
draft: true
---

# Slicing Microservices

Building applications using micro-services are becoming a default go-to architecture these days. I have been part of few teams that build and deploy micro-services in a large scale. One question that was always asked within the team is  "Did we slice it right?" 

Slicing a micro-service refers to defining the boundaries of the micro-service. What should the service be responsible for,  what kind of data should it hold, when it should delegate it's responsibility to another micro-service.

Below are some of my experiences, that i have seen working.

## **When to do it**

One of the common behaviour we did in the teams I worked so far, is to let micro-services evolve organically. We add feature/capabilities to the existing service and later trim down the service by spawning a new one. 

Some of the benefits,

- No need of upfront discussion. Most likely we will have lesser information about the feature, then likely that our design might reflect the incompetencies.
- Spawning a new service will have it's own cost. How much ever you automate, it still adds up the infrastructure cost, maintenance cost. If we are wrong about the slicing then we had to spend some more time and effort to unify it with some other service.
- Once we have built a feature, most of the people in the team will understand the use-case and will have appreciate the need of a separate service. It doesn't become a single person's decision or a group of architect's decision. But a decision that comes from ground up. There  is a better chance for the service the retain it's shape when it grew this way.

This approach does require a good discipline in having a constant check on the growth of a service. A highly coupled service is very hard to break down later. And if we are too late to cut down a service, it might become an expensive operation too.

## **How to do it**

Here are some of the themes i have come across. I will try to explain with the scenario of add-to-cart application.

### **Entity based slicing**

Very common and obvious start for a new service. Example, `UserService` dealing with the CRUD of a `User` entity in the system. 

It's easy to draw boundaries as entities, since it's intuitive for people to see the separation. But whether it's right? is highly questionable and depends a lot on the use case.

One of the significant problems, i have seen is that these services will be very much in demand by other service. They entire network becomes very chatty. One can assume the `User` entity will be very much needed at each and every step of the application and will be called many times. Worst, is when the services decided to retain their copy of the data to enhance the performance of the application.

Orchestrator will become a monolith

### Journey based slicing

Works well for small, independent flows.

Will end up with common data being duplicated.

### Best of both worlds

Do entity based layering and apply journey based slicing on the top.

Teams owning journeys and not just entities.

#Establish contract testing across services

Entity services should be more lenient.

Avoid journry team calling other journey teams.

Build composite entities wherever needed.
