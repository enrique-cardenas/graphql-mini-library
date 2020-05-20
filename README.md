# graphql-mini-library

This repo contains my solutions to the exercises in part 8 of the [Deep Dive Into Modern Web Development](https://fullstackopen.com/en/) course. 

## Table of content
- [Getting Started](#getting-started)
- [Prerequisites](prerequisites)
- [Installation](installation)
- [Usage](usage)
- [Creating a user](creating-a-user)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine 

### Prerequisites

- Create a [MongoDB](https://www.mongodb.com/) account
- Create a cluster in a region closest to you
- Use the database access tab to create a user credential for the database
  - This will not be the same credentials you use for logging into MongoDB Atlas. This will be used for your application to connect to the database
- Grant the user with permissions to read and write to the databases.
- Next define the IP addresses that are allowed access to the database. For the sake of simplicity allow access from all IP addresses
- To connect the database find the "connect" button under the cluster recently created
- Choose "Connect your application":
- Copy the MongoDB URI, it is the address of the database that will be given to the MongoDB client library in the application
  - The address should look like "mongodb+srv://enrique:<PASSWORD>@cluster0-nlyii.mongodb.net/test?retryWrites=true&w=majority"
  
### Installation
- Clone the repo
```
git clone git@github.com:enrique-cardenas/graphql-mini-library.git
```
- Open a terminal window and cd into the server directory
```
cd server
```
- Create a ".env" file in the server directory
- Add the following inside the file
```
MONGODB_URI='mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-nlyii.mongodb.net/graphql-mini-library?retryWrites=true&w=majority'
SECRET = 'ABCD'
```
Note: Replace username and password with your MONGODB_URI information. Also, adding "graphql-mini-library" after "mongodb.net/" creates a new database with that title if it does not exist.
- Install all necessary node modules for the server by running the following in the server directory
```
npm install
```
- Install client node modules by going into the client directory and running
```
npm install
```

### Usage
Open two terminal windows
1. In the first window
```
cd server
node index.js
```
2. In the second window
```
cd client
npm start
```
Open a browser and enter "http://localhost:3000/" in the URL
### Creating a user
To add authors and books you must login. In order to login you must create a user into the database
There is currently no client code for creating a user, but you could create a user with the following instructions
1. Open a browser and enter "http://localhost:4000/graphql" in the URL
2. Enter the following mutation in the text box and then press the play button to create a user
```
 mutation {
    createUser(
      username: "username_here"
      favoriteGenre: "genre_here"
    ){
      username
      favoriteGenre
    }
  }
```
