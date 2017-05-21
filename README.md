## Getting Started

### Prequisites
You will need the following things properly installed to run the app.

* NPM  -- available [here](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
* Node -- see above link
* Git  -- available [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### To Get Going
Open your terminal and run the follow commands in sequence:

* `git clone <this-repository-url>`
* change into the cloned directory
* `npm i` OR `yarn` if installed
* `npm start` and open your browser to `localhost:3000`

## Runtime Complexity

Based on the assumed requirement all apps must be sorted per host (not just the top 25),
the algorithm in place can be defined by the following steps:

1. Create a dictionary of apps keyed by app name (Object<string, App>) -- O(n)

2. Create a dictionary of hosts keyed by host name (Object<string, Host>),
   bucketing the apps into their respective hosts -- O(n)

3. Sort the app lists of each host -- (O(n log n))

We then have the 3 main algorithms:

`getTopAppsByHost` is O(1) because the apps are already sorted

`removeAppFromHosts` is O(n) because we have to remove the item from the app list

`addAppToHosts` is O(n) because we have to insert the item into the app list

## Folder Structure

```
root/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
    models/
    main.css
    main.js
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
