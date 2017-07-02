import { Component, Input } from "@angular/core";

import { Watch } from "./watch.model";
import { WatchService } from "./watch.service";

@Component({
    selector: '[app-watch]',
    templateUrl: './watch.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }

        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class WatchComponent {
    @Input() watch: Watch;

    constructor(private watchService: WatchService) {}

    onEdit() {
        this.watchService.editWatch(this.watch);
    }

    onDelete() {
        this.watchService.deleteWatch(this.watch)
            .subscribe(

            );
    }
}