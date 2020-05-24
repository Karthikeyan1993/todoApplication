import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Todo} from '../shared/model';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators, Validator} from '@angular/forms';
import {Util} from '../shared/Util';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  tags = ['General', 'Home', 'Office', 'Personal'];
  priorities = ['Low', 'Medium', 'High'];
  todo: Todo;
  task: FormGroup;
  util = Util;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date;
  minDate: Date;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder, private todoService: TodoService) {
   }
  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red', dateInputFormat: 'YYYY-MM-DD'});
    this.minDate = new Date(this.todo.duedate);
    this.task = this.fb.group({
     name: [this.todo.name],
     tag: [this.todo.tag],
     priority: [this.todo.priority],
     duedate: [new Date(this.todo.duedate)]
   });
  }

  onTagSelected = (tag: string): void => {
   this.task.controls.tag.setValue(tag);
  }

  onPrioritySelected = (priority: string): void => {
    this.task.controls.priority.setValue(priority);
  }

  updateTodo = (): void => {
    const param = Object.assign({}, this.todo);
    param.name = this.task.controls.name.value;
    param.tag = this.task.controls.tag.value;
    param.priority = this.task.controls.priority.value;
    param.duedate = this.task.controls.duedate.value;
    this.todoService.updateTodo(param)
    .subscribe((response) => {
      console.log('Todo Updated For Id', param.id);
      this.bsModalRef.hide();
      this.updateEmitter.emit(response);
    }, error => {
      console.log('Error while updating todo', error);
      this.bsModalRef.hide();
    });
  }
}
