import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              // mult. errors
              if (err.error.errors) {
                const modalStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    // flatten array of errors
                    modalStateErrors.push(err.error.errors[key]);
                  }
                }
                // Return validation errors to display
                throw modalStateErrors.flat();
              } else {
                // single error
                this.toastr.error(err.statusText, err.status.toString());
              }
              break;
            case 401:
              this.toastr.error(err.statusText, err.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const naviExtras: NavigationExtras = { state: { error: err.error } };
              this.router.navigateByUrl('/server-error', naviExtras);
              break;
            default:
              this.toastr.error("Something unexpectedly went wrong.");
              console.dir(err);
              break;
          }
        }
        return throwError(err);
      })
    );
  }
}
