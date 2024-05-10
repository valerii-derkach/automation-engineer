# Automation Engineer Test

This project contains a collection of JavaScript applications designed to perform specific tasks as part of the Automation Engineering Test Task. It includes JavaScript tasks, REST API program, and SQL scripts for database interactions.

## Installation
```
git clone https://github.com/valerii-derkach/automation-engineer.git
cd automation-engineer-test
npm install
```

## Files with tasks
1.1 ./src/JavaScript/extendDate.js
1.2 ./src/JavaScript/salesOrder.js
1.3 ./src/JavaScript/objectProjection.js
2 ./src/REST_API/calendarAPI.js
3 ./src/SQL/sqlCommands.sql

Additionally you can find tests in ./src/JavaScript/tests folder

## Run tests for the JavaScript tasks
```
npm test
```

## Execute applications using the following commands
```
npm run extendDate
```
```
npm run salesOrder
```
```
npm run objectProjection
```
```
npm run calendarAPI
```

## Input Data
Input data for the applications can be found and modified in the examples.js file located in the ./src directory of the project.

## SQL Scripts
SQL scripts are prepared in ./src/SQL/sqlCommands.sql. Use an online SQL editor such as [SQLiteOnline](https://sqliteonline.com/).

## Technologies Used
JavaScript
Node.js
Jest for testing
Axios for HTTP requests
Dotenv for environment configuration
