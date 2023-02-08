# qTask
An app that organize your tasks for you.

when i made this project, i used the MVC architecture.

- [x] express
- [x] mongodb
- [x] csurf (csrf token)
- [x] ejs
- [ ] multer

maybe some details isn't working yet.

## how i can run this project?

first, you need to install the app:
```
git clone https://github.com/TheBrunno/qTask.git
```

now, you need to install all dependencies.
```
npm i
```

create an .env file and enter with your MongoDB Connection String, a port to run the application and set any secret key.
```
CONNECTIONSTRING=<the MongoDB connection string>
SECRET=<a secret key O.o>
PORT=<a Port to the server>
```

ok, almost done. to finish:
```
npm start
```
