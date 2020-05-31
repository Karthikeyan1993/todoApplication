import {Component, OnInit} from '@angular/core';
import {ColumnDef} from '../shared/model';
import {Todo} from '../shared/model';
import {TodoService} from '../todo.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {TaskComponent} from '../task/task.component';
import {AppSettings} from '../shared/AppSettings';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];
  columnDefs: ColumnDef[] = [];
  status = '';
  bsTaskModalRef: BsModalRef = null;
  appSetting = AppSettings;
  constructor(
    private todoService: TodoService,
    private bsModelService: BsModalService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(response => {
      if (response) {
        this.todoList = [...response.todos];
      }
    });
    this.init();
  }

  getBadgeCount = (status: string): number => {
    if (status === 'All') {
      return this.todoList.length;
    } else {
      return this.todoList.filter((ele) => ele.status === status).length;
    }
  }

  deleteTodo = (id: string): void => {
    this.todoService.deleteTodo(id).subscribe((res) => {
      this.getAllTodo();
      console.log('todo deleted successfully', res);
    }, error => {
      console.log('error in deleting todo', error);
    });
  }

  updateTodo = (): void => {
    this.getAllTodo();
  }

  openTaskComp = (): void => {
    this.bsTaskModalRef = this.bsModelService.show(TaskComponent, {
      class: 'modal-lg',
    });
    this.bsTaskModalRef.content.saveEmitter.subscribe((data) => {
      console.log('todo saved', data);
      this.getAllTodo();
    });
  }

  filterData = (status) => (this.status = status);

  private init = (): void => {
    this.getColumnsDef();
  }

  private getAllTodo = (): void => {
    this.todoService
      .getAllTodos()
      .subscribe((response) => (this.todoList = response));
  }

  private getColumnsDef = (): void => {
    this.columnDefs.push({prop: 'id', displayName: 'Id', width: 3});
    this.columnDefs.push({prop: 'name', displayName: 'Name', width: 15});
    this.columnDefs.push({prop: 'tag', displayName: 'Tag', width: 5});
    this.columnDefs.push({
      prop: 'priority',
      displayName: 'Priority',
      width: 5,
    });
    this.columnDefs.push({prop: 'status', displayName: 'Status', width: 5});
    this.columnDefs.push({prop: 'duedate', displayName: 'DueDate', width: 5});
    this.columnDefs.push({prop: '', displayName: '', width: 5});
  }
}
