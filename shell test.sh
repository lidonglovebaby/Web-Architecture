#!/bin/bash

# Get headers
curl --HEAD localhost:3000/questions


# Get all questions
curl -i http://localhost:3000/questions

# Get a question
curl -i http://localhost:3000/questions/1

# Create a question
curl -i -X POST -d "title=Create a question&contents=create question content" http://localhost:3000/questions

# Update question
curl -i -X PUT -d "title=modify question&contents=changed question" http://localhost:3000/questions/2

# Delete question
curl -i -X DELETE http://localhost:3000/questions/2



# Get all answers of a qusestion
curl -i http://localhost:3000/questions/1/answers

# Get a answer of a question
curl -i http://localhost:3000/questions/1/answers/1

# Create a answer to a question
curl -i -X POST -d "title=answer of a question&contents=create answer to question" http://localhost:3000/questions/1/answers

# Update a answer 
curl -i -X PUT -d "title=modify answers&contents=changed answers" http://localhost:3000/answers/1

# Delete a answer
curl -i -X DELETE http://localhost:3000/answers/1



# Get all comments of a qusestion
curl -i http://localhost:3000/questions/1/qcomments

# Get a comment of a question
curl -i http://localhost:3000/questions/1/qcomments/1

# Create a comment to a question
curl -i -X POST -d "title=comment of a question&contents=create comment to question" http://localhost:3000/questions/1/qcomment

# Update a comment of a question
curl -i -X PUT -d "title=modify question comment&contents=changed question comment" http://localhost:3000/qcomments/1

# Delete a comment of a question
curl -i -X DELETE http://localhost:3000/qcomments/1



# Get all comments of a answer
curl -i http://localhost:3000/answers/1/acomments

# Get a comment of a question
curl -i http://localhost:3000/answers/1/acomments/1

# Create a comment to a question
curl -i -X POST -d "title=comment of a answer&contents=create comment to answer" http://localhost:3000/answers/1/acomments

# Update a comment of a question
curl -i -X PUT -d "title=modify answer comment&contents=changed answer comment" http://localhost:3000/acomments/1

# Delete a comment of a question
curl -i -X DELETE http://localhost:3000/acomments/1


# Get headers for testing validity, accessibility, and recent modification
curl -i -X HEAD http://localhost:3000/question/1/answer/1 
