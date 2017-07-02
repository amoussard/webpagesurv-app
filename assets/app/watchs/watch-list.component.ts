import { Component, OnInit } from "@angular/core";
import { Watch } from "./watch.model";
import { WatchService } from "./watch.service";

@Component({
    selector: 'app-watch-list',
    templateUrl: './watch-list.component.html'
})
export class WatchListComponent implements OnInit {
    watchs: Watch[];

    constructor(private watchService: WatchService) {}

    ngOnInit() {
        this.watchService.getWatchs()
            .subscribe(
                (watchs: Watch[]) => this.watchs = watchs
            );
    }
}