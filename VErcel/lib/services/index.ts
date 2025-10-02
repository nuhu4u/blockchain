// Export all services
export * from './authService';
export * from './electionService';
export * from './dashboardService';
export * from './blockchainService';

// Export admin service types and functions
export type {
  Observer,
  ObserverAssignment,
  ObservationReport as AdminObservationReport,
  ReportComment as AdminReportComment,
  GetObserversParams,
  GetReportsParams as AdminGetReportsParams,
  AssignObserverRequest,
  UpdateAssignmentStatusRequest,
  UpdateReportStatusRequest,
} from './adminService';

export { adminService as AdminService } from './adminService';

// Export observer service types and functions
export type {
  ObservationReport as ObserverReport,
  ReportComment as ObserverReportComment,
  SubmitReportRequest,
  AddCommentRequest,
  GetReportsParams as ObserverGetReportsParams,
} from './observerService';

export { ObserverService } from './observerService';

// Export API utilities
export * from '../api';
export * from '../errorHandler';
export * from '../config';
