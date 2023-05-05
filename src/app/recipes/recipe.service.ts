import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()


export class RecipeService {
  
  recipeChanged= new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   // new Recipe(
  //   //   'Pizza',
  //   //   'A super-tasty Pizza',
  //   //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU',
  //   //   [
  //   //     new Ingredient('Base', 1),
  //   //     new Ingredient('Cheeze', 20)
  //   //   ]),
  //   // new Recipe('Big Fat fries',
  //   //   'What else you need to say?',
  //   //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFfXyNC6pFJN02DJmSUorq0-9CjccLCkp4w&usqp=CAU',
  //   //   [
  //   //     new Ingredient('potato', 2),
  //   //     new Ingredient('spices', 1)
  //   //   ])
  // ];

  private recipes :Recipe[] = []
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes : Recipe[]) {
    
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())

    // console.log(typeof recipes + "setting data");
  }
  
  getRecipes() {
    console.log(typeof this.recipes.slice() + "Heloooo");
    return this.recipes.slice();
  }

  getRecipe(index : number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipie(recipe : Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }
 
  updateRecipie(index: number , newRecipie : Recipe) {
    this.recipes[index] = newRecipie
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index : number) {
    this.recipes.splice(index,1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
