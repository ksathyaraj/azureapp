import { Injectable } from '@angular/core';
import {DateService} from "../services/date.service"

@Injectable({
  providedIn: 'root'
})

export class SimpleListScreenViewModelService {

  constructor(private dateService: DateService) { }
  
    data = [];
    filteredCount = null;
    fullCount = null;
    pagedData = [];
    dataOperations = {
        search: null,
        paging: {
            pageSize: 15,
            currentPage: 1,
            maxPagesToShow: 15
        },
        sortPredicate: null,//this should be set in the controller that uses this viewmodel
        sortOrder: true
    };
    alphabetFilterAttributeName = null;//this should be set in the controller that uses thie viewmodel
    showVat = false;

    
pageWord = '';
ofWord = '';
fromDate = null;
toDate = null;
setFilterSettings = (filters:any)=> {
    this.dataOperations.search = filters.search;
    this.fromDate = filters.from;
    this.toDate = filters.to;
};

getFilterSettings = (filterSettings:any)=>
 {
    filterSettings.search = this.dataOperations.search;
    filterSettings.from = this.fromDate ? this.dateService.getFormattedMoment(this.fromDate) : null;
    filterSettings.to = this.toDate ? this.dateService.getFormattedMoment(this.toDate) : null;
};

recordCountDescription = () => {
    if (this.filteredCount || this.fullCount) {
        if (this.filteredCount === this.fullCount) {
            return '(' + this.filteredCount + ')';
        }
        else {
            return '(' + this.filteredCount + ' ' + this.ofWord + ' ' + this.fullCount + ')';
        }
    } else {
        return '';
    }
};
currentPageDescription =  () =>{
    if (this.filteredCount || this.fullCount) {
        return this.pageWord + ' ' + this.dataOperations.paging.currentPage + ' ' + this.ofWord + ' ' + (Math.floor(this.filteredCount?this.filteredCount:0 / this.dataOperations.paging.pageSize) + 1);
    }
    else {
        return '';
    }
};

// refreshData = () => {
//     this.getData(true);
// };

// refreshDataWithValidation =  (frm:any) =>{
//     this.getData(true, frm);
// };

filterFn = null;//placeholder, function will be set at runtime by filterBy function below and searchBY in controllers

//nasty javascript hackery because this function will only be called from within the alphabetFilter directive, NASTY!!!
filterBy =  (vm:any) =>{
    return function (letter:any) {
        vm.dataOperations.search = null;
        vm.filterFn =  (datum:any) =>{
            return datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith(letter.toLowerCase());
        };

        vm.getData();
    };
};

//nasty javascript hackery because this function will only be called from within the alphabetFilter directive, NASTY!!!
filterByNumbers = (vm:any)=> {
    return function() {
        vm.dataOperations.search = null;
        vm.filterFn = function (datum:any) {
            return !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('a') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('b') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('c') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('d') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('e') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('f') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('g') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('h') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('i') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('j') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('k') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('l') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('m') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('n') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('o') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('p') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('q') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('r') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('s') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('t') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('u') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('v') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('w') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('x') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('y') &&
                !datum[vm.alphabetFilterAttributeName].toLowerCase().startsWith('z');
        };

        vm.getData();
    };
};

// function initTranslation() {
//     $translate('resources.common-page-label').then(function (msg) {
//         pageWord = msg;
//     });
  
//     $translate('resources.common-of-label').then(function (msg) {
//         ofWord = msg;
//     });
// }

// MessagingService.listenGlobalTranslationRefresh(function () {
//     initTranslation();
// });

// initTranslation();

// clearFilterBy =  ()=> {
//     this.filterFn= null;
//     this.dataOperations.search = null;
//     this.getData();
// };
}
