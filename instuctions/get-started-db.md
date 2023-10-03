# Create docker instance of MySql

> docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql

# Create database 

## Create database on MySql instance
- The codes below creates the database based on the prisma schema
> npx prisma migragte dev --name init
> npx prisma db push
