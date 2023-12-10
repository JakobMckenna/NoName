# Install packages required by project
- cd into backend then run the code below
> npm install

# Create .env file 
- Create .env file in the backend directory and create DATABASE_URL variable in it and put the db url "mysql://root:root@localhost:3306/NoNameDevDiaries"

# Initialize database
- do the stuff in get-started-db.md
- then run the script below , to setup prisma client being used on our data access layer
> npm run postinstall

# Run server
- runs server in development , mode where you can change server code and server updates based on those file changes
> npm run dev
