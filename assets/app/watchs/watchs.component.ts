import { Component } from "@angular/core";

@Component({
    selector: 'app-watchs',
    template: `
        <div class="row">
            <app-watch-input></app-watch-input>
        </div>
        <hr>
        <div class="row">
            <app-watch-list></app-watch-list>
        </div>
    `
})
export class WatchsComponent {

}