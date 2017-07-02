import { Watch } from "./watch.model";
import { Headers, Http, Response } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class WatchService {
    private watchs: Watch[] = [];
    watchIsEdit = new EventEmitter<Watch>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addWatch(watch: Watch) {
        const body = JSON.stringify(watch);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post('http://localhost:3000/watch' + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const watch = new Watch(
                    result.obj.url,
                    result.obj.cron,
                    result.obj.text,
                    result.obj._id);
                this.watchs.push(watch);

                return watch;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getWatchs() {
        return this.http.get('http://localhost:3000/watch')
            .map((response: Response) => {
                const watchs = response.json().obj;

                let transformedWatchs: Watch[] = [];
                for (let watch of watchs) {
                    transformedWatchs.push(new Watch(
                        watch.url,
                        watch.cron,
                        watch.text,
                        watch._id
                    ));
                }

                this.watchs = transformedWatchs;

                return transformedWatchs;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editWatch(watch: Watch) {
        this.watchIsEdit.emit(watch);
    }

    updateWatch(watch: Watch)  {
        const body = JSON.stringify(watch);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch('http://localhost:3000/watch/' + watch.id + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteWatch(watch: Watch) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        this.watchs.splice(this.watchs.indexOf(watch), 1);
        return this.http.delete('http://localhost:3000/watch/' + watch.id + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }
}