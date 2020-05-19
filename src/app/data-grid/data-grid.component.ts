import {Component, OnInit, Input , EventEmitter,Output} from '@angular/core';
import {Todo, ColumnDef} from '../shared/model';
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input() todoList: Todo[];
  @Input() columnDefs: ColumnDef[];
  @Input() height;
  row=-1;
  prop = '';
  orderBy = "asc";
  @Output()deleteEmitter:EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
  }

  getPriorityClass = val => {
    return {
      'flag-high': val === 'High',
      'flag-medium': val === 'Medium',
      'flag-low': val === 'Low'
    }
  }

  getStatusClass = val => {
    return {
      'badge-danger': val === 'Overdue',
      'badge-success': val === 'Completed',
      'badge-primary': val === 'In Progress'
    }
  }
  doOrder = (prop: string) => {
    this.prop = prop;
    this.orderBy = this.orderBy == "asc" ? "desc" : "asc";
  };

  getClass = prop => {
    return {
      "fa-sort": prop != this.prop,
      "fa-caret-up": prop == this.prop && this.orderBy == "asc",
      "fa-caret-down": prop == this.prop && this.orderBy == "desc"
    };
  };

  deleteTodo = (id):void =>{
    this.deleteEmitter.emit(id);
  }

}
