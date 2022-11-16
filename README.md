# Sorted-names-list-test-project
Test project, which display sorted list of names.
## Installation
1. Clone this repo.
2. Create database in any way you want and create account for accessing it (I use OpenServer). Then copy SQL queries from /database/db.create.sql and from /database/stored.procedures.sql and execute to create tables for project and save procedures, which are user in code.
3. Create .env file with next variables or store it in variables environment:
        PORT=/*number of port you use (8000 for example)*/
        DB_HOST=/*address of yours database (127.0.0.1 or 'localhost' if it runs on your own computer)*/
        DB_USER=/*name of account for database*/
        DATABASE=/*name of created database*/
        DB_PASSWORD=/*password to authenticate your account in database*/
        SECRET=/*phrase for encrypting JWT*/
        SALT=/*salt for encrypting password (any number 0-9 would be enough)*/'
4. Run 'npm i'. Then choose how you want to execute this project: using TypeScript or recompile it in JavaScript and then run.
                _If you want to execute TypeScript code._
1. Run 'npm run dev'. Then open browser and paste 'http://localhost:8000'.
                _If you want to execute JavaScript code._
1. Run 'npm run build'.
2. Copy 'src/client' folder to '/dist'.
3. Run 'npm run start'. Then open browser and paste 'http://localhost:8000'.
### Walkthrough
https://youtu.be/YoOBRdyawXE
Text variant: https://docs.google.com/document/d/1Y6A_mSiaS9icyieN4zQey8OBWEZYzPpD/edit?usp=sharing&ouid=111189365704837639343&rtpof=true&sd=true
