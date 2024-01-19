# SynDy UI

## Setup
Here are the steps to setup the UI for development:
1. Make sure you have deployed the infrastructure and service in AWS. Follow steps in this [repo](https://github.com/RIET-lab/syndy-service)
2. In `/src/Api/DataService.js`, change the `API_URL` to the endpoint of the service (this is the DNS of the load balancer created in step 1)

## Running
Normal React Project - run `npm start` to start the development server.