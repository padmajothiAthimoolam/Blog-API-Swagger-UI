# Swagger UI

Swagger UI is a powerful tool that allows you to visualize and interact with your RESTful APIs in a user-friendly interface. 
It automatically generates documentation for  API, making it easier for developers to understand and test the endpoints.

## Features

- **Interactive Documentation**: View and interact with your API endpoints.
- **API Testing**: Send requests directly from the UI to test your API.
- **Automatic Generation**: Generates documentation from your API specifications.

## Getting Started

### Prerequisites

- Ensure you have a running REST API server.

### Installation

If you're using Swagger UI in your project, you can install it via npm:

```bash
npm install swagger-ui-express
````

Setup
To set up Swagger UI in your Express application, follow these steps:

Import the necessary modules:
````bash
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
````

Load your Swagger specification (usually in YAML or JSON format):
````bash
const swaggerDocument = YAML.load('./swagger.yaml');
````

Use Swagger UI middleware in your Express app:
````bash
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
````

Start your server.

Accessing Swagger UI
Once your server is running, you can access Swagger UI at:

````bash
http://localhost:3000/api-docs
````
