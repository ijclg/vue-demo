import request from '@/utils/request'

// 查询资源列表列表
export function listResource(query) {
  return request({
    url: '/warehouse/resource/list',
    method: 'get',
    params: query
  })
}

// 查询资源列表详细
export function getResource(id) {
  return request({
    url: '/warehouse/resource/' + id,
    method: 'get'
  })
}

// 新增资源列表
export function addResource(data) {
  return request({
    url: '/warehouse/resource',
    method: 'post',
    data: data
  })
}

// 修改资源列表
export function updateResource(data) {
  return request({
    url: '/warehouse/resource',
    method: 'put',
    data: data
  })
}

// 删除资源列表
export function delResource(id) {
  return request({
    url: '/warehouse/resource/' + id,
    method: 'delete'
  })
}
