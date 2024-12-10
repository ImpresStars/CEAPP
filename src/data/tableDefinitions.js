// Table definitions for the application
export const tableDefinitions = {
  clients: {
    displayName: 'Clients',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'firstName', label: 'First Name', type: 'text' },
      { key: 'lastName', label: 'Last Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'accountType', label: 'Account Type', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  addresses: {
    displayName: 'Client Addresses',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'clientId', label: 'Client ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'street', label: 'Street', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'state', label: 'State', type: 'text' },
      { key: 'zipCode', label: 'ZIP Code', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  vehicles: {
    displayName: 'Client Vehicles',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'clientId', label: 'Client ID', type: 'text' },
      { key: 'make', label: 'Make', type: 'text' },
      { key: 'model', label: 'Model', type: 'text' },
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'color', label: 'Color', type: 'text' },
      { key: 'type', label: 'Type', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  workers: {
    displayName: 'Workers',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'firstName', label: 'First Name', type: 'text' },
      { key: 'lastName', label: 'Last Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'level', label: 'Level', type: 'text' },
      { key: 'certifications', label: 'Certifications', type: 'array' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  bookings: {
    displayName: 'Bookings',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'clientId', label: 'Client ID', type: 'text' },
      { key: 'workerId', label: 'Worker ID', type: 'text' },
      { key: 'serviceType', label: 'Service Type', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'total', label: 'Total', type: 'currency' },
      { key: 'notes', label: 'Notes', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  services: {
    displayName: 'Services',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'basePrice', label: 'Base Price', type: 'currency' },
      { key: 'duration', label: 'Duration (hours)', type: 'number' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'isActive', label: 'Active', type: 'boolean' },
      { key: 'requiredCertifications', label: 'Required Certifications', type: 'array' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  serviceHistory: {
    displayName: 'Service History',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'bookingId', label: 'Booking ID', type: 'text' },
      { key: 'workerId', label: 'Worker ID', type: 'text' },
      { key: 'clientId', label: 'Client ID', type: 'text' },
      { key: 'serviceType', label: 'Service Type', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'completedAt', label: 'Completed At', type: 'date' },
      { key: 'rating', label: 'Rating', type: 'number' },
      { key: 'feedback', label: 'Feedback', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  },

  workerSchedule: {
    displayName: 'Worker Schedule',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'workerId', label: 'Worker ID', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'startTime', label: 'Start Time', type: 'text' },
      { key: 'endTime', label: 'End Time', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' }
    ]
  }
}