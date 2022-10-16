# API - DISNEY - ALKEMY

#Instalation
Version node 16.6.2
git clone https://github.com/AndresDP25/disney_api.git

npm i
Run Query in sql folder.

//test done in thunder client VSC uploaded to git
steps:
1\_ Register
{
"name": "Nicolas li",
"email": "nicoli@gmail.com",
"password": "No",
"role": "ADMIN_ROLE",
"enable":1
}

2_login
{
"email": "nicoli@gmail.com",
"password": "No"
}

copy token to de response: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTY2NTg4MTA5NiwiZXhwIjoxNjY1OTY3NDk2fQ.VVWB66XYXwi6x3C-F1aMfthJCDJL9XQ6VYIEK4Fmd2w

3_create character
in header put  
key: autorization value: token
body: {
"name": "Loki",
"age": 40,
"history": "The Avengers",
"weigth": 70
}

4_create movie
n header put  
key: autorization value: token
body:
{
"title": "Loki",
"creationDate": "2016",
"calification": 8,
"contentType": "MOVIE",
"genderType": "ADVENTURE"
}

# Execution

npm run dev

in db.authenticate();

in true we make the db or updates be created. With false we fixed without changes
// db.sync({ alter: true });
db.sync({ force: false });

line 29 /index.js
