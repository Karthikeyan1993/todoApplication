import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TodoService } from '../todo.service';
import { TodoRequest } from '../shared/model';
import { Util } from '../shared/Util';
import { AppSettings } from '../shared/AppSettings';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  taskName = '';
  tags = ['General', 'Home', 'Office', 'Personal'];
  priorities = ['Low', 'Medium', 'High'];
  dates = [];
  selectedTag = 'General';
  selectedPriority = 'Low';
  selectedDate: Date = new Date();
  bsInlineValue: Date = new Date();
  minDate: Date = new Date();
  btnName: Date = new Date();
  defaultStatus = AppSettings.STATUS_IN_PROGRESS;
  bsConfig: Partial<BsDatepickerConfig>;
  util = Util;
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private todoService: TodoService) {
    this.init();
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-red' });
  }

  saveNewTask = (param?: any): void => {
    if (this.taskName.length >= 2) {
      const task: TodoRequest = {
        name: this.taskName,
        priority: this.selectedPriority,
        status: this.defaultStatus,
        tag: this.selectedTag,
        duedate: this.selectedDate,
      };
      this.todoService.saveTodo(task).subscribe(
        (response) => {
          this.saveEmitter.emit(response);
          this.bsModalRef.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onTagSelected = (tag: string): void => {
    this.selectedTag = tag;
  }

  onPrioritySelected = (priority: string): void => {
    this.selectedPriority = priority;
  }

  onDateSelected = (dt: Date): void => {
    this.selectedDate = dt;
    this.btnName = this.selectedDate;
  }

  onValueChange(value: Date): void {
    this.selectedDate = value;
    this.bsInlineValue = this.selectedDate;
  }

  private init = (param?: any): void => {
    const dt = new Date();
    dt.setDate(this.minDate.getDate() + 1);
    this.dates.push(
      { label: 'Today', value: this.minDate },
      { label: 'Tomorrow', value: dt }
    );
  }
}
