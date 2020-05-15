import {Component, OnInit, Input} from '@angular/core';
import {Todo, ColumnDef} from '../shared/model';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input() todoList: Todo[];
  @Input() columnDefs: ColumnDef[];
  row=-1;

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

}
