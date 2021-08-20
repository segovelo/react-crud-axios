# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

==========================================================================

This project follows from https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/?fbclid=IwAR1mrio4MZ7244jeutCohCsQIIM-8uDEzJVF-w4-l9Y2rUHnxtiLR58GSMo

It uses https://mockapi.io/projects as a backend API.
It uses https://react.semantic-ui.com/collections/form/ to copy form boilerplate

To start react web app, inside your demo-app folder in terminal:
c:\react-projects\demo-app> npm start
The landing page will be on localhost:3000/index.html

Dependencies:

yarn add react-hook-form@6.15.4 react-router-dom@5.2.0
yarn add semantic-ui-react semantic-ui-css
yarn add axios


===================================================================================

Deploy a Containerized React to AWS Fargate

## 1 - Create a "Dockerfile" file in react App root directory and paste:

---

FROM node:15.4 as build

WORKDIR /app

COPY package\*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

---

## 2 - Create a folder "nginx" folder in react App root directory.

## 3 - Create a "nginx.conf" file inside the the "nginx" folder and paste:

---

worker_processes 1;

events {
worker_connections 1024;
}

http {
server {
listen 80;
server_name localhost;

    root   /usr/share/nginx/html;
    index  index.html index.htm;
    include /etc/nginx/mime.types;

    gzip on;
    gzip_min_length 1000;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript; ## This in only one line

    location / {
      try_files $uri $uri/ /index.html;
    }

}
}

---

If an error with @babel appears :
npm install --save-dev @babel/plugin-proposal-nullish-coalescing-operator

Run npm run build to create build folder
c:\react-projects>npm run build

## 4 - Create container with:

c:\react-projects>docker build -t app .

## 5 - Check if the docker container will run the app

c:\react-projects>docker run -p 3000:80 app

## 6 - Then we go to aws console, then go to elastic container registry and

## create a new repository in the console. We give the same name as the

## tag in the previous steps, in this example will name it as "app"

## 7 - Now We deploy the container We just created to AWS using the aws-cli

## Login to aws-cli . // 4305xxxxxxxx is AWS id Number

c:\react-projects>aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 4305xxxxxxxx.dkr.ecr.us-east-1.amazonaws.com

## Tag the app

c:\react-projects>docker tag app 4305xxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/app

## Push the container

c:\react-projects>docker push 4305xxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/app

## then when it finish pushing the container go to "Cluster" in aws console

## and create a new cluster. Choose the "Networking Only" then press Next

## Give a Cluster Name and check the "Create VPC" checkBox. Leave the other fields

## as default and click "Create". It may take a few minutes to finish the two steps.

## When finish go to "View Cluster" -> "Task Definition" -> "Create new Task Definition" -> Select "Fargate" -> "Next Step"

## "Task Definition Name" give app, "Task Role": None, "Task Memory(GB)":0.5GB

## "Task CPU (vCPU)": 0.25vCPU,

## "Add Container" -> "Container Name":app, "Image": 4305xxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/app,

## "Port Mapping":3000 (80). Leave the rest of settings as it is click "Add"

## Click "Create" Wait for the three steps to be completed.

## Go to "Cluster" and click on "myApp", go down to "Services" tab and click "Create"

## Select "FARGATE" for "Launch type"

## Give "Service name": app, "Number of tasks":1 . Leave the rest on default click "Next"

## Choose "Subnets":(10.0.0.0/24) | myApp/Public - us-east-1a

## Choose "Auto-sign public IP": ENABLED - Then click "Next"

## Choose "Service Auto Scalling": Do not adjust service's desired count - click "Next"

## Click "Create Service"

## Click "Cluster" -> "myApp" -> Service:"app" -> click down the tab "Task"

## Click "acd10f96emn5a45d7u1n8kz6di2" task and Check for details and Containers status down

## On the "Network" section will be a public IP 18.207.xxx.xxx this is react app ip address.
