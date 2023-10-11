# eCommerce-Application

## Project deployment: https://ecommerce-app-pet-project.netlify.app/

We are a team of 2 developers ([Leonid](https://github.com/leanidrymkevich), [Andrey](https://github.com/andrei-kochetov)) created a training project eCommerce application - a full-fledged online store.

Users can view a wide range of products, view detailed descriptions, add the products they like to the shopping cart, and proceed to checkout. The online store includes features such as user registration and login, product search, product categorization and sorting.

### Key pages in the app include:

* Login and registration pages
* Main page
* Product page in the catalog
* Product Detail Page
* User profile page
* Cart page
* About us page

Our online store is responsively designed to look great on a variety of devices with a minimum resolution of 390px.

The app is powered by CommerceTools.

## Our technology stack:
* TypeScript
* HTML
* SCSS
* webpack
* ESLint
* Prettier
* Husky
* Jest

## Available scripts (prescribed in the terminal):
* npm run lint - runs a script to check for errors specified in ESlint.
* npm run lint:fix - runs a script to check and fix bugs specified in ESlint.
* npm run start - starts the local server.
* npm run build - creates a final build in the dist folder.
* npm run prettier - formats the code in a nice structure in all .ts files in the src folder.
* npm run test - runs tests using Jest.

The project uses husky, before creating a commit, he checks the indexed .ts files for errors indicated in ESlint, and fixes them if possible, .
If there were no errors or they were fixed, a commit is created; if there are errors and they could not be fixed, a commit is not created.

## Instructions for setting up the project:
* Clone the repository to your computer using the command in the terminal:   
`git clone https://github.com/LeanidRymkevich/eCommerce-App.git`
* Go to the project folder:   
`cd eCommerce-App`
* Install project dependencies via terminal command:   
`npm install --force`
* See the full list of command repository branches:    
* `git branch -a`
* Go to the desired command branch:   
`git checkout (branch name)`
* Your local project is ready to use.