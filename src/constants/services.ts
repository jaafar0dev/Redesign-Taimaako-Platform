// Unified service taxonomy for both clients and workers

export const SERVICE_CATEGORIES = [
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '🏠',
    clientName: 'Cleaning',
    workerName: 'Cleaning Services',
    description: 'General house cleaning and tidying',
    skills: [
      'General Cleaning',
      'Deep Cleaning',
      'Indoor Cleaning',
      'Outdoor Cleaning',
      'Office Cleaning',
      'Appliance Cleaning'
    ]
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: '🧺',
    clientName: 'Laundry',
    workerName: 'Laundry & Ironing',
    description: 'Washing, ironing, and folding clothes',
    skills: [
      'Washing',
      'Ironing',
      'Folding',
      'Dry Cleaning Prep',
      'Delicate Fabrics'
    ]
  },
  {
    id: 'cooking',
    name: 'Cooking',
    icon: '🍳',
    clientName: 'Cooking',
    workerName: 'Cooking & Meal Prep',
    description: 'Meal preparation and kitchen services',
    skills: [
      'Nigerian Cuisine',
      'Continental Dishes',
      'Meal Prep',
      'Baking',
      'Special Diets'
    ]
  },
  {
    id: 'nanny',
    name: 'Childcare',
    icon: '👶',
    clientName: 'Nanny / Care',
    workerName: 'Childcare (Mom\'s Helper)',
    description: 'Childcare and assistance',
    skills: [
      'Infant Care',
      'Toddler Care',
      'School Age Care',
      'First Aid Certified',
      'Educational Activities'
    ]
  },
  {
    id: 'eldercare',
    name: 'Elder Care',
    icon: '👴',
    clientName: 'Elder Care',
    workerName: 'Elder Care Assistant',
    description: 'Elderly care and assistance',
    skills: [
      'Companionship',
      'Medication Reminders',
      'Mobility Assistance',
      'Meal Preparation',
      'Light Medical Support'
    ]
  }
] as const;

export type ServiceId = typeof SERVICE_CATEGORIES[number]['id'];