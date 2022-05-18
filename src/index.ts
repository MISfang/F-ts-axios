import { IAxiosRequestConfig } from './types'
import xhr from './xhr'

export default function(config: IAxiosRequestConfig) {
  xhr(config)
}
