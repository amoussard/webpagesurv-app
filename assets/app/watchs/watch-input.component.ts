import { Component, OnInit } from "@angular/core";

import { WatchService } from "./watch.service";
import { Watch } from "./watch.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-watch-input',
    templateUrl: './watch-input.component.html'
})
export class WatchInputComponent implements OnInit {
    watch: Watch;
    watchForm: FormGroup;

    constructor(private watchService: WatchService) {}

    ngOnInit() {
        this.watchService.watchIsEdit.subscribe(
            (watch: Watch) => this.watch = watch
        );

        this.watchForm = new FormGroup({
            url: new FormControl(null, Validators.required),
            cron: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const watch = new Watch(
            this.watchForm.value.url,
            this.watchForm.value.cron,
            this.watchForm.value.text
        );
        this.watchService.addWatch(watch)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        this.watchForm.reset();
    }
}