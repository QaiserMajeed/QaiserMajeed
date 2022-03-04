Server setup Guide
Step 1:
    
    Install mongo DB.  Follow below link for complete details:
    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

    #Run Mongo DB
    sudo systemctl start mongod

    #Verify MongoDB has started successfully
    sudo systemctl enable mongod

    #Stop MongoDB
    sudo systemctl stop mongod


Step 2
    Clone Code from git repo. git clone https://developersiapp@bitbucket.org/journeylife/journeylife.git
    
    Enter in project directory.

    #Install All required packages:
    npm install

    #Run project
    npm start
        or
    node app.js
        or
    nodemon app.js


Access to Mongo DB with Console:

    #Command to connect with console
    sudo mongodump --host {hostname:port} -u {DBuser} -p "UserPAss" --authenticationDatabase {AuthenticationClient} --db {DBname} 

    #View Databases
    show databases;

    #Switch to DB
    use {DBname}

    #View tables/collections
    show collections