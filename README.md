# Auth and query search interview test


1st Terminal:
cd authService/
npm i
npm start

authService will be running on port 3000

2nd Terminal:
cd queryLoadService/
npm i
npm start

queryLoadService will be running on port 4000
----------------------------------------------------------------
in postman:

url(POST) : localhost:3000/auth/register
body: {
	"username": "username",
	"password": "password",
	"name": "name",
	"lat": 70.8416,
	"long": 60.3753212,
	"jobTitle": "Web developer",
	"rate": 2.5
}

url(POST) : localhost:3000/auth/login
body: {
	"username": "username",
	"password": "password"
}

url(GET) : localhost:4000/all

url(POST): localhost:4000/nearme
head: {
  "token": token that given from login API
}

------------------------------------------------------------------
queryLoadService will be get user authentication from auth service. Then sending all/near user peoples who was registered in another service.
