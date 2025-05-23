/**
 * 解析服务的错误返回的键值对字符串，返回对象（适用于 "key1=value1, key2=value2" 格式）
 * @param str 输入字符串，如 "code=401, message=Unauthorized"
 * @returns Record<string, string | number> （自动转换数字字符串为 number）
 */

//TODO: 修改返回格式，因为token过期时的状态码是后端msg中返回的

export const parseErrorString = (str: string): string => {
  if (!str.includes('code=')) {
    const result = str.split(':')[0]
    return result
  } else {
    const result: Record<string, string | number> = {}
    const pattern = /(\w+)=("[^"]*"|[^,]+)/g // 支持引号包裹的值

    let match: RegExpExecArray | null
    while ((match = pattern.exec(str)) !== null) {
      const key = match[1].trim()
      let value = match[2].trim()

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }

      // 数字转换逻辑
      result[key] = /^\d+$/.test(value) ? parseInt(value, 10) : value
    }

    if (Object.keys(result).length === 0) {
      throw new Error('No valid key-value pairs found')
    }

    return result.message as string
  }
}
