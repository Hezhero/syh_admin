import request from '@/utils/request.js'

export function add(data) {
  return request({
    url: 'api/junchenTbOrder',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/junchenTbOrder/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/junchenTbOrder',
    method: 'put',
    data
  })
}

export default { add, edit, del }
