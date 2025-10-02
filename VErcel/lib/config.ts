// Frontend Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://172.20.10.6:3001/api'),
    timeout: 30000, // 30 seconds
  },
  
  // App Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Election System',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  
  // Feature Flags
  features: {
    blockchain: process.env.NEXT_PUBLIC_ENABLE_BLOCKCHAIN === 'true',
    observer: process.env.NEXT_PUBLIC_ENABLE_OBSERVER_FEATURES === 'true',
  },
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  
  // Date formats
  dateFormats: {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    datetime: 'MMM dd, yyyy HH:mm',
  },
  
  // Election types
  electionTypes: [
    { value: 'PRESIDENTIAL', label: 'Presidential' },
    { value: 'GUBERNATORIAL', label: 'Gubernatorial' },
    { value: 'HOUSE_OF_ASSEMBLY', label: 'House of Assembly' },
    { value: 'SENATORIAL', label: 'Senatorial' },
    { value: 'HOUSE_OF_REPS', label: 'House of Representatives' },
    { value: 'LOCAL_GOVERNMENT', label: 'Local Government' },
  ],
  
  // Election statuses
  electionStatuses: [
    { value: 'UPCOMING', label: 'Upcoming', color: 'blue' },
    { value: 'ONGOING', label: 'Ongoing', color: 'green' },
    { value: 'COMPLETED', label: 'Completed', color: 'gray' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
  ],
  
  // Report types
  reportTypes: [
    { value: 'INCIDENT', label: 'Incident', color: 'red' },
    { value: 'OBSERVATION', label: 'Observation', color: 'blue' },
    { value: 'VIOLATION', label: 'Violation', color: 'orange' },
    { value: 'ISSUE', label: 'Issue', color: 'yellow' },
    { value: 'OTHER', label: 'Other', color: 'gray' },
  ],
  
  // Severity levels
  severityLevels: [
    { value: 'LOW', label: 'Low', color: 'green' },
    { value: 'MEDIUM', label: 'Medium', color: 'yellow' },
    { value: 'HIGH', label: 'High', color: 'orange' },
    { value: 'CRITICAL', label: 'Critical', color: 'red' },
  ],
};
