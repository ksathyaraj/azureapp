import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {

  constructor(private dateService: DateService,private dataService: DataService) { }

  private staffDetaislRoute = '/api/staffdetails';
        private payslipsRoute = '/api/payslips';

        getStaffDetails (refresh:boolean, dataOperations:any, filterFn:any) {
            return this.dataService.getData(this.staffDetaislRoute, refresh, dataOperations, filterFn,null);
        }

        clearStaffDetailsCache () {
            this.dataService.invalidateRouteCache(this.staffDetaislRoute);
        }

        // getStaffDetailsPdf  () {
        //     return this.dataService.getReport('/api/pdf/staffdetails');
        // };

        // getStaffDetailsCsv  () {
        //     return this.dataService.getReport('/api/csv/staffdetails');
        // };


        getPayslips  (from:string, to:string, refresh:boolean, dataOperations:any, filterFn:any) {

            const paramFilters = {
              from :<any> null,
              to:<any> null
            };
            paramFilters.from= this.dateService.getFormattedDateForWebApi(from);
            paramFilters.to = this.dateService.getFormattedDateForWebApi(to);

            return this.dataService.getDataWithParams(this.payslipsRoute, paramFilters, refresh, dataOperations, filterFn);
        }

        clearPayslipsCache () {
            this.dataService.invalidateRouteCache(this.payslipsRoute);
        }
        

        getPayslipRecord  (payslipId:any) {

            return this.dataService.getRecord('/api/payslip/' + payslipId,false);
        }
        SendPayslipEmail  (cmd:any) {
            return this.dataService.post('/api/payslip/sendPayslipEmail', cmd);
        }
        // getPayslipPdf  (payslipId:any) {
        //     return this.dataService.getReport('/api/pdf/payslip/' + payslipId);
        // };
        getPayslipEmailDetails  (payslipId:any) {
            return this.dataService.getRecord('/api/payslip/getPayslipEmailDetails/' + payslipId,false);
        }
        getStaffPackageDetails (staffId:string, refresh:boolean) {
            return this.dataService.getRecord('/api/staff/' + staffId + '/packagedetails', refresh);
        }

        getStaff  (staffId:string) {
            return this.dataService.getRecord('/api/staff/' + staffId,false);
        }

        // getCompanySalarySchedulePdf  (from:string, to:string) {

        //     var paramFilters:any[string] = [];
        //     paramFilters["from"] = this.dateService.getFormattedDateForWebApi(from);
        //     paramFilters["to"] = this.dateService.getFormattedDateForWebApi(to);

        //     return this.dataService.getReportWithParams('/api/pdf/companysalaryschedule', paramFilters);
        // };

        // getCompanySalaryScheduleCsv  (from:string, to:string) {

        //     var paramFilters:any[string] = [];
        //     paramFilters["from"] = this.dateService.getFormattedDateForWebApi(from);
        //     paramFilters["to"] = this.dateService.getFormattedDateForWebApi(to);

        //     return this.dataService.getReportWithParams('/api/csv/companysalaryschedule', paramFilters);
        // };

        // getIndividualSalarySchedulePdf  (staffId:string, taxYear:string) {

        //     var paramFilters:any[string] = [];
        //     paramFilters["staffId"] = staffId;
        //     paramFilters["taxYear"] = taxYear;

        //     return this.dataService.getReportWithParams('/api/pdf/individualsalaryschedule', paramFilters);
        // };

        // exportIndividualSalaryScheduleCsv  (staffId:string, taxYear:string) {
        //     var paramFilters: any[string] = [];
        //     paramFilters["staffId"] = staffId;
        //     paramFilters["taxYear"] = taxYear;

        //     return this.dataService.getReportWithParams('/api/csv/individualsalaryschedule', paramFilters);
        // };

        deleteStaffMember (staffId:string) {
            return this.dataService.post('/api/staff/' + staffId + '/delete');
        }

        saveStaffMember  (staffMember:any) {

            if (staffMember.employmentStartDate) {
                staffMember.employmentStartDate = this.dateService.getFormattedDateForWebApi(staffMember.employmentStartDate);
            }

            if (staffMember.terminationDate) {
                staffMember.terminationDate = this.dateService.getFormattedDateForWebApi(staffMember.terminationDate);
            }

            return this.dataService.post('/api/staff/save', staffMember);
        }

        savePackageDetails (staffId:string, packagedetails:string) {
            return this.dataService.post('/api/staff/' + staffId + '/packagedetails/save', packagedetails);
        }

        getNewPayslip (staffId:string) {
            return this.dataService.getRecord('/api/staff/' + staffId + '/newpayslip',false);
        }

        savePayslip (payslip:any) {

            payslip.payslipFrom = this.dateService.getFormattedDateForWebApi(payslip.payslipFrom);
            payslip.payslipTo = this.dateService.getFormattedDateForWebApi(payslip.payslipTo);

            return this.dataService.post('/api/payslip/save', payslip);
        }

        deletePayslip  (id:string) {
            return this.dataService.post('/api/payslip/' + id + '/delete');
        }

}
