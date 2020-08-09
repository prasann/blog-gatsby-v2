---
title: Post browser logs to server in an Angular app
menuTitle: Post browser logs to server in an Angular app
subTitle: This post describes about posting all the browser errors in an angular application to an endpoint. This will be helpful to analyse or debug issues.
postDescription: This post describes about posting all the browser errors in an angular application to an endpoint. This will be helpful to analyse or debug issues.
category: Tech,Angular
---
We were looking for an efficient way of capturing all the Javascript errors from browsers in our backend so it appears in our Kibana dashboard along with the server logs

We had a Angular 1.5.8 application in front of multiple micro-services endpoint. Any error in the angular application will appear in the browser console and we planned to push these logs back to the server.

#### Angular's _$exceptionHandler_

In order to catch all the exceptions, we have to override the $exceptionHandler component provided by angular. Only catch here is that, since we are overriding angular component we may not be able to inject $http or any other angular component in our overrides and doing so will throw a cyclic dependency issue.

#### Initial solution

We came up with an idea of injecting $injector and fetching $http using the same.

factory('$exceptionHandler', \['$log', '$window', '$injector',
                              ($log, $window, $injector)=> {
return (exception, cause) => {
  $log.error(exception, cause);
  try {
    const $http = $injector.get('$http');
    const logMessage = \[{
      level: 'error',
      message: exception.toString(),
      url: $window.location.href,
      stackTrace: exception.stack,
      currentTimestamp: Date.now()
    }\];
    $http.post('/log/message', logMessage);
  } catch (loggingError) {
    $log.log(loggingError);
  }
);
  

The above piece of code will work perfectly and will be able to post all the errors generated to an exposed endpoint.

But the problem is, if the $http.post throws any exception then it causes unrecoverable recursion and browser will hung.

In order to come out of that issue, we re wrote our http post logic using native JS syntax.

#### Final solution

Same code re written using native JS functions.

factory('$exceptionHandler', \['$log', '$window', '$injector', ($log, $window, $injector)=> {
return (exception, cause) => {
  $log.error(exception, cause);
  try {
    let commonHeaders = $injector.get('$http').defaults.headers.common;
    const logMessage = \[{
      level: 'error',
      message: exception.toString(),
      url: $window.location.href,
      stackTrace: exception.stack,
      currentTimestamp: Date.now()
    }\];
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/log/message');
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    for (let header in commonHeaders) {
      if (commonHeaders.hasOwnProperty(header)) {
        let headerValue = commonHeaders\[header\];
        if (angular.isFunction(headerValue)) {
          headerValue = headerValue();
        }
        xmlhttp.setRequestHeader(header, headerValue);
      }
    }
    xmlhttp.send(angular.toJson(logMessage));
  } catch (loggingError) {
    $log.log(loggingError);
  }
};  
});