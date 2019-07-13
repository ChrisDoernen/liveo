import { Injectable } from "@angular/core";
import { ActivationEntity } from "@live/entities";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActivationStateService {

  private readonly _activation: BehaviorSubject<ActivationEntity> =
    new BehaviorSubject<ActivationEntity>(null);

  public readonly activation$: Observable<ActivationEntity> =
    this._activation.asObservable();

  public set activation(activation: ActivationEntity) {
    this._activation.next(activation);
  }

  constructor() { }
}
