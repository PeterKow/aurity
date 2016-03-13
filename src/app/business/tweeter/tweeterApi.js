import fetchService from 'utils/fetch'

export {
  check,
}

function check() {
  console.log('start fetch check')

  return fetchService('/check', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      const data = res.message.statuses
      console.log('success check ', data)
    })
    .catch(res => {
      console.log('error check ', res)
    })
}