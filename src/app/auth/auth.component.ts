import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";


@Component(
{
    selector: 'app-auth',
    templateUrl : './auth.component.html'
}
)

export class AuthComponent {
    isLoginMode = true
    isLoading = false
    error : string = null 

    constructor(private authservice : AuthService) {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }
    onSubmit(form : NgForm) {
        if(!form.valid)
        {
            return;
        }
        const email = form.value.email
        const password = form.value.password
        console.log(email , password)

        let authObs : Observable<AuthResponseData>

        // this.isLoginMode = true  
        if (this.isLoginMode) {
             authObs = this.authservice.login(email,password)
            
        }


        else
        {

             authObs  = this.authservice.signup(email, password)
            
        }

        authObs.subscribe(
            resData => {
                console.log(resData)
            },
            errorMessage => {

                this.error = errorMessage
                // console.log(errorMessage)
            }
        )


        form.reset()
    }
}