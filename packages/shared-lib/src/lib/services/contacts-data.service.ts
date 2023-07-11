import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  constructor(private dataService: DataService) { }

  private organisationContactsRoute = '/api/organizationcontacts';
  private individualContactsRoute = '/api/organisationindividualcontacts';
  private salesLeadRoute = '/api/salesleads';

  getIndividualsByOrganisationRoute(organisationId: any) {
    return '/api/organisationindividualcontacts/' + organisationId;
  }

  getProjectsByOrganisationRoute(organisationId: any) {
    return '/api/projects/' + organisationId;
  }

  clearOrganisationContactsCache() {
    this.dataService.invalidateRouteCache(this.organisationContactsRoute);
  }

  clearSalesLeadContactsCache() {
    this.dataService.invalidateRouteCache(this.salesLeadRoute);
  }
  clearIndividualContactsCache(organisationId: any) {
    this.dataService.invalidateRouteCache(this.individualContactsRoute);
    this.dataService.invalidateRouteCache(this.getIndividualsByOrganisationRoute(organisationId));
  }

  clearProjectsCache(organisationId: any) {
    this.dataService.invalidateRouteCache(this.getProjectsByOrganisationRoute(organisationId));
  }

  getOrganizationContacts(refresh: boolean, dataOperations: any, filterFn: any) {
    return this.dataService.getData(this.organisationContactsRoute, refresh, dataOperations, filterFn);
  }

  // getOrganisation(organisationContactId: boolean) {
  //   return this.dataService.getRecord('/api/organisationContact/' + organisationContactId);
  // };

  getOrganisationIndividualContacts(refresh: boolean, dataOperations: any, filterFn: any) {
    return this.dataService.getData(this.individualContactsRoute, refresh, dataOperations, filterFn);
  }

  getOrganisationIndividualContactsByOrganisation(refresh: boolean, dataOperations: any, filterFn: any, organisationId: any) {
    return this.dataService.getData(this.getIndividualsByOrganisationRoute(organisationId), refresh, dataOperations, filterFn);
  }

  getProjects(refresh: boolean, dataOperations: any, filterFn: any, organisationId: any) {
    return this.dataService.getData(this.getProjectsByOrganisationRoute(organisationId), refresh, dataOperations, filterFn);
  }

  // getProject(id: any) {
  //   return this.dataService.getRecord('/api/project/' + id);
  // };

  getOrganisationContactCustomerInvoices(refresh: boolean, dataOperations: any, filterFn: any, organisationId: any) {
    return this.dataService.getData('/api/organisationContactInvoices/' + organisationId, refresh, dataOperations, filterFn);
  }

  getOrganisationIndividualContact(contactId: any) {
    return this.dataService.getRecord('/api/organisationIndividualContact/' + contactId, true);
  }

  getSalesLeads(refresh: boolean, dataOperations: any, filterFn: any) {
    return this.dataService.getData('/api/salesleads', refresh, dataOperations, filterFn);
  }

  // getSalesLead(salesLeadId: any) {
  //   return this.dataService.getRecord('/api/saleslead/' + salesLeadId);
  // };
  saveSalesLead(salesLead: any) {
    return this.dataService.post('/api/saleslead/save', salesLead);
  }

  deleteSalesLead(id: any) {
    return this.dataService.post('/api/saleslead/' + id + '/delete');
  }

  saveOrganisationContact(organisation: any) {
    return this.dataService.post('/api/organizationcontact/save', organisation);
  }

  addNewOrganisationAndIndividualContact(organisationAndIndividualContact: any) {
    return this.dataService.post('/api/organisationAndIndividualContact/addNew', organisationAndIndividualContact);
  }

  deleteOrganisationContact(id: any) {
    return this.dataService.post('/api/organisationContact/' + id + '/delete');
  }

  saveIndividual(contact: any) {
    return this.dataService.post('/api/organisationIndividualContact/save', contact);
  }

  saveMultipleIndividual(contacts: any) {
    return this.dataService.post('/api/organisationMultipleIndividualContact/save', contacts);
  }

  deleteIndividual(id: any) {
    return this.dataService.post('/api/organisationIndividualContact/' + id + '/delete');
  }

  deleteProject(id: any) {
    return this.dataService.post('/api/project/' + id + '/delete');
  }

  saveProject(project: any) {
    return this.dataService.post('/api/project/save', project);
  }

  // exportOrganisations() {
  //   return this.dataService.getReport('/api/export/organisations');
  // };

  // exportOrganisationIndividualContacts() {
  //   return this.dataService.getReport('/api/export/organisationcontacts');
  // };

  saveProjectStartingDetails(details: any) {
    return this.dataService.post('/api/startingdetails/projects/save', details);
  }
}
