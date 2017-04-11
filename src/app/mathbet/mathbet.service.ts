import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { LeagueModel } from './models/league.model'
import 'rxjs/Rx';

@Injectable()
export class MathService {

    constructor(public http: Http) { }


    public load(id: string): Observable<Object> {
        return this.http.get('./data/' + id + '.json')
            .map((res:Response) => res.json())
            .map(r=> new LeagueModel(r))
    }

}
