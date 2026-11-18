import request from '@/utils/request.js'

export function add(data) {
  return request({
    url: 'api/junchenJdOrder',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/junchenJdOrder/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/junchenJdOrder',
    method: 'put',
    data
  })
}

export default { add, edit, del }
