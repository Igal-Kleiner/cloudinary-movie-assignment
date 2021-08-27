// The API key should really go to a .env file,
// but since such file should NOT be uploaded to Git I will place it here
export const settings = Object.freeze({
  apiURL: 'http://www.omdbapi.com',
  apiKey: '157f34ed',
  responseTypes: {
    true: 'True',
    false: 'False'
  },
  maxPages: 100,
  messageTypes: {
    info: 'info',
    success: 'success',
    error: 'error'
  }
})

export const icons = Object.freeze({
  search: 'search',
  calendar: 'calendar'
})
