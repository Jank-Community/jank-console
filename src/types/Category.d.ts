// Category item type
export type CategoryItem = {
  id: number
  name: string
  description: string
  parent_id: number
  path: string
  children: CategoryItem[] | null | number
}

export const baseURL = 'http://8.130.108.74:9010/api/v1'

// =====================
// getOneCategory (GET)
export const CATEGORY_GET_ONE_PATH = (id: number) => `/category/getOneCategory?id=${id}`
export type GetOneCategoryRequest = { id: number }
export type GetOneCategorySuccess = SuccessResponse<CategoryItem>
export type GetOneCategoryError = ErrorResponse<any>

// =====================
// getCategoryTree (GET)
export const CATEGORY_GET_TREE_PATH = '/category/getCategoryTree'
export type GetCategoryTreeRequest = void // No params
export type GetCategoryTreeSuccess = SuccessResponse<CategoryItem[]>
export type GetCategoryTreeError = ErrorResponse<any>

// =====================
// createOneCategory (POST)
export const CATEGORY_CREATE_ONE_PATH = '/category/createOneCategory'
export type CreateOneCategoryRequest = {
  name: string
  description: string
  parent_id: number
}
export type CreateOneCategorySuccess = SuccessResponse<CategoryItem>
export type CreateOneCategoryError = ErrorResponse<any>

// =====================
// updateOneCategory (POST)
export const CATEGORY_UPDATE_ONE_PATH = '/category/updateOneCategory'
export type UpdateOneCategoryRequest = {
  id: number
  name: string
  description: string
  parent_id?: number // optional, if not provided, parent is not changed
}
export type UpdateOneCategorySuccess = SuccessResponse<CategoryItem>
export type UpdateOneCategoryError = ErrorResponse<any>

// =====================
// deleteOneCategory (POST)
export const CATEGORY_DELETE_ONE_PATH = '/category/deleteOneCategory'
export type DeleteOneCategoryRequest = { id: number }
export type DeleteOneCategorySuccess = SuccessResponse<CategoryItem[]>
export type DeleteOneCategoryError = ErrorResponse<any>

// =====================
// getCategoryChildrenTree (GET)
export const CATEGORY_GET_CHILDREN_TREE_PATH = (id: number) => `/category/getCategoryChildrenTree?id=${id}`
export type GetCategoryChildrenTreeRequest = { id: number }
export type GetCategoryChildrenTreeSuccess = SuccessResponse<CategoryItem[]>
export type GetCategoryChildrenTreeError = ErrorResponse<any> 