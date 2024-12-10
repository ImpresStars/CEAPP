import { authService } from './authService'
import { bookingService } from './bookingService'
import { userService } from './userService'
import { vehicleService } from './vehicleService'
import { workerService } from './workerService'
import { managementService } from './managementService'
import { scheduleService } from './scheduleService'
import { paymentService } from './paymentService'
import { notificationService } from './notificationService'
import { reviewService } from './reviewService'

export const apiService = {
  ...authService,
  ...bookingService,
  ...userService,
  ...vehicleService,
  ...workerService,
  ...managementService,
  ...scheduleService,
  ...paymentService,
  ...notificationService,
  ...reviewService,
};

console.log('apiService methods:', Object.keys(apiService));