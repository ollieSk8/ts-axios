import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1',
})
  .then((res) => {
    console.log(`res1 ----`)
    console.log(res)
    console.log(`res1 ----end`)
  })
  .catch((e: AxiosError) => {
    console.log('err1')
    console.log(e)
    console.log('err end')
  })

axios({
  method: 'get',
  url: '/error/get',
})
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  })
    .then((res) => {
      console.log(res)
    })
    .catch((e: AxiosError) => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000,
})
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
  })
