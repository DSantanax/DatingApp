import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

// Notify user if they navigate away from the component to another within app
@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MemberEditComponent): boolean {
      if(component.editForm.dirty) {
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
      } 
      return true;
  }
}
