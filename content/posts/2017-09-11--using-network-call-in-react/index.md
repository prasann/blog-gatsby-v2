---
title: Asynchronous calls in React component
subTitle: Preferred way for loading data in async calls, and downsides of other options. 
postDescription: React documentation suggests to use componentDidMount for async calls. Here is the explanation of why you shouldn't do in constructor or in componentWillMount.
category: Javascript
---
All network calls that are necessary to load data needed by the component should go inside `componentDidMount()`

> ##### [From React docs](https://facebook.github.io/react/docs/react-component.html#componentdidmount)
> 
> componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

#### Why not inside `constructor()`?

*   If you make a fetch for a component in constructor, and the user navigates away from the page containing that component before the request completes, it will still try to setState on that component despite being unmounted, and React will throw an error.
*   If your component fails to load, still you will end up making an unnecessary server-request.

#### Why not in `componenentWillMount()`?

This function is invoked immediately before mounting occurs. So, obviously this appears to be a best place to place the call to load data. However that's not the case.

*   Even if you add the network call in componentWillMount, your request will almost certainly not finish before the component is rendered. There is no way to pause the rendering till the request returns. So you will end up re-rendering the component anyways.
*   This is the only lifecycle hook called on server rendering. So, if you are serving from the backend, this will be executed twice.