import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { Recipe } from "./recipes/recipe.model";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";

const appRoutes : Routes = [
    {
        path : '' , redirectTo : '/recipes' , pathMatch : "full"
    },
    {
        path: 'recipes' , component : RecipesComponent , children : [
            {
                path : '' , component : RecipeStartComponent
            },
            {
                path: 'new', component: RecipeEditComponent
            },
            {
                path : ':id' , component : RecipeDetailComponent 
            },
            
            {
                path: ':id/edit', component: RecipeEditComponent
            }
        
        ]
    } ,
    {
        path: 'shopping-list', component: ShoppingListComponent
    },
    {
        path : 'auth' , component : AuthComponent
    }
    // {
    //     path: '**', component: Recipe
    // }
]

@NgModule({

    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]

})
export class AppRoutingModule {

}