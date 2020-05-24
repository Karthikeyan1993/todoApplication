import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo, ColumnDef } from '../shared/model';
import { TodoService } from '../todo.service';
import { Util } from '../shared/Util';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditTaskComponent } from '../edit-task/edit-task.component';
@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  @Input() todoList: Todo[];
  @Input() columnDefs: ColumnDef[];
  @Input() height;
  row = -1;
  prop = '';
  orderBy = 'asc';
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter<any>();
  util = Util;
  bsEditTaskModalRef: BsModalRef = null;
  constructor(
    private bsModalService: BsModalService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {}

  doOrder = (prop: string): void => {
    this.prop = prop;
    this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
  }

  getClass = (prop: string) => {
    return {
      'fa-sort': prop !== this.prop,
      'fa-caret-up': prop === this.prop && this.orderBy === 'asc',
      'fa-caret-down': prop === this.prop && this.orderBy === 'desc',
    };
  }

  deleteTodo = (id: string): void => {
    this.deleteEmitter.emit(id);
  }

  editTodo = (todo: Todo): void => {
    const initialState = {
      todo,
      class: 'modal-lg',
    };
    this.bsEditTaskModalRef = this.bsModalService.show(EditTaskComponent, {
      initialState,
    });
    this.bsEditTaskModalRef.content.updateEmitter.subscribe((response) => {
      this.updateEmitter.emit(response);
    });
  }

  updateUpto = (todo: Todo): void => {
    const param = Object.assign({}, todo);
    param.status = 'Completed';
    this.todoService.updateTodo(param).subscribe(
      (response) => {
        this.updateEmitter.emit(response);
      },
      (error) => {
        console.log('error while updating todo');
        console.log(error);
      }
    );
  }
}
