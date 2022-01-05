# Firebase-Mjolnir

This project is a tool for flatten nested firebase database.
It can be run locally on any machine or be hosted online.
## Database Structure:
In current version, the Mjolnir can deal with database followed a certain structure:
Firebase name -> experiment name -> trial name -> record.
Inside record, you can have as many as attributes you like, but no more nested structure.

## Usage
###Type in url and api key of your firebase project
![url&key](https://imgur.com/TIQ8orT.png)

### Select the experiment you want to examine 
![select sub database](https://imgur.com/d5laHm3.png)

### Select attributes you want to include and you can rename any of them, then download them as CSV file
![download](https://imgur.com/TW5eXtJ.png)

### You can also select attributes across different collections.

### Instead of type in URL and API key every time, you can pass them as query parameters in URL. Then it can be saved to your bookmark
e.g. mjollnirURL/?databaseurl=abcd&databasekey=1234

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
