import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { Router } from '@angular/router';
import { MemberService } from '../../_services/member.service';
import { Application } from '../../_models/application';
import { OrganizationService } from '../../_services/organization.service';
import { Member } from '../../_models/member';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../../_services/application.service';
import { Organization } from '../../_models/organization';
import { Constants } from '../../_helpers/contants';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-my-organization-page',
  templateUrl: './my-organization-page.component.html',
  styleUrls: ['./my-organization-page.component.scss']
})
export class MyOrganizationPageComponent implements OnInit {

  loading: boolean = false;
  applications: Application[] = [];
  member: Member | undefined | null;
  organization: Organization | undefined;
  newApplication: Application = new Application();
  applicationNames = Constants.applicationNames;

  isApplicationDetailsModalOpened: boolean = false;
  selectedApplication: Application | undefined;

  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private applicationService: ApplicationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Member") {
      this.router.navigate(['/']);
      return;
    }

    this.getMember();
    this.getApplications();
  }


  getMember() {
    this.loading = true;

    this.memberService.currentMember().subscribe(res => {
      this.member = res;
      this.loading = false;
      this.getOrganization();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    });
  }

  getOrganization() {
    if (!this.member || !this.member.organizationId) {
      return;
    }
    this.loading = true;

    this.organizationService.getOrganizationById(this.member.organizationId).subscribe(res => {
      this.organization = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    });
  }

  getApplications() {
    this.loading = true;

    this.applicationService.getMemberApplications().subscribe(res => {
      this.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  createApplication() {
    if(!this.organization || !this.member){
      return;
    }

    this.newApplication.organizationId = this.organization.id;  
    this.newApplication.memberId = this.member.id;

    this.applicationService.createApplication(this.newApplication).subscribe(res => {
      this.loading = false;
      this.newApplication = new Application();
      this.getApplications();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  openApplicationDetailsModal(application: Application){
    this.selectedApplication = application;
    this.getApplicationDocument(application);
    this.isApplicationDetailsModalOpened = true;
  }
  closeApplicationDetailsModal(){
    this.isApplicationDetailsModalOpened = false;
    this.selectedApplication = undefined;
  }


  getApplicationDocument(application: Application){
    this.applicationService.getApplicationDocument(application.id!).subscribe(res => {
      application.document = res.content;
      
      this.loading = false;
    },error => {
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
