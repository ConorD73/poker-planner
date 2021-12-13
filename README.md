#poker-planner

# Frontend #
````
cd client
ng serve
````

# Backend #
````
cd fake-backend
nodemon index.js
````

# Setup Database
````
If you want to run the backend you will need to setup a sql database and run migrations
cd /fake-backend
Chnage SQL connection values in knexfile 
knex migrate:latest
````
