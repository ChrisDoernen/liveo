# Development Quick Start Guide

## 1. Install required software
[Node.js](https://nodejs.org/en/) is the Javascript runtime environment with the package manager yarn. [Git](https://git-scm.com/download/win) is used as source control management system.

Download and install the tools if you are on Windows or run the following commands if you are on Linux/Ubuntu/Debian. Make sure to add them to the path variables on Windows.
```
apt install nodejs
apt install git-core
```

## 2. Clone the repository and install dependencies
Navigate to the directory you want to clone the repo to and run
```
git clone https://github.com/ChrisDoernen/Livestream-App.git
```
followed by
```
npm install
```
in the shell or cmd.

## 3. Start coding
The project relies on [Angular CLI](https://cli.angular.io/) and [Nrwl Nx](https://nx.dev/getting-started/what-is-nx). Make sure to check out the getting started guides.

To start the app run 
```
ng serve service
```

Switch environments with the `configuration` flag, e.g. run
```
ng serve service --configuration=simulation
```
to start the service in the simulation environment.

To work on the client or admin sites, run
```
ng serve client
ng serve admin
```
while making sure to have the server running.

Run tests with 
```
ng test admin
ng test client
ng test service
``` 
or
```
npm run test
``` 
to execute all tests.

## Additional notes

### Libraries
Next to Angular and Nx, other 3rd party libraries (among few smaller ones) are:
* [Express](https://expressjs.com/de/) as webserver
* [Inversify](https://github.com/inversify/InversifyJS) as DI framework
* [Angular Material](https://material.angular.io/) for UI
* [Socket.io](https://socket.io/) for websocket connections
* [Winston](https://www.npmjs.com/package/winston) for logging
* [3LAS](https://github.com/JoJoBond/3LAS) for client side mp3 decoding
* [Ffmpeg](https://www.ffmpeg.org/) is the tool for converting audio signals. 
* [Jest](https://jestjs.io/) for testing

### Tooling
If you have not a IDE yet, check out [Visual Studio Code](https://code.visualstudio.com/).

[Postman](https://www.getpostman.com/) is a great tool for api testing. See the corresponding postman collection.
