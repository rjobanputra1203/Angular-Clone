import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number
  editMode = false
  recpeForm : FormGroup
  
  constructor(private route : ActivatedRoute ,
        private recipeService : RecipeService,
        private router : Router
      ) { }

  ngOnInit() {
    this.route.params
    .subscribe( 
      (params : Params) =>
      {
          this.id = params['id']

          this.editMode = params['id'] != null
          this.initForm()
      }
    )
  }

  onSubmit() 
  
  {
    // const newRecipie = new Recipe(
    //   this.recpeForm.value['name'],
    //   this.recpeForm.value['imagePath'],
    //   this.recpeForm.value['description'],
    //   this.recpeForm.value['ingredients']
    // )

    if (this.editMode) {
      this.recipeService.updateRecipie(this.id,this.recpeForm.value)
    }
    else
    {
      this.recipeService.addRecipie(this.recpeForm.value)
    }

    this.onCancel()
    
  }
  onAddIngredient() {
    (<FormArray> this.recpeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount': new FormControl(null , Validators.required)
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'] , {relativeTo : this.route})
  }

  onDeleteIngredient(index : number) {
      (<FormArray> this.recpeForm.get('ingredients')).removeAt(index)
  }

  private initForm()

  {
    
    let recipeName = ''
    let recipeImage = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImage = recipe.imagePath
      recipeDescription = recipe.description

      if (recipe['ingredients']) {
        console.log(recipe.ingredients)
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required)
            })
          )
        }
      }
    }
    this.recpeForm = new FormGroup(
      {
        'name' : new FormControl(recipeName , Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'imagePath': new FormControl(recipeImage, Validators.required),
        'ingredients' : recipeIngredients
      }
    )
  }

}
