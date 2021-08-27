import axios from 'axios'
import {settings} from './shared'

const client = axios.create({
  baseURL: settings.apiURL
})

export default client
