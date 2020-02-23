# Nodejs_API
 
A sample node js api for blog post style data. stored in mongodb server.

## Steps

## PART I: Run Mongodb Server

## PART II: Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/Aaru-NextGen/Nodejs_API
cd Nodejs_API
npm install
node populateDataBase.js // this will populate database.
node server.js
```

## Useage

Open your local browser and try accessing     
http://localhost:3002/ You should see a message "Node server is running". if not please report.

## Default Environment Vairables
  These properties are available in .env file. This should be used in development environemnt only. In production these env variables shall be used while running server on the terminal.
  
    PORT=3002 
    DB_URL=mongodb://localhost/apiDB
    USER_SECRET_KEY=user-secret-key  // JSON web token key used for users (normal).
    ADMIN_SECRET_KEY=amdin-secret-key // JSON web token key used for admin.
    ADMIN_PASSWORD=admin_password 
    DEFAULT_USER_PASSWORD=default-user-password
    NODE_ENV=dev

## Documentation and Testing (swagger-ui-express)
  visit : http://localhost/3002/api-docs
    
## User urls 
   sample user credetials: 
      
      email: Sincere@april.biz
      password: default-user-password
      
  User after successfull login gets JSON webtoken (JWT). This token will have an expire time, configured in constants/index.js folder. This JWT is further used for validation.
  
    http://localhost/3002//api/v1/user/login
   
The JWT got white logging should be send in headers to get details

    http://localhost/3002/api/v1/user/logout
    http://localhost/3002/api/v1/user/details
    http://localhost/3002/api/v1/user/posts
    http://localhost/3002/api/v1/user/update_profile_picture
  
  
 ## Admin url
 admin credetials:
 
    email: admin@api.com
    password: admin_password
 
 admin after loggin gets JSON webtoken (JWT). This token will have an expire time, configured in constants/index.js folder. This JWT is further used for validation.
 
    http://localhost/3002//api/v1/admin/login

The JWT got white logging should be send in headers to get details

    http://localhost/3002/api/v1/admin/logout
    http://localhost/3002/api/v1/admin/users
    http://localhost/3002/api/v1/admin/posts
  
