const FOOD_COURT_FORM_FIELDS = [
  {
    id: 'name',
    title: 'Name',
    element: 'input',
    placeholder: 'Enter your name',
    disabled: false,

  },
  {
    id: 'email',
    title: 'Email',
    element: 'input',
    placeholder: 'Enter your email',
    disabled: false,
  },
  {
    id: 'phone',
    title: 'Phone No.',
    element: 'input',
    placeholder: 'Enter your phone no.',
    disabled: false,
  },
  {
    id: 'adhaar-pan',
    title: 'Adhaar/Pan Image',
    element: 'upload',
    placeholder: 'Upoad your Adhaar or Pan image',
    disabled: false,
  },
  {
    id: 'guest-no',
    title: 'No. of guest',
    element: 'select',
    placeholder: 'Select number of guests',
    options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    warning: {
      triggerValue: '20+',
      message: 'For more than 20 guests, please contact the food court directly for special arrangements.'
    },
    disabled: false,
  },
  {
    id: 'preference',
    title: 'Preference',
    element: 'select',
    placeholder: 'Select your food preference',
    options: ['Veg', 'Non-Veg'],
    disabled: false,
  },
  {
    id: 'time-slot',
    title: 'Time Slot',
    element: 'select',
    placeholder: 'Select the time slot',
    disabled: false,
  }
];

const EVENT_FORM_FIELDS = [
  {
    id: 'table-id',
    title: 'Table Id',
    element: 'input',
    disabled: true,
  },
  {
    id: 'name',
    title: 'Name',
    element: 'input',
    placeholder: 'Enter your name',
    disabled: false,

  },
  {
    id: 'email',
    title: 'Email',
    element: 'input',
    placeholder: 'Enter your email',
    disabled: false,
  },
  {
    id: 'phone',
    title: 'Phone No.',
    element: 'input',
    placeholder: 'Enter your phone no.',
    disabled: false,
  },
  {
    id: 'adhaar-pan',
    title: 'Adhaar/Pan Image',
    element: 'upload',
    placeholder: 'Upoad your Adhaar or Pan image',
    disabled: false,
  },
  {
    id: 'guest-no',
    title: 'No. of guest',
    element: 'select',
    placeholder: 'Select number of guests',
    options: [1,2,3,4,5],
    disabled: false,
  }
]


export {
    FOOD_COURT_FORM_FIELDS,
    EVENT_FORM_FIELDS
}