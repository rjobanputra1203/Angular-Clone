import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map } from "rxjs/operators";

@Injectable()

export class DataStorageService  {
    
    constructor (private  http  : HttpClient , private recipeService : RecipeService) {}
        storeRecipes(){
            const recipes = this.recipeService.getRecipes()
            console.log(recipes)
            this.http.put('https://recipe-book-d2edc-default-rtdb.firebaseio.com/recipes.json' , recipes)
            .subscribe( (response) =>
                {
                        console.log(response)
                }
            )
        }
        

      fetchData() {
        this.http.get<Recipe[]>('https://recipe-book-d2edc-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map ( recipes =>
            {
                console.log(typeof recipes)

                
                return recipes.map( recipe =>
                    {
                        return {
                            
                            ...recipe , ingredients : recipe.ingredients ? recipe.ingredients : []
                        }
                    })
            }
        )
        )
        .subscribe(
            (recipes) =>
            {
                let s = ''
                console.log(recipes)
                for(let i in recipes){
                    s = i
                }
                
                
                this.recipeService.setRecipes(recipes);
            }
        )
        }



        
       
}