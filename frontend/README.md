# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure
The frontend folder is composed of the following important directories
`/frontend`
|-- `/src`
|   |-- `/api`
|   |-- `/components`
|   |-- `/styles`
|-- `/public`
|   |-- `index.html`
|-- `package.json`
|-- `README.md`

### /components
The components directory contains import pieces used within our application. An example of important pieces are 
- Login.js: *Represents the user-facing login view*
- Signup.js: *Represents the user-facing signin view*

In essence, the components directory contains the different "views" that the user will encounter. E.g. Homepage, Threads, replies, etc.

### /api
The api directory is in charge of following code splitting practices by separating server functions/methods from the views. In other words, the files in the **/api** directory contain methods that are directly in charge with calling the backend endpoints and returning that data to it's corresponding view. 

An example would be the following:
***UserApi.js***
```
const UserApi = {

    getUserByCredentials: async (credentials, setFeedbackMessage) => {
        try {
            console.log(credentials);
            const response = await fetch(`${backendURI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            
            // Deal with the data being returned from the backend here

            const data = await response.json();
            // setUser(data);
            console.log(data);
            console.log(data.message);
            setFeedbackMessage(data.message);
            
            
        } catch (error) {
            console.error("Error in getUserByCredentials:", error);
        }
    }
```
The following code is in charge of accessing the /user/login endpoint of the backend service. From there it receives the data and returns it in a way that the application needs. 

An example of this method being called can be found in the components directory

***/components/login.js***
``` 
    // Call the api and the login method here
    UserApi.getUserByCredentials(userInfo, setFeedbackMessage);
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

