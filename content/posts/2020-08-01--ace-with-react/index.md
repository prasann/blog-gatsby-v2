---
title: ACE with React
subTitle: Integrating a single page application with atlassian connect express. 
postDescription: Atlassian connect express comes by default with handlebars, this post describes how to make it work with a SPA.
category: node
draft: false
---
## Atlassian Connect Express (ACE)

ACE is a toolkit in node.js to build atlassian connect apps. Like a JIRA, Confluence plugins. 

Best way to start with ACE is to bootstrap from `atlas-connect` Y[ou can follow the documentation here to get a sample app up and running in few minutes.](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/)

## ACE and handlebars

ACE is a wrapper on top of the [expressjs](https://expressjs.com/) and hence the application is pretty much an express application. The bootstrapped application will have both the frontend and the backend part.  For the frontend, ACE by default uses [handlebars](https://handlebarsjs.com/) as templating option.

When you make a API call, the server converts the handlebar templates into HTML and returns.

## Replace Handlebars views with a SPA

As you can see, the above mechanism isn't tailored to use any single page application. Luckily, ACE doesn't change lots of things from express and hence we can use the same technique to achieve the goal.

***In this example I'm choosing [React](https://reactjs.org/), however the technique is fairly the same for any SPA framework.*** Since the idea is fairly simple. Using the framework build the app and deliver it to the browser on the init api call. From then on, the app will be controlled by the browser.

## Up and running with React.

**1. Add a route to serve static files.**

To the already bootstrapped ACE project, i added a folder called client, and inside that I used [CRA](https://github.com/facebook/create-react-app) to bootstrap my React project. This will be my SPA. Make sure to keep  the built artifact within this folder. In my case it was `{ProjectRoot}/client/build/*`

Now in the express application's index.js need to modify the route to serve this page. In my case, i used [generalPages module](https://developer.atlassian.com/cloud/jira/software/modules/page/) of ACE. In `atlassian-connect.json` I have mentioned `url` to be `/init`

Here is the modified `/init` to serve the react app.

```jsx
app.get('/init', addon.authenticate(), (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/build/', 'index.html'));
});
```

you can import the path like this `import path from 'path';` 

2**. Configure static directories for express server.**

Next is to set the path variable for the express. You need to define the static directory for the express server to fetch the files from.

in `app.js` you can configure this.

```jsx
const app = express();
const addon = ace(app);

/* more config */

const staticDir = path.join(__dirname, 'public');
//*** This line is important **********//

app.use(express.static(path.join(__dirname, 'client', 'build')));

//*** This line is important **********//
app.use(express.static(staticDir));
```

Now, we have configured express to look into 2 different directories for static files.

**3. Include atlassian JS API as part of the SPA**

Lastly, we need to make a change in the client app. Jira/Confluence when they load their plugin, they expect the plugin to have `all.js` . This is the client side logic of ace. So, we need to include this as part of our React's `index.html` without this, ***the loader in Jira will never disappear***

In `client/public/index.html` add the script tag just below the body.

```jsx
<script
    src="https://connect-cdn.atl-paas.net/all.js"
    type="text/javascript"
    data-options="sizeToParent:true;resize:false"
></script>
```

You can read about more `data-options` [here](https://developer.atlassian.com/cloud/jira/software/about-the-javascript-api/).

That's it, you will now see the React application in the connect app. 

***Note:** In development mode, there isn't any hot reload in this case. If you make any changes to the react app, need to build the app manually. Ofcourse, you can modify the `package.json` to automate this, but `webpack-dev-server` isn't much helpful.*

## Authentication within the connect app

If you are planning to bundle few APIs along with the react app, then one of the harder thing to crack is authentication. This isn't documented very clearly anywhere.

ACE uses a JWT to authenticate api's and unfortunately the token isn't accessible for React application since it is running inside a iframe by default. If you are using the default Handlebars, ACE provides  helper methods to access the JWT. 

### Workaround

The first call from JIRA/Confluence call will carry the JWT. In the above code snippet `addon.authenticate()` will validate the JWT executes the callback. In this place, we can create a JWT and set it as cookie header. Post that, in all the API calls made from React app, we can validate the JWT against our secret, and it will sort out the issue of authentication.

Here is a sample code for a Hello world with ACE and React. [Github Source.](https://github.com/prasann/ace-with-react)
