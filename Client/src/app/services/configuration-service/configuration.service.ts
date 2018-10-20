import { Injectable } from '../../../../node_modules/@angular/core';
import { IAppConfig } from '../../entities/app-config.entity';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '../../../environments/environment.debug';

@Injectable()
export class ConfigurationService {

    static settings: IAppConfig;

    constructor(private httpCLient: HttpClient) {}

    load() {
        const jsonFile = `assets/config/app-config.${environment.name}.json`;
        return new Promise<any>((resolve, reject) => {
            this.httpCLient.get(jsonFile)
            .toPromise()
            .then((config: IAppConfig) => {
                ConfigurationService.settings = config;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}