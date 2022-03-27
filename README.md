**ReflexaWeb - API**

How to use:

1) Clone this repository: **git clone git@github.com:ReflexaWeb/api.git**
2) Install dependencies: **npm i** ou **npm install**
3) Duplicate the file **.env.example** para **.env** and change it to use your access data
4) Initialize docker on your machine and to create container, run: **npm run up**
5) To create database and its tables, run **npm run typeorm migration:run**
6) To run the server in development mode, run **npm run dev**

To access API docs is necessary run server with **npm run dev** e acesse: **http://localhost:3333/docs**

Any doubts I'm available to help.