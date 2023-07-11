import { Injectable } from '@angular/core';
import { Subject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  observable = new Subject<any>();
  observer=this.observable;

  broadcast(eventName:any,args?:any) {
    this.observer.next({name:eventName,args:args});
  }

  on(eventName:any, callback?:any) {
    this.observable
        .pipe(filter((event) => {
            return event.name === eventName;
          }))
        .pipe(map((event)=>event.args))
        .subscribe({
            next:callback
        });
  }

  broadcastCheckFormValidatity(){
      this.broadcast('show-errors-check-validity');
  }

  broadcastResetFormValidatity() {
      this.broadcast('show-errors-reset');
  }

  broadcastLoginSuccess(){
      this.broadcast('login.success');
  }
  listenForLoginSuccess(callback:(args:any)=>void) {
      this.on('login.success', callback);
  }

  broadcastCompanyProfileSaved(args?:any) {
      this.broadcast('companyprofile.saved', args);
  }
   listenCompanyProfileSaved(callback:(args:any)=>void) {
      this.on('companyprofile.saved', callback);
  }

  broadcastGlobalErrorEvent(args:any) {
      this.broadcast('globalErrorEvent', args);
  }
  listenGlobalErrorEvent(callback:(args:any)=>void) {
      this.on('globalErrorEvent', callback);
  }

  broadcastGlobalWarningEvent(args:any) {
      this.broadcast('globalWarningEvent', args);
  }
  listenGlobalWarningEvent(callback:(args:any)=>void) {
      this.on('globalWarningEvent', callback);
  }

  broadcastGlobalClearErrorEvent() {
      this.broadcast('globalClearErrorEvent');
  }
  listenGlobalClearErrorEvent(callback:(args:any)=>void) {
      this.on('globalClearErrorEvent', callback);
  }

  broadcastTranslationsRecievedEvent() {
      this.broadcast('translations-received-event');
  }
  listenTranslationsRecievedEvent(callback:(args:any)=>void) {
      this.on('translations-received-event', callback);
  }

  broadcastGlobalTranslationRefresh() {
      this.broadcast('translations-refresh-event');
  }

  listenGlobalTranslationRefresh(callback:(args:any)=>void) {
      this.on('translations-refresh-event', callback);
  }

  broadcastCashFlowDataCompleteEvent(args:any) {
      this.broadcast('cashFlowDataCompleteEvent', args);
  }

  listenCashFlowDataCompleteEvent(callback:(args:any)=>void) {
      this.on('cashFlowDataCompleteEvent', callback);
  }

  broadcastEditableItemOnEditModeEvent(args:any) {
      this.broadcast('editableItemOnEditModeEvent', args);
  }

  listenEditableItemOnEditModeEvent(callback:(args:any)=>void) {
      this.on('editableItemOnEditModeEvent', callback);
  }

  listenVatDateChangedEvent(callback:(args:any)=>void){
      this.on('vatDateChangedEvent', callback);
  }

  broadcastVatDateChangedEvent(args:any){
      this.broadcast('vatDateChangedEvent', args);
  }
}
