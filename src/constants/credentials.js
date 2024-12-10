export const TEST_CREDENTIALS = {
  client: {
    email: 'client@test.com',
    password: 'client123',
    mockUser: {
      id: 'C001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'client@test.com',
      phone: '555-0123',
      accountType: 'Basic',
      accountHistory: [],
      addresses: [],
      vehicles: [],
      bookings: []
    }
  },
  worker: {
    id: 'W001',
    password: 'worker123',
    mockUser: {
      id: 'W001',
      name: 'Mike Johnson',
      level: 'Expert',
      certifications: ['General Cleaning', 'Residential', 'Commercial'],
      trainings: [
        {
          id: 'T001',
          name: 'General Cleaning',
          completed: '2023-01-15',
          expires: '2024-01-15'
        }
      ],
      serviceHistory: [
        {
          id: 'S001',
          type: 'House Cleaning',
          client: 'John Smith',
          date: '2023-12-10',
          status: 'Completed',
          details: ['Regular cleaning', 'Extra bathroom service'],
          feedback: 'Excellent service!'
        }
      ]
    }
  },
  management: {
    username: 'admin@cleaningedge.com',
    password: 'admin123',
    mockUser: {
      id: 'M001',
      username: 'admin@cleaningedge.com',
      role: 'manager',
      permissions: ['all'],
      name: 'Admin User'
    }
  }
}

// Initialize mock data in localStorage
export const initializeMockData = () => {
  const users = [TEST_CREDENTIALS.client.mockUser]
  const workers = [TEST_CREDENTIALS.worker.mockUser]
  const management = [TEST_CREDENTIALS.management.mockUser]

  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('workers', JSON.stringify(workers))
  localStorage.setItem('management', JSON.stringify(management))
}