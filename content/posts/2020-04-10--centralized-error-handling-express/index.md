---
title: Centralized error handling in Express applications.
subTitle: Writing a custom error handler to handle all the exceptions that are thrown within the express application. 
postDescription: Handling exceptions in an express application, responding back with standard error response.
category: node
draft: false
---

_**Note: All my examples are in typescript and there are million other ways to achieve similar result, this is just my way of doing things.**_

If you are looking to start a new application in express, go over to the express site, use [express-generator](https://expressjs.com/en/starter/generator.html) to create an application. 

## Error handling

By default, any errors that are thrown within your application, will be sent as a 500 response code, along with the error stack trace in the body. This was inconvenient for me since,

* I don't want the end-user to know the system stack trace.
* I want to use exceptions for errors like `BadRequest` `AuthExceptions` etc.

So, i decided to tweak the default behaviour and take control of error handling. If your use case is similar, then proceed with further steps.

### Custom error handler
Create your own custom ErrorHandler class (`error_handler.ts`), this will extend the node's [Error](https://nodejs.org/api/errors.html#errors_class_error) class.

```typescript
//error_handler.ts
export class AppError extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
```

Now in your application you can invoke this custom error handler by calling,

```typescript
new AppError(404, 'Unable to find the resource');
//or
new AppError(403, 'You are not authorized to perform this action');

```

### Wiring error interceptor into express application

Once you start throwing exceptions within your application, next step is to convert those errors into a meaningful response for the end-user. Express app provides a way to hook up a custom error 
handler into your application. A middleware that takes in 4 parameters is your way to add your custom error handler.

Let's add the custom error handler function in the same `error_handler.ts` class and export. This generic function will parse the thrown error and constructs appropriate response.

```typescript
//error_handler.ts
export const customErrorHandler = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({error: {message}});
};
```

```typescript
import express from 'express';
import customErrorHandler from 'error_handler';
const app = express();

// Other middlewares, routes... 

// Adding your custom error handler.
app.use((err, req, res, next) => {
  customErrorHandler(err, res);
});
```

Now, whenever any error that is thrown in the application will be caught by this error handler. This will in turn respond back with appropriate status code.

### Dealing with unknown errors

As you can see, the `customErrorHandler` has a limitation of handling only the errors that are of type `AppError` since it expects `statusCode` to be present in the error.
However, there will be `RuntimeExceptions` that will occur in the application. It's kind of hard to catch all these sort of errors in the application and re-throw them as custom errors.

So, we will improve our `customErrorHandler` to handle such `RuntimeExceptions`.

```typescript
//error_handler.ts
const handleKnownExceptions = (err, res) => {
    //log it
    const { statusCode, message } = err;
    res.status(statusCode).json({error: {message});
};

const handleUnknownExceptions = (err, res) => {
    //log it
    res.status(500).json({ error: {message: 'Something went wrong.' }});
};

export const customErrorHandler = (err, res) => {
    err instanceof AppError ? handleKnownExceptions(err, res) : handleUnknownExceptions(err, res);
};
```

Now, we introduced one more way of handling errors. If the caught error is not that of ours (`AppError`) then we respond back with a 500 response. 
We don't want our end user to know about the system internals and hence respond with a static message.


### Dealing with asynchronous routes

This centralized error handling will not work for the errors that are thrown in the `await` methods i.e, any error that are thrown in an async block will not reach our `customErrorHandler`.
This is a limitation with respect to express 4.x. 

As a workaround, you have to make the routes to be synchronous. Instead of changing all the routes to synchronous blocks i used this 
[middleware](https://github.com/Abazhenov/express-async-handler) to achieve a similar effect. Post wrapping my routes with this middleware, all the errors in async block will then reach our  `customErrorHandler`

Here is the [gist](https://gist.github.com/prasann/b6ad07b3962b6ea2953fef027df5d10b) to the final `error_handler.ts`


