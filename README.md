# lms-passport-jwt
 This repository implements JWT, Passport Local and Passport local Mongoose to implement LMS
 To signup, use localhost:3000/users/signup with name,role,username and password fields
 To Signin, use localhost:3000/users/login with post and given username and password. Save the token that will be returned as a response
 That token with be used as Authorization: brearer:token as header for subsequent request.
 To create a user an admin, you have to manually go to DB and set admin field in users table or relevant user as true. 
