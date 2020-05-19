import {Component, OnInit} from '@angular/core';
import {ColumnDef} from '../shared/model';
import {Todo} from '../shared/model';
import {TodoService} from '../todo.service';
import {BsModalService, BsModalRef} from "ngx-bootstrap/modal";
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];
  columnDefs: ColumnDef[] = [];
  status = '';
  bsTaskModalRef: BsModalRef = null;

  constructor(private todoService: TodoService, private bsModelService: BsModalService) {
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
    this.columnDefs.push({'prop': 'id', 'displayName': 'Id', 'width': 3});
    this.columnDefs.push({'prop': 'name', 'displayName': 'Name', 'width': 15});
    this.columnDefs.push({'prop': 'tag', 'displayName': 'Tag', 'width': 5});
    this.columnDefs.push({'prop': 'priority', 'displayName': 'Priority', 'width': 5});
    this.columnDefs.push({'prop': 'status', 'displayName': 'Status', 'width': 5});
    this.columnDefs.push({'prop': 'duedate', 'displayName': 'DueDate', 'width': 5})
    this.columnDefs.push({'prop': '', 'displayName': '', 'width': 5})
  }

  getBadgeCount = (status): number => {
    if (status == 'All') {
      return this.todoList.length;
    } else {
      return this.todoList.filter(ele => ele.status == status).length;
    }
  }

  deleteTodo = id => {
    this.todoService.deleteTodo(id)
      .subscribe((res) => {
        this.getAllTodos();
      });
  }

  openTaskComp=(param?:any):void=>{
    this.bsTaskModalRef = this.bsModelService.show(TaskComponent,{
      class: 'modal-lg'
    })
}

  filterData = status => this.status = status;

}
