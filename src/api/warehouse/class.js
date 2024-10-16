import request from '@/utils/request'

// 查询资源分类列表
export function listClass(query) {
  return request({
    url: '/warehouse/class/list',
    method: 'get',
    params: query
  })
}

// 查询资源分类详细
export function getClass(classId) {
  return request({
    url: '/warehouse/class/' + classId,
    method: 'get'
  })
}

// 新增资源分类
export function addClass(data) {
  return request({
    url: '/warehouse/class',
    method: 'post',
    data: data
  })
}

// 修改资源分类
export function updateClass(data) {
  return request({
    url: '/warehouse/class',
    method: 'put',
    data: data
  })
}

// 删除资源分类
export function delClass(classId) {
  return request({
    url: '/warehouse/class/' + classId,
    method: 'delete'
  })
}

// 查询部门下拉树结构
export function classTreeSelect() {
  return request({
    url: '/warehouse/class/classTree',
    method: 'get'
  })
}
