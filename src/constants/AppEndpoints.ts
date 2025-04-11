type RequestType = 'delete' | 'post' | 'update' | 'get'
type EndpointBody = {
    endpoint: string;
    method: RequestType
}

export const Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmZmNzI0YjdkMzVhYTJkNjk2MjQ4MTNjYjEzN2Q4YiIsIm5iZiI6MTY1MjcwODIxMy41MjEsInN1YiI6IjYyODI1Mzc1ZmIzZjYxMTI3MmFiYmEzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KJujTWKLPIpZMX_HivHJ3dPNT85NLUYUjYHLCcONuxg"

export const AppEndpoints = {
    popular: {
        url: '/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        method: 'GET',
    },
}