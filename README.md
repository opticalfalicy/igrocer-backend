# igrocer-backend

The server portion of a demo Ionic app for recieving and display recipes from an API.

To fully test the current build, please follow this link and associated instructions:  
https://github.com/swedishgoodbye/igrocer  
**THIS APP IS IN DEVELOPMENT AND STABILITY IS NOT ENSURED**

## Prerequisite Software:  
> * [node.js](https://nodejs.org/en/) 
> * [mongoDB](https://www.mongodb.com/)  


## Installation / Running App"
> * At root directory run 'npm install'
> * Run 'node server'  

## API Routes:  
* include 'localhost:27017/' on your request route before the following  
  
### GET Recipes
> 'api/'  
  
### POST New Recipe  
> 'api/cr'  
> The JSON Format for registering a user is as follows:  
> {  
>  **"title":** _"title as string"_,  
>  **"img":** _"img as string(html link to img)"_,
>  **instructions:**:`[
>                     **"text"**: "instructions here, works best by creating one object per instruction step
>                   `]
>   **"ingredients:**`[
>                     **"item"**: "item as string",
>                     **"price"**: "price as string"
>                    `]
> }
  
### DELETE Recipe
> 'api/recipes/:recipe_id'
