import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskName = '';
  tags = ['General', 'Home', 'Office', 'Personal'];
  priorities = ['Low', 'Medium', 'High'];
  dates = []
  selectedTag = 'General';
  selectedPriority = 'Low';
  selectedDate;
  bsInlineValue = new Date();
  minDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(public bsModalRef: BsModalRef) {
    this.minDate = new Date();
    this.selectedDate = new Date();
    const dt = new Date();
    dt.setDate(this.bsInlineValue.getDate() + 1);
    this.dates.push({label: 'Today', value: this.bsInlineValue}, {label: 'Tomorrow', value: dt});
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red'});
  }


  onTagSelected = (tag: string): void => {
    this.selectedTag = tag;
  }

  onPrioritySelected = (priority: string): void => {
    this.selectedPriority = priority;
  }

  onValueChange(value: Date): void {
    console.log(value);
  }

  getPriorityClass = val => {
    return {
      'flag-high': val === 'High',
      'flag-medium': val === 'Medium',
      'flag-low': val === 'Low'
    }
  }

  getTagClass = val => {
    return {
      'tag-general': val === 'General',
      'tag-home': val === 'Home',
      'tag-office': val === 'Office',
      'tag-personal': val === 'Personal'
    }
  }


}
