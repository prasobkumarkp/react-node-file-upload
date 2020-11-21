# REACT NODE FILE UPLOAD

A simple file upload client server

Get started, from the root directory

```powershell

npm start # will start server then client

npm run server # starts server alone

npm run client # run client alone

```

## Packages

### Server

1. express
1. express-fileupload
1. nodemon (dev-dependency)
1. concurrently (dev-dependency)

### Client

1. create-react-app
1. node-sass
1. axios
1. react-bootstrap
1. bootstrap

### Point of interests

- server and client under same folder
- single run command to run server and then client
- using .env with create-react-app
- using `__dirname` `__filename` with module type
- storing images in server folder
- exposing API to return stored image

> :warning: **Waring** Exclude .env from source repository
> Always exclude .env with credentials from checking in to github by adding to `.gitignore`
