export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleString()
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

export const formatDateShort = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

export const isDateInPast = (dateString) => {
  try {
    const date = new Date(dateString)
    return date < new Date()
  } catch (error) {
    console.error('Error checking date:', error)
    return false
  }
}

export const getDateDifferenceInDays = (date1, date2) => {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  } catch (error) {
    console.error('Error calculating date difference:', error)
    return 0
  }
}