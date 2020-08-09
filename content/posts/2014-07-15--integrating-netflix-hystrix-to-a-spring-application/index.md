---
title: Integrating Netflix Hystrix to a Spring Application
menuTitle: Integrating Netflix Hystrix to a Spring Application
subTitle: Hystrix is a latency and fault-tolerance library from Netflix. This post describes how to integrate it with Spring Aspects to make the implementation simpler.
postDescription: Hystrix is a latency and fault-tolerance library from Netflix. This post describes how to integrate it with Spring Aspects to make the implementation simpler.
category: Tech,Java
---
After reading Martin Fowler's [Circuit breaker post](http://martinfowler.com/bliki/CircuitBreaker.html) i thought of implementing the same to my application. While looking for possible approaches to this solution i stepped onto Hystrix.

[Hystrix](https://github.com/Netflix/Hystrix) is a latency and fault tolerance library designed to isolate points of access to remote systems, services and 3rd party libraries, stop cascading failure. Using this implementing CircuitBreakers are quite straight forward.

To start with i wanted to measure the latency of the 3rd party calls that goes through my application. Mine was Java Spring applcation running in Tomcat. As per Hystrix documentation all the third party calls that need to be monitored are to be wrapped within a command. This command will be executed in a separate thread. Since all the 3rd party calls go through this layer it is easy to monitor those calls. It is also possible to define a fallback approach when a particular service call fails. And there by isolating these scenarios from the application code. More of how this works is explained in detail on [Hystrix wiki](https://github.com/Netflix/Hystrix/wiki)

The problem i had was i already have my application up and running. And all i need to do is just monitoring the 3rd party calls (as of now) Now integrating Hystrix meant i need to re design the 3rd party calls to introduce a middle layer to wrap them up.

I was thinking of writing Aspect based solution to wrap these calls throughout my application with an annotation.

To do this, make sure you have included Spring AOP in your application. Declare and define an annotation as shown below.

@Aspect
@Component
public class CircuitBreakerAspect {
 
 
    @Around("@annotation(com.example.Monitor)")
    public Object monitoringAround(final ProceedingJoinPoint aJoinPoint) throws Throwable {
        String theShortName = aJoinPoint.getSignature().toShortString();
        HystrixCommand.Setter theSetter =
                HystrixCommand.Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey(theShortName));
        theSetter = theSetter.andCommandKey(HystrixCommandKey.Factory.asKey(theShortName));
        HystrixCommand theCommand = new HystrixCommand(theSetter) {
            @Override
            protected Object run() throws Exception {
                try {
                    return aJoinPoint.proceed();
                } catch (Exception e) {
                    throw e;
                } catch (Throwable e) {
                    throw new Exception(e);
                }
            }
        };
        return theCommand.execute();
    }
}

Using Hystrix dashboard you can able to wire the views and could able to monitor the application. More about this is written [here](http://www.mirkosertic.de/doku.php/architecturedesign/springhystrix)

However this annotation approach can be used only for monitoring purposes or when you need to do similar actions for all the services. When i moved onto writing circuit breakers this cannor be done since all the service calls need its own fallback approaches. So in that case it was better to implement them as separate commands so all the code will fit within.