# React Diagram

## Overview

React Diagram is a straightforward visualization tool that displays a static set of data as a diagram. This project focuses on rendering predefined nodes and links using the GoJS library within a React application. 

## Features

- **Static Diagram Visualization**: Displays a fixed diagram based on predefined data sets.
- **Integration with GoJS**: Utilizes the GoJS library for efficient diagram rendering.
- **Searchable Node Dropdown**: Includes a dropdown that allows users to search and select nodes. Selecting a node will highlight it in the diagram, enhancing the user experience by making it easy to locate specific elements.


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (recommended version: 18.x)
- npm (recommended version: 10.x)

## Technologies

This project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **GoJS**: A JavaScript library for building interactive diagrams and graphs.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **CSS Modules**: For styling components in a modular and reusable way.
- **Playwright**: A Node.js library to automate Chromium, Firefox, and WebKit with a single API.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mmahabadi/react-gojs-diagram
   ```

2. Navigate to the project directory:
    ```bash
    cd react-gojs-diagram
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
### Running the Application
To start the application locally, run:
    
```sh
npm start
```
## Testing
The application uses Jest for unit tests and Playwright for end-to-end tests.

### Running Unit Tests
To run the unit tests, use:
````sh
npm run test
````

### Running End-to-End Tests
To run the end-to-end tests with the UI, use:
```sh
npm run test:e2e
```