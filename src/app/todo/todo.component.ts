import {Component, OnInit} from '@angular/core';
import {ColumnDef} from '../shared/model';
import {Todo} from '../shared/model';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];
  columnDefs: ColumnDef[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init = (param?: any): void => {
    this.getAllTodos();
    this.getColumnsDef();
  }

  private getAllTodos = (param?: any): void => {
    this.todoService.getAllTodos().subscribe((response) => this.todoList = response);
  }

  private getColumnsDef = (param?: any): void => {
    this.columnDefs.push({'prop': 'id', 'displayName': 'Id'});
    this.columnDefs.push({'prop': 'name', 'displayName': 'Name'});
    this.columnDefs.push({'prop': 'tag', 'displayName': 'Tag'});
    this.columnDefs.push({'prop': 'priority', 'displayName': 'Priority'});
    this.columnDefs.push({'prop': 'status', 'displayName': 'Status'});
    this.columnDefs.push({'prop': 'duedate', 'displayName': 'DueDate'})
  }

}
