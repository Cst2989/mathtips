import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
@Injectable()
export class AppService {

    constructor(public http: Http) { }


    public load(): Observable<Object> {
        return this.http.get('/data/premierleague.json')
            .map((res:Response) => res.json())
    }

}
