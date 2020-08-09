---
title: Angular resource and http interceptor
menuTitle: Angular resource and http interceptor
subTitle: This post describe about the use of angular resource library along with http interceptor.
postDescription: This post describe about the use of angular resource library along with http interceptor.
category: Tech,Angular
---
Once you set up your project with angular and [ngResource](https://docs.angularjs.org/api/ngResource) you will be able to access $resource object.

$resource will serve as a factory which creates a resource object that lets you interact with RESTful services. You can call HTTP methods directly on this resource object.

In our application we will have a custom wrapper on top of the angular resource. This wrapper will provide ability for us to transform the object differently on success and error response.

All adapters will use the wrapper and all end points will overwrite the transform logic on success and error response.

'profile': {
  method: 'GET',
  params: {accountId: '@accountId'},
  transformRequest: (data) => {
    const moreParams = {newParams: data};
    return angular.toJson(moreParams);
  },
  successTransformResponse: (data, headers, status) => {
    // Handle parsing for HTTP status 200.
  },
  errorTransformResponse: (data, headers, status) => {
    // Depending on the status code handle transform logic.
  }
}
  

#### Handling generic error codes

So, next we have to handle generic error responses across the application. Error codes like 401 (Unauthorized), 503 (Service Unavailable) needs to be redirected to different pages.

The interceptors are service factories that are registered with the $httpProvider by adding them to the $httpProvider.interceptors array. The factory is called and injected with dependencies (if specified) and returns the interceptor.

$provide.factory('myHttpInterceptor', function($q, dep1, dep2) {
  return {
    'request': function(config) {
      // do something on success
      return config;
    },
    'responseError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  }
}
  

In the responseError method block, we used to handle all the generic error response code across the application.

#### Observation

I was expecting the code in HttpInterceptor to be executed before my transform logic in the resource wrapper. But i was wrong. Only after the resource transformation http interceptors are called. (Refer this [issue.](https://github.com/angular/angular.js/issues/7594 ))

So, whenever a service responds with 500 error, Http interceptor will redirect the user to a different page. However, this will not happen if there is an error in transformation logic. In order to circumvent this problem, we started writing our error transform response specifically for the error codes. This means that, our transformation logic will not be executed for our generic error codes and eventually it reaches http interceptor.

{{ site.data.comments }}