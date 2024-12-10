import { calculateWorkerEarnings, getWorkerLevel } from '../../utils/workerUtils'
import { apiService } from '../api'

export class WorkerService {
  static async assignWorker(bookingId, workerId) {
    const result = await apiService.updateBooking(null, bookingId, {
      workerId,
      assignedAt: new Date().toISOString(),
      status: 'Assigned'
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to assign worker')
    }

    return result.data
  }

  static async completeJob(bookingId, workerId, completionDetails) {
    const result = await apiService.updateBooking(null, bookingId, {
      status: 'Completed',
      completedAt: new Date().toISOString(),
      completionDetails,
      workerEarnings: calculateWorkerEarnings([{ ...completionDetails }])
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to complete job')
    }

    return result.data
  }

  static calculateWorkerMetrics(workerData) {
    return {
      level: getWorkerLevel(workerData.completedJobs, workerData.rating),
      totalEarnings: calculateWorkerEarnings(workerData.bookings),
      completedJobs: workerData.bookings?.filter(b => b.status === 'Completed').length || 0,
      averageRating: workerData.rating || 0
    }
  }
}