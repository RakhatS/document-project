import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/_models/application';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { ApplicationService } from 'src/app/_services/application.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import { Constants } from 'src/app/_helpers/contants';

@Component({
  selector: 'app-applications-admin-page',
  templateUrl: './applications-admin-page.component.html',
  styleUrls: ['./applications-admin-page.component.scss']
})
export class ApplicationsAdminPageComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = false;
  applications: Application[] = [];
  selectedStatus: string | null = null;

  isApplicationDetailsModalOpened: boolean = false;
  selectedApplication: Application | undefined;

  constructor(private applicationService: ApplicationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }
    this.getApplications();
  }

  getApplications() {
    this.loading = true;
    this.applicationService.getApplicationsList().subscribe(res => {
      this.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  getFilteredApplications(): Application[] {
    if (this.selectedStatus != null && this.selectedStatus != 'All') {
      return this.applications.filter(x => x.status == this.selectedStatus);
    }
    return this.applications;
  }


  forceDelete(applicationId: string) {
    this.loading = true;
    this.applicationService.forceDeleteApplication(applicationId).subscribe(res => {
      this.loading = false;
      this.getApplications();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }


  openApplicationDetailsModal(application: Application) {
    this.selectedApplication = application;
    this.getApplicationDocument(application);
    this.isApplicationDetailsModalOpened = true;
  }
  closeApplicationDetailsModal() {
    this.isApplicationDetailsModalOpened = false;
    this.selectedApplication = undefined;
  }


  getApplicationDocument(application: Application) {
    this.applicationService.getApplicationDocument(application.id!).subscribe(res => {
      application.document = res.content;

      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  public downloadApplicationDocumentPdf(application: Application) {
    this.loading = true;

    var data = document.getElementById('application-document');  //Id of the table
    html2canvas(data!).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Application-' + application.id + '.pdf'); // Generated PDF   
      this.loading = false;
    });
  }
}
