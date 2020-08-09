---
title: Storing a function in the Redux store
subTitle: Serialize JS functions to make it persistent in Redux store.
postDescription: Redux state can be very useful to share data across the application. This post is about storing a function inside the redux store.
category: Redux
---
[Redux](https://redux.js.org/) is a predictable state container for Javascript. Redux state has to be serializable all the time.

Object serialization is the process of converting an object's state to a string from which it can later be restored.

So, if you are trying to store a function inside the Redux state, you need to serialize them before persisting.

> Storing functions inside redux state is not a best practice in general. So try to avoid it.

Javascript functions can be serialized quite easily, the challenge is in retrieving them from the store to execute.

Below are the helper functions for persisting functions inside Redux state.

```js
  //Returns a string
  export const serializeFunction = (func) => (func.toString());
  //serializeFunction(()=>console.log('Hello!!'))
  // Output ==> "()=>console.log('Hello!!')"
```  

The function to be stored in the state should be converted into string using serializeFunction.

```js
  //Returns a function
  export const deserializeFunction = (funcString) => (new Function(\`return ${funcString}\`)());
```

Convert the string from the redux store into a function using deserializeFunction