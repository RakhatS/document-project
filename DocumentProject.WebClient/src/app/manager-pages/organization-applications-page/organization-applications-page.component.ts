import { Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from '../../_services/organization.service';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../../_services/application.service';
import { MemberService } from '../../_services/member.service';
import { Application } from '../../_models/application';
import { Organization } from '../../_models/organization';

// import * as htmlToImage from 'html-to-image';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-organization-applications-page',
  templateUrl: './organization-applications-page.component.html',
  styleUrls: ['./organization-applications-page.component.scss']
})
export class OrganizationApplicationsPageComponent implements OnInit {

  @Input() organization: Organization | undefined;
  isApplicationDetailsModalOpened: boolean = false;
  selectedApplication: Application | undefined;
  loading:boolean=false;

  ngOnInit(): void {
    this.getApplications();
  }

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private memberService: MemberService
  ) { }


  getApplications() {
    if (!this.organization || !this.organization.id)
      return;

    this.loading = true;
    this.applicationService.getOrganizationApplications(this.organization.id).subscribe(res => {
      this.organization!.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    });
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
    this.loading = true;
    this.applicationService.getApplicationDocument(application.id!).subscribe(res => {
      application.document = res.content;

      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  changeApplicationStatus(application: Application, newStatus: string) {
    this.loading = true;
    this.applicationService.changeApplicationStatus(application.id!, newStatus).subscribe(res => {
      application.status = res.status;

      this.loading = false;
      this.getApplicationDocument(application);
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }


  // generateImage() {
  //   var node: any = document.getElementById('organization-applications');
  //   htmlToImage.toPng(node)
  //     .then(function (dataUrl) {
  //       var img = new Image();
  //       img.src = dataUrl;
  //       console.log(img);
        
  //       document.body.appendChild(img);
  //     })
  //     .catch(function (error) {
  //       console.error('oops, something went wrong!', error);
  //     });
  // }

  public downloadApplicationDocumentPdf(application:Application) {
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
      pdf.save('Application-'+application.id+'.pdf'); // Generated PDF   
      this.loading = false;
    });
  }
}
