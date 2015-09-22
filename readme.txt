A Brief Guide to the Web Architecture Assignment (Group 15)
Group members: 
Dong Li (dl1e14)
Anis A Sharip (aas3g14)
Jack Webster (jw30g11)
Antigoni Kritioti (ak5e14)

Runing the application:
The testing server system is Ubuntu Server LTS 14.04.1, which have Node and SQLite installed.

1. npm install/npm update
Open the folder where the application is in the terminal, and install required modules by command "npm install".our application have install required modules,users can
update these modules by command "npm update".

2. initialize the database
If you want work with current database, you can skip this step, otherwise, you can initialize the database by using command “node create”in terminal.

3.npm start
start the server of the application. use command "npm start" to start the server

4.run the application in browser
Open the browser and type the starting URL-http://localhost:3000 in the address bar in the browser and there will show the index page of the application, and users can use functionality in the web.


Access functionality the application:

there are two ways of accessing all the functionality of the application

1.Using browser
After running server of the application by "npm start" command in terminal,open browser and type "localhost:3000" which is the starting URL into the address bar. the browser will show 
the index page of our application. In the page, users can use GUI to access all functionalities which include add,edit,delete question, answers and comments.

2.Using curl commands:
After running server of the application by "npm start" command in terminal, open another terminal and test the application by follow curl commands:

Testing head:

curl --HEAD localhost:3000/questions

Users can also test the head of the http head when implementing other methods like follow command

curl -i http://localhost:3000/questions

testing HTTP verbs:
our application supported 4 kinds of HTTP verbs(get, post, put, delete),users can test these HTTP verbs by following curl commands.

(the question for which id is “2” is already exists in the database)
test GET method:
curl http://localhost:3000/questions

test post method:
curl -d “title=new question&contents=new question contents?” http://localhost:3000/questions

test put method:
curl -X PUT -d "title=modify question&contents=changed question" http://localhost:3000/questions/2

test delete method:
curl -X DELETE http://localhost:3000/questions/2


users can test 4 HTTP verbs of answers and comments by routers in API


