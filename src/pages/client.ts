import axios from 'axios'

export interface ClientOptions {
  token: string,
  url?: string,
}

export interface RunScriptRequest {
  file_path: string,
  input?: string,
}

export interface RunScriptResponse {
  output: string,
  error: string,
}

const DEFAULT_PRODUCTION_URL = 'https://app.tryhelix.ai'
const DEFAULT_DEVELOPMENT_URL = 'http://localhost:8005'

const ClientFactory = (options: ClientOptions) => {
  const isDevelopment = window.location.hostname === 'localhost'
  let url = options.url
  if(!url) {
    if (isDevelopment) {
      url = DEFAULT_DEVELOPMENT_URL
    } else {
      url = DEFAULT_PRODUCTION_URL
    }
  }
  if(!isDevelopment && !options.token) {
    throw new Error('Token is required')
  }
  
  const runScript = async (req: RunScriptRequest): Promise<RunScriptResponse> => {
    const headers: Record<string, string> = {}
    if(options.token) {
      headers.Authorization = `Bearer ${options.token}`
    }
    const usePath = isDevelopment ? '/api/v1/run/development' : '/api/v1/apps/script'
    const response = await axios({
      method: 'POST',
      url: `${url}${usePath}`,
      headers,
      data: req,
    })

    const result = response.data as RunScriptResponse
    return result
  }

  return {
    runScript,
  }
}

export default ClientFactory