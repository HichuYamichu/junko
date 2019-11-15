const httpLinkOptions = {
  credentials: 'include'
}

const httpEndpoint = process.env.GQL_ENDPOINT

export default function () {
  return {
    httpEndpoint,
    httpLinkOptions
  }
}
