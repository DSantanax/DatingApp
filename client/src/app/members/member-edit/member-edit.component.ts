import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // Access template ref. form in template
  @ViewChild('editForm') editForm: NgForm;
  // Notify user of unsaved changes if they leave the app. through their browser
  @HostListener('window:beforeUnload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User;
  // Shorthand D.I.
  constructor(private accountService: AccountService, private membersService: MembersService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: User) => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    // Loads member current user
    this.membersService.getMember(this.user.username).subscribe((member: Member) => this.member = member);
  }

  updateMember() {
    console.log(this.member);
    this.membersService.updateMember(this.member).pipe(take(1)).subscribe(() => {
      this.toastr.success('Updated', 'Profile updated successfully!');
      this.editForm.reset(this.member);
      console.log(this.member);
    });
  }

}
