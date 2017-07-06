## Pre-requisites

* Clone the repository
* Run `npm install`
* Copy `.env.defaults` to `.env` and configure it with your values

## Building and running

Now you can do one of the following:
* Use `npm run build` to compile Typescript to `dist` directory
* Use `npm run start` to start a JS application you've compiled above.
* Use `npm run run` to run a live development server with auto-build and auto-reload on new changes.

## Deploying to Azure

This repository comes with custom `deploy.cmd` and `.deployment`, so it's ready to be deployed on Azure right away using CI.
Once pushed to Azure, this script will:
* Cleanup existing things
* Install all the dependencies
* Build Typescript files
* Start the compiled `app.js`

Don't forget to upload the correct `.env` file to your Azure instance via FTP or Kudu.