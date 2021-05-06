export const ProceduresConfig = {
  list: [
    {
      id: 'RH-PSA0001',
      svg: 'contractor-onboarding-process.contractor-on-boarding',
      processName: 'contractor-onboarding-process.contractor-on-boarding',
      container: null,
      title: 'Contractor Onboarding',
      action: 'Onboard Contractor',
      desc: 'External Consultant Account Creation',
      details: 'Contractor Onboarding procdure with integrations to Salesforce and Service Now',
      prerequisites: [
        'VAA signed by the individual who will be completing the work',
        'Alternative Email address (to send details on how to access the Red Hat Account)',
        'Country of Supplier Source',
      ],
      steps: [
        '1. Requesting Oracle and Gmail accounts',
        '2. Create a PSA account.',
        '3. Send password to external consultant',
        'P4. Requesting Oracle EBS Access',
      ],
      section: 'PSA',
      roles: ['manager', 'superviser', 'applicant', 'operator', 'employee'],
    },
    {
      id: 'RH-PSA0002',
      svg: 'itorders.new-employee',
      processName: 'contractor-onboarding-process.contractor-on-boarding',
      container: 'itorders.new-employee',
      title: 'New Hire Onboarding',
      action: 'Onboard New Hire',
      desc: 'New Hire Account Creation',
      Prerequisites: ['Curabitur risus orci', 'Donec porta metus vel volutpat sagittis.'],
      details:
        'Phasellus at fermentum eros, et condimentum arcu. Ut et accumsan nibh. Nunc venenatis sagittis eros nec tincidunt. Donec eget erat et ex dignissim varius. Integer vehicula justo in aliquam hendrerit. Vestibulum lectus dolor, placerat sed tristique eu, ultricies sit amet tellus. Fusce et luctus magna. Curabitur risus orci, sodales nec felis quis, pharetra euismod justo. Aliquam erat volutpat. In non augue quis est porta dictum placerat sit amet ante. Sed fermentum elementum lectus vitae efficitur. ',
      steps: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        'Suspendisse vitae arcu iaculis, accumsan sem et, accumsan justo.',
        'Donec porta metus vel volutpat sagittis.',
        'Phasellus et risus id libero sodales consectetur nec id sapien.',
        'Curabitur vitae metus mattis ligula laoreet convallis eu sed lacus.',
        'Fusce non magna vel arcu fringilla molestie.',
      ],
      section: 'PSA',
      roles: ['manager', 'superviser', 'applicant', 'operator', 'employee'],
    },
  ],
};
