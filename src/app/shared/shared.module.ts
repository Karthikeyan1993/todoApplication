import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ngx-bootstrap/modal";
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [CommonModule, ModalModule.forRoot(),PopoverModule.forRoot()],
  exports: [CommonModule, ModalModule]
})
export class SharedModule {
  constructor() {
  }
}
