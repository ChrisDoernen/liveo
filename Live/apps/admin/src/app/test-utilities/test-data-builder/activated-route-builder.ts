import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

export class ActivatedRouteBuilder {
  private readonly _activatedRoute: ActivatedRoute;

  constructor() {
    this._activatedRoute = new ActivatedRoute();
  }

  public withSnapshot(snapshot: ActivatedRouteSnapshot): ActivatedRouteBuilder {
    this._activatedRoute.snapshot = snapshot;
    return this;
  }

  public build(): ActivatedRoute {
    return this._activatedRoute;
  }
}