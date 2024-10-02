import { showMessage } from 'react-native-flash-message'

export const showSuccessMessage = (title: string, message: string) => {
  showMessage({
    message: title,
    description: message,
    type: 'success',
    icon: 'success',
  })
}

export const showErrorMessage = (title: string, message: string) => {
  showMessage({
    message: title,
    description: message,
    type: 'danger',
    icon: 'auto',
  })
}
