## Mastermind: 
<img src="public/img/mastermindScreen.png" />

## How To Play:

Users must guess a combination of 4 numbers between 0-7. I used the Random Generator API to generate the 4 digit number combination. Users will be given 10 chances to guess the correct combination of numbers. The user will be shown the number of guesses remaining, the number of correct locations within the combination, and the number of correct digits on the mainGame page. The user will also be shown the guesses they have made. 

## How It's Made:

**Tech used:** EJS, CSS, Bootstrap, JavaScript, Node, Express, MongoDB, Passport for Local Authentication 

Throughout the process of building this app, my focus was structuring the code using MVC architecture. This allows for better organization and structure of the code. It makes debugging easier and it allows others to better understand my code. Therefore, I organized my code by a views folder that contains all of my EJS files that will render client side code. There is an server.js file that declares of the modules, packages, and dependencies I use throughout my application. It also declares the routes I will use to set the path for the data that is being created, updated, or read. I have created two different schemas for the models in my database. One is a user schema and the other is a game schema. They are tied together with by the user ID. The routes folder contains the paths that connect the controller to the views.  It also sets the API endpoints for my application. Finally, I made a controllers folder which contains all the application logic. There are three controllers, one for authorization, game logic, and also a controller for the login page. 
 
Some extensions I have included is local authorization so that the app can keep track of the users, their scores, and games. The scores of the users along with their usernames are displayed from the highest to the lowest. When the user has won a game, they will also see a confetti package explode. 


## 💻 Install

- Fork and clone the repository to your local computer.
- `npm install` to install the required dependencies.
- Complete and store a `.env` file in the `config` folder.
- Create a database in [MongoDB](https://www.mongodb.com/) and connect it to the application by setting the database string in the `.env`. 
- Set a port to run the application locally. 
- And, Nodemon is included as a dependency. `npm start` to run the application. 

<br>


## Lessons Learned:

Throughout the process of building this game, I took a lot of time thinking about the logic of the game. My first step was to fetch the correct data from the Random API. Once I had that figured out through Axios, I was able to create the game logic. It was difficult for me to think about how I would display the location and the correct number of digits for the user. I realized after grappling with with problem that I had to make sure that the number of correct guesses accurately displayed. For example, if the target number was 1,2,3,4, and the user guessed 1,1,1,1, they should only have 1 correct number, not four. I was able to fix this problem by 