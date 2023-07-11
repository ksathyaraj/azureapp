export const portalConstants = {
  refreshText: 'Refresh',
  fromDateLabel: 'From',
  toDateLabel: 'To',
  datePlaceholder: 'DD MMM YYYY e.g. 01 Jan 2015',
  downloadText: 'Download',
  addNewText: 'Add New',
  requestReportText: 'Request Report',
  emailText: 'Email',
  detailedReportText: 'Download Detailed Usage Report',
  usageReportText: 'Download Usage Report',
  browseText: 'Browse',
  okText: 'Ok',
  noDataFound: 'No Data Found.',
  yesText :'Yes',
  noText : 'No',
    /**
   * Admin - Companies - Wizard Report
   */
  
  wizardReportCountries: [
      { value: '', key: 'All Countries' },
      { value: '1', key: 'South Africa' },
      { value: '167', key: 'Swaziland' },
      { value: '182', key: 'Uganda' },
      { value: '68', key: 'Ghana' },
      { value: '131', key: 'Nigeria' },
      { value: '90', key: 'Kenya' },
      { value: '192', key: 'Zambia' },
    ],
    /**
   * Admin - Companies - Free Trial Registrations.
   */

    daysFreeRegistrations:[
        { value: '20', id: 20 },
        { value: '21', id: 21 },
        { value: '22', id: 22 },
        { value: '23', id: 23 },
        { value: '24', id: 24 },
        { value: '25', id: 25 },
        { value: '26', id: 26 },
        { value: '27', id: 27 },
        { value: '28', id: 28 },
        { value: '29', id: 29 },
        { value: '30', id: 30 },
        { value: '31', id: 31 },
        { value: '32', id: 32 },
        { value: '33', id: 33 },
        { value: '34', id: 34 },
        { value: '35', id: 35 }
    ],
    /**
   * Admin - Reports - Command Audit types
   */
    days: [
        { value: '5', id: 5 },
        { value: '6', id: 6 },
        { value: '7', id: 7 },
        { value: '8', id: 8 },
        { value: '9', id: 9 },
        { value: '10', id: 10 },
        { value: '15', id: 15 },
        { value: '20', id: 20 },
        { value: '30', id: 30 },
        { value: '40', id: 40 },
        { value: '50', id: 50 },
        { value: '180', id: 180 },
        { value: '365', id: 365 }               
    ],
    /**
     * Reports - usage report
     */
    registrationSource: [
      {id: 1, value: 'SMEasy'},
      {id: 5, value: 'Absa CFM'}
  ],
  /**
   * Admin - Voucher - bulklicenses - vouchers
   */
  voucherOptions:[
    { value:'None', id: ''},
    { value:'Paying', id: 0},
    { value:'Free', id: 1},
    ]
};


Object.freeze(portalConstants);