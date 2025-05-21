import { z } from 'zod'

// 定义表单验证规则
export const loginFormSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '请输入6位数以上的密码'),
})

// 推断类型（可选）
export type LoginFormData = z.infer<typeof loginFormSchema>
