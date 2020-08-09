---
title: Add Redux custom middleware dynamically
subTitle: Writing a custom middleware and injecting it on runtime. 
postDescription: Redux provides options to add behaviour through middlewares. Here is an example of dynamically adding middleware to the store.
category: Javascript
---
[Redux middlewares](https://redux.js.org/advanced/middleware) can be used for a variety of things. You can basically tap into a redux event and perform some action with it. Logging and analytics are very common use cases for Redux middleware.

In my case, I have a middleware component, that needs to be injected while initializing the Redux store. The middleware component will be served dynamically when the app loads.

### Exporting the middleware component

This middleware detects a specific redux action and persist an information to the local storage. It's a custom middleware with a minimal change. This custom function takes in `middlewareAPI` as the parameter instead of having the state.
```js
  const persistInfo = middlewareAPI => next => (action) => {
    if (action.type === "SOME_ACTION") {
      const result = next(action);
      const state =
            JSON.stringify(middlewareAPI.getState().listen.value);
      window.localStorage.setItem('PERSIST_THIS_INFO', state);
      return result;
    }
    return next(action);
  };
  
  export default persistInfo;
  
```

### Loading the custom middleware

Here is a small utility function that can take in a custom middleware and initialize the store.
```js
  import { createStore, compose } from 'redux';
  import reducers from './reducers';
  
  class Store {
      constructor() {
        const composeEnhancers =
          typeof window === 'object' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
  
        this.store = createStore(reducers);
      }
    
      instance() {
        return this.store;
      }
    
      addMiddleware(middleware) {
        const middlewareAPI = {
          getState: this.store.getState,
          dispatch: action => this.store.dispatch(action),
        };
        this.store.dispatch = compose(middleware(middlewareAPI))(this.store.dispatch);
      }
    }
    export default new Store();
```      
  

This is my store class with the store initialization happens in the constructor. Simply, importing this store class and calling the `addMiddleware` function it's possible to inject the custom middleware component to your redux store.