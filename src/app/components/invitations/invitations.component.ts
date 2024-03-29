import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Invitation } from '../../models/models';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  userInvitations: Array<Invitation> = [];
  public successSnackMessage: string;
  public errorSnackMessage: string;
  loading = true;
  componentName = 'InvitationsComponent';

  constructor(private us: UsersService,
              private router: Router,
              public ps: PageService,
              private hs: HelperService) { }

  ngOnInit(): void {
    this.hs.updateBrowserMeta('SkyNovels | Invitaciones', 'Invitaciones para colaboración en novelas', 'https://api.skynovels.net/img/banner1.jpg');
    this.us.getUserInvitations().subscribe((data: any) => {
      this.userInvitations = data.invitations;
      this.loading = false;
    }, error => {
      this.router.navigate(['novelas']);
    });
  }

  declineOrAcceptInvitation(invitation: Invitation, status: 'Confirmed' | 'Rejected') {
    invitation.invitation_status = status;
    this.us.updateUserInvitation(invitation).subscribe((data: any) => {
      this.userInvitations.splice(this.userInvitations.findIndex(x => x.id === invitation.id), 1);
    }, error => {
      this.ps.presentToast('danger', error.error.message);
    });
  }

}
