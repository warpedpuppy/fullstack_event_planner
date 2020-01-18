# Event Planner

full stack application that uses full calendar

creates events, places them on calendar, can delete/edit them

todo:

1. flesh out these instructions
1. remove bootstrap, create style


instructions: 

1. first go to AWS and sign up for an S3 bucket, you need to get four pieces of information:
    1. the secret access key
    1. the not secret access key
    1. the bucket name
    1. the url root of the bucket that you'll need for the frontend img src attributes

1. backend: 
    1. open a terminal window and cd into your backend folder.

    1. Copy the ".exampleenv" file and call it ".env" (code: cp .exampleenv .env). Fill out this .env file.

    1. run  "yarn". 

    1. when that is done, run an "yarn run dev".

1. Make the tables in the database
    1. using the files in backend/migrations, run "yarn run migrate" to create the tables. 

1. frontend:
    1. open a new terminal window 
    
    1. cd into the frontend folder. 

    1. cd into the src folder 
    
    1. copy the "exampleconfig.js" file and make a "config.js" (code: cp .exampleconfig.js .config.js) and fill out the url that the image tags will need as their src attribute. 

    1. cd back up into the frontend folder (code: cd ..)
    
    1. run "yarn" 

    1. then run a "yarn start"

1. it should then be ready to test.