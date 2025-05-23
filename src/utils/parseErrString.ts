/**
 * 解析服务的错误返回的键值对字符串，返回对象（适用于 "key1=value1, key2=value2" 格式）
 * @param str 输入字符串，如 "code=401, message=Unauthorized"
 * @returns Record<string, string | number> （自动转换数字字符串为 number）
 */
export const parseErrorString = <
  T extends Record<string, string | number> = Record<string, string | number>,
>(
  str: string,
  expectedKeys?: (keyof T)[]
): T => {
  let result: Record<string, string | number>

  if (!str.includes('code=')) {
    result = { code: 400, message: str.split(':')[0] }
  } else {
    result = {}
    const pattern = /(\w+)=("[^"]*"|[^,]+)/g
    let match: RegExpExecArray | null
    while ((match = pattern.exec(str)) !== null) {
      const key = match[1].trim()
      let value = match[2].trim()
      if (value.startsWith('"') && value.endsWith('"'))
        value = value.slice(1, -1)
      result[key] = /^\d+$/.test(value) ? parseInt(value, 10) : value
    }
  }

  // 检查是否包含所有 expectedKeys（如果传入）
  if (expectedKeys && !expectedKeys.every((key) => key in result)) {
    throw new Error(`Missing required fields: ${expectedKeys.join(', ')}`)
  }

  return result as T
}
