import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { Stream } from "src/app/entities/stream.entity";

@Injectable({
    providedIn: "root"
})
export class StreamService {

    constructor(private _httpClient: HttpClient, private _endpointService: EndpointService) { }

    public getStream(id: string): Observable<Stream> {
        return this._httpClient.get(this._endpointService.getEndpoint(`streams/${id}`), { observe: "response", responseType: "json" })
            .pipe(map((response: any) => {
                return (response.status === 200) ? response.body as Stream : null;
            }));
    }
}
