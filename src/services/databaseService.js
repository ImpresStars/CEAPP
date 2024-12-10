import { apiService } from './api'

export class DatabaseService {
  // Customer-related methods
  static async getCustomerProfile(memberIDEmail) {
    try {
      const profile = await apiService.getCustomerProfile(memberIDEmail)
      return {
        success: true,
        data: profile
      }
    } catch (error) {
      console.error('Error fetching customer profile:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async updateCustomerProfile(memberIDEmail, data) {
    try {
      const updates = await Promise.all([
        // Update basic info
        apiService.updateRecord('memberCustomerID', memberIDEmail, data.basicInfo),
        // Update addresses if provided
        ...(data.addresses ? data.addresses.map(addr => 
          apiService.updateRecord('memberCustomerAddresses', addr.id, addr)
        ) : []),
        // Update vehicles if provided
        ...(data.vehicles ? data.vehicles.map(vehicle => 
          apiService.updateRecord('memberCustomerVehicles', vehicle.id, vehicle)
        ) : [])
      ])

      return {
        success: true,
        data: updates
      }
    } catch (error) {
      console.error('Error updating customer profile:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Employee-related methods
  static async getEmployeeProfile(employeeID) {
    try {
      const profile = await apiService.getEmployeeProfile(employeeID)
      return {
        success: true,
        data: profile
      }
    } catch (error) {
      console.error('Error fetching employee profile:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async updateEmployeeProfile(employeeID, data) {
    try {
      const updates = await Promise.all([
        // Update basic info
        apiService.updateRecord('memberEmployeeDetails', employeeID, data.basicInfo),
        // Update compliance records if provided
        ...(data.compliance ? data.compliance.map(record => 
          apiService.updateRecord('memberEmployeeComplianceRecord', record.id, record)
        ) : []),
        // Update training records if provided
        ...(data.training ? data.training.map(record => 
          apiService.updateRecord('memberEmployeeTrainingRecords', record.id, record)
        ) : [])
      ])

      return {
        success: true,
        data: updates
      }
    } catch (error) {
      console.error('Error updating employee profile:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Generic table operations
  static async getTableData(tableName) {
    try {
      const data = await apiService.getTableData(tableName)
      return {
        success: true,
        data
      }
    } catch (error) {
      console.error(`Error fetching ${tableName} data:`, error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createRecord(tableName, data) {
    try {
      const record = await apiService.createRecord(tableName, data)
      return {
        success: true,
        data: record
      }
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async updateRecord(tableName, id, data) {
    try {
      const record = await apiService.updateRecord(tableName, id, data)
      return {
        success: true,
        data: record
      }
    } catch (error) {
      console.error(`Error updating record in ${tableName}:`, error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async deleteRecord(tableName, id) {
    try {
      await apiService.deleteRecord(tableName, id)
      return {
        success: true
      }
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export default DatabaseService