import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingSpinnerService} from '../loading-spinner.service';

@Component({
  selector: 'app-ng9-loading-spinner',
  templateUrl: './ng9-loading-spinner.component.html',
  styleUrls: ['./ng9-loading-spinner.component.css']
})
export class Ng9LoadingSpinnerComponent implements OnInit {
  flag$: Observable<boolean>;
  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  private getStatus = (param?: any): void => {
    this.flag$ = this.loadingSpinnerService.getStatus();
  }

}
