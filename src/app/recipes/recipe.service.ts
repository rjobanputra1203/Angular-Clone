import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'A super-tasty Pizza',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU',
      [
        new Ingredient('Base', 1),
        new Ingredient('Cheeze', 20)
      ]),
    new Recipe('Big Fat fries',
      'What else you need to say?',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFfXyNC6pFJN02DJmSUorq0-9CjccLCkp4w&usqp=CAU',
      [
        new Ingredient('potato', 2),
        new Ingredient('spices', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index : number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
