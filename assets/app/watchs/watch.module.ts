import { NgModule } from "@angular/core";
import { WatchsComponent } from "./watchs.component";
import { WatchListComponent } from "./watch-list.component";
import { WatchComponent } from "./watch.component";
import { WatchInputComponent } from "./watch-input.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { WatchService } from "./watch.service";

@NgModule({
    declarations: [
        WatchsComponent,
        WatchListComponent,
        WatchComponent,
        WatchInputComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [WatchService]
})
export class WatchModule {

}