import axios from 'axios'

import { showErrorMessage } from './handleAlerts'

interface ErrorResponse {
  errors: { msg: string }[]
}

/**
 * Helper to handle validation errors from an Axios request using React Native Flash Message
 * @param error The error returned by Axios
 */
export const handleApiErrors = (error: any): void => {
  if (axios.isAxiosError(error) && error.response) {
    const { errors } = error.response.data as ErrorResponse
    let errorMessage = 'Please correct the following errors:\n'

    errors.forEach((err) => {
      errorMessage += `- ${err.msg}\n`
    })

    showErrorMessage('Validation Error', errorMessage)
  } else {
    showErrorMessage('Unexpected Error', 'Something went wrong. Please try again.')
  }
}
