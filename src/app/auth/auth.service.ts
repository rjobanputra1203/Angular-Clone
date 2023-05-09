import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { user } from "./user.model";


export interface AuthResponseData {
kind : string;
idToken : string;
email : string;
refreshToken : string;
expiresIn : string;
localID : string;
registered ?: boolean;
}


@Injectable({providedIn : 'root'})
export class AuthService{

    // user = new Subject<User>();

    
    constructor(private http : HttpClient) {}
    signup(email : string , password : string) {
       return this.http.post<AuthResponseData>
           ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB379pnddcjCBtHqKuuJThMIl3-cqqP6tk' , 
        {
                email : email,
                password : password ,
                returnSecureToken	 : true
        }
        ).pipe(catchError(errorRes =>
            {
                let errorMessage = "An unknown error  occured in signup "
                

            switch (errorRes.error.error.message) {
                case "EMAIL_EXISTS":
                    errorMessage = "Email already exists";
                    break;

                case "INAVALID_PASSWORD":
                    errorMessage = "please enter a valid password"
                    break;
            }
                return throwError(errorMessage)
            

            }))
    }

    login(email : string , password : string)
    {
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB379pnddcjCBtHqKuuJThMIl3-cqqP6tk' , 
            {
                email: email,
                password: password,
                returnSecureToken: true
            
                }).pipe(catchError(errorRes => {
                    let errorMessage = "Unknown error Login"
                    

                    switch (errorRes.error.error.message) {
                        case "EMAIL_NOT_FOUND":
                            errorMessage = "Email not found";
                            break

                        case "INVALID_PASSWORD":
                            errorMessage = "please enter a valid password"
                            break   
                    }

                   
                        return throwError(errorMessage)
                    

                    // return throwError(errorMessage)
                }))
    }
}