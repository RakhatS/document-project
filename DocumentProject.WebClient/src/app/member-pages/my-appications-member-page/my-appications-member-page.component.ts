import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_helpers/contants';
import { Application } from 'src/app/_models/application';
import { Member } from 'src/app/_models/member';
import { Organization } from 'src/app/_models/organization';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { ApplicationService } from 'src/app/_services/application.service';
import { MemberService } from 'src/app/_services/member.service';
import { OrganizationService } from 'src/app/_services/organization.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-my-appications-member-page',
  templateUrl: './my-appications-member-page.component.html',
  styleUrls: ['./my-appications-member-page.component.scss']
})
export class MyAppicationsMemberPageComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = false;
  applications: Application[] = [];
  organization: Organization | undefined;
  member: Member | undefined | null;
  newApplication: Application = new Application();
  applicationNames = Constants.applicationNames;
  selectedApplication: Application | undefined;
  selectedStatus: string | null = null;

  isApplicationDetailsModalOpened: boolean = false;

  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private applicationService: ApplicationService
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

  getFilteredApplications(): Application[] {
    if (this.selectedStatus != null && this.selectedStatus != 'All') {
      return this.applications.filter(x => x.status == this.selectedStatus);
    }
    return this.applications;
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
    if (!this.organization || !this.member) {
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
