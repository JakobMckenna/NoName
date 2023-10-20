# How to setup and run the project

> Feel free to email me: mckennaj@myumanitoba if you have any questions. 

# Downloading the project 

> Go on our GitHub repo, and download the code from the main branch (Or download it any other way you like, such as VSCode.
> Open the code in an IDE (VSCode is reccomended) 

# Setup backend

> CD into backend, and run: npm install
> Add the .env file in the backend folder: for access please email mckennaj@myumanitoba.ca

### Setup the database

> Download and create a docker desktop account
> CD into backend, and run: docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
> Create the database with: npx prisma migrate dev --name init npx prisma db push
> Initialize the database with: npm run postinstall

# Setup frontend

> CD into frontend, and run: npm install

# Run the project

> Go into docker and start your database image
> CD into the backend and run: npm run dev
> Open a second terminal, CD into the frontend, and run: npm run dev
> Click the link to see the locally hosted website!

# Run Tests

> CD into testing, and run: npm install jest -save-dev
> To run tests: npm test
> Note that these tests automatically run when a pull request is made

