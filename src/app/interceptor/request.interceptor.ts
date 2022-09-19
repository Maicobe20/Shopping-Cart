import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../Services/Spinner/spinner.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    this.spinnerService.requestStarted()
    return this.handler(next, request);
  }

  handler(next:any, request:any){
    return next.handle(request)
    .pipe(
      tap(
        (event:any)=>{
          if(event instanceof HttpResponse){
            setTimeout(()=>{
              this.spinnerService.requestEnded()
            },1000)
          }
        },
        (err: HttpErrorResponse)=>{
          this.spinnerService.requestEnded()
          throw err
        }
      ),
    )
  }
}
