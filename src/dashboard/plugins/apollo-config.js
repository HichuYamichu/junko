const httpLinkOptions = {
  credentials: 'include'
}

const httpEndpoint = process.env.API_ADDR || 'http://localhost:8080/api/query'

export default function () {
  return {
    httpEndpoint,
    httpLinkOptions
  }
}
