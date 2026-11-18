import request from '@/utils/request.js'

export function add(data) {
  return request({
    url: 'api/junchenPddOrder',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/junchenPddOrder/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/junchenPddOrder',
    method: 'put',
    data
  })
}

export default { add, edit, del }
