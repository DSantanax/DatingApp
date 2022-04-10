import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;

  // Gallery fields
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();    

    // Ngx-Gallery image options
    this.galleryOptions = [{
      width: '400px',
      height: '400px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for( let img of this.member.photos) {
      imageUrls.push({
        small: img?.url,
        medium: img?.url,
        big: img?.url
      });
    }
    return imageUrls;
  }

  loadMember() {
    this.memberService.getMember(this.actRouter.snapshot.paramMap.get('username')).subscribe((member: Member) => {
      this.member = member;
      this.galleryImages = this.getImages();

    });
    
  }
}
