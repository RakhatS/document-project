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
  
  shouMenuAndHeader: boolean = true;

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



  checkPath() {
    let path = this.route.url.split('/')[1];
    let routePath = decodeURIComponent(path);
    if (routePath == 'sign-in') {
      this.shouMenuAndHeader = false;
    }
    else {
      this.shouMenuAndHeader = true;
    }
    // console.log(this.shouMenuAndHeader);

  }

}
