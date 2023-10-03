# Dev Diaries Backend

The Dev Diaries backend is built using the npm package manager [More info on npm]("https://docs.npmjs.com/about-npm") and Type Script [More info on Type Script ]("https://www.youtube.com/watch?v=zQnBQ4tB3ZA"). 

# How to run 

1. ## In Development Mode
In development mode you can change the code and the program will recompile as you change the code.. Run the scripts below to run in this mode. 
> npm run dev

2. ## In Build Mode
In build mode , code is compiled once and what recorgnizr code change . Run the scripts below to run in this mode. 
> npm run build
> npm run stat

# Packages

1. ## Express JS
This a light weight web framework , in our project we are using it as our backend framework where our api
routes are hosted .

2. ## Nodemon and Concurrent
This is used in npm run dev mode so that we can edit code files and program is recommpilled as changes to the code is being made

3. ## CORS
This is the middleware that allows the front end to communicate with our backend even if they are running on different hosts or ports . Its also prevents a cors error. [More info on cors error]("https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors")

4. ## Prisma
This is an orm that comminicates with out MySql backend and allows us to use Object Relational Mapping to make queries to our database . [More info on Prisma]("https://www.prisma.io/docs/concepts/overview/what-is-prisma")

5. ## JWT Token
This used for user authentetication and security .


# Architecture

1. ## Node Server
In index.ts , express starts running an http server on port 5000 and receivies incoming requests

2. ## Routes Layer
In the routes file , the available routes in our backend exist as Javascript objects and the route paths are declare in index.ts for example in line 13 "app.use('/users', userRoutes);"  so this means all user routes start with http://host:port/users/{route path} and the route paths can be found in the routes objects within our routes

3. ## Controller Layer
When a route recieves a request it sent to the controller layer which calls the service layer and sends responses back to the frontend 

4. ## Service Layer
This handles all the business logic in our server and communicates with the data access layer

5. ## Data Access Layer
This makes requests to the mysql database using Prisma request . The database schema is also defined in our schema.prisma file and all migrations to the database and saved in the migrations file . Migrations refer to changes to the dabase such  as adding new fields and tables .



