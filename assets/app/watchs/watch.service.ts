import { Watch } from "./watch.model";
import { Headers, Http, Response } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";
import * as io from 'socket.io-client';

@Injectable()
export class WatchService {
    private url = 'http://localhost:3000';
    private socket;
    private watchs: Watch[] = [];
    watchIsEdit = new EventEmitter<Watch>();

    constructor(private http: Http, private errorService: ErrorService) {
        this.socket = io.connect(this.url);
    }

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
                    result.obj.changed,
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
        return new Observable(observer => {
            this.http.get('http://localhost:3000/watch')
                .map((response: Response) => {
                    const watchs = response.json().obj;

                    let transformedWatchs: Watch[] = [];
                    for (let watch of watchs) {
                        transformedWatchs.push(new Watch(
                            watch.url,
                            watch.cron,
                            watch.text,
                            watch.changed,
                            watch._id
                        ));
                    }

                    this.watchs = transformedWatchs;

                    return transformedWatchs;
                })
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                })
                .subscribe((watchs: Watch[]) => {
                    observer.next(watchs);
                });

                this.socket.on('watch_changed', id => {
                    this.watchs.map(watch => {
                        if (watch.id === id) {
                            watch.changed = true;
                        }
                    });
                    observer.next(this.watchs);
                });
                this.socket.on('watch_unchanged', id => {
                    this.watchs.map(watch => {
                        if (watch.id === id) {
                            watch.changed = false;
                        }
                    });
                    observer.next(this.watchs);
                });

                return () => {
                    this.socket.disconnect();
                };
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