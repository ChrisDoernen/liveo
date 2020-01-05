import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";

  public get form() {
    return this.loginForm.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    // reset login status
    this._authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  public login(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authenticationService
      .login(this.form.username.value, this.form.password.value)
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
