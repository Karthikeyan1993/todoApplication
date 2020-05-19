import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskName = '';
  tags = ['General', 'Home', 'Office', 'Personal'];
  selectedTag = 'General';

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  onTagSelected = (tag: string): void => {
    this.selectedTag = tag;
  }

}
