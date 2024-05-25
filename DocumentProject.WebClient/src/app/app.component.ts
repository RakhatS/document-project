import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstDataService } from './_services/const-data.service';
import { Constants } from './_helpers/contants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DocumentProject.WebClient';

  constructor(private route: Router,
    private constDataService: ConstDataService
  ) { }

  ngOnInit(): void {
    this.initSomeConstantsFromServer();
  }


  initSomeConstantsFromServer() {
    this.constDataService.getApplicationNames().subscribe(res => {
      Constants.applicationNames = res;
    })

  }
}
