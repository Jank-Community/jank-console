import { zodResolver } from '@hookform/resolvers/zod'

import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import BoxReveal from '@/components/magicui/box-reveal'
import DotPattern from '@/components/magicui/dot-pattern'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { logoImg, parseQuery } from '@/utils'

import api from './axiosInstance'
import { LoginFormData, loginFormSchema } from './utils/formValidation'

function Login() {
  //使用zod做表单验证
  const formValidation = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [verifyCodeImg, setVerifyCodeImg] = useState('')
  const authStore = useAuthStore()

  // 使用 useState 管理密码输入框的类型
  const [showPassword, setShowPassword] = useState(false)

  // 切换密码显示状态
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
  const navigate = useNavigate() // Hook for navigation
  const handleLogin = async () => {
    const loginsuccess = await authStore.login(username, password, verifyCode)
    if (loginsuccess) {
      toast.success('登录成功！') // 添加成功提示
      navigate('/')
    } else {
      // 登录失败时重新获取验证码，确保用户能看到新的验证码
      sendImgVerificationCode()
    }
  }
  const handleSubmit = async () => {
    handleLogin()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleLogin()
    }
  }

  const sendImgVerificationCode = async () => {
    // 只有当用户名有值时才发送请求
    if (username.trim().length === 0) {
      setVerifyCodeImg('') // 清空验证码图片
      return
    }
    try {
      const res = await api.get(
        '/verification/sendImgVerificationCode?' +
          parseQuery({ email: username })
      )
      setVerifyCodeImg(res.data.data.imgBase64)
    } catch (error) {
      toast.error('获取验证码失败，请检查邮箱地址或网络。')
      setVerifyCodeImg('') // 清空验证码图片
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 ml-8">
        <div className="flex justify-center items-center h-[calc(100vh_-_theme(spacing.8))]">
          <DotPattern
            width={18}
            height={18}
            cx={2}
            cy={2}
            cr={1}
            className={cn(
              '[mask-image:radial-gradient(900px_circle_at_left,white,transparent)]'
            )}
          />
          <div>
            <BoxReveal boxColor={'#0EA5E9'} duration={0.5}>
              <p className="text-[3.5rem] font-semibold">
                <span className="text-[#5046e6]">
                  一款清爽、美观、附带AI的WEB开发模板
                </span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={'#0EA5E9'} duration={0.5}>
              <h2 className="mt-[.5rem] text-xl font-semibold">
                为{' '}
                <span className="text-[#0EA5E9]">
                  全栈开发工程师、前端及后端工程师
                </span>{' '}
                准备，开箱即用！
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={'#0EA5E9'} duration={0.5}>
              <div className="mt-[1.5rem]">
                <p>
                  -&gt; 前端基于
                  <span className="font-semibold text-[#0EA5E9]"> React</span>，
                  <span className="font-semibold text-[#0EA5E9]"> Vite</span>，
                  <span className="font-semibold text-[#0EA5E9]">
                    {' '}
                    Typescript
                  </span>
                  ，
                  <span className="font-semibold text-[#0EA5E9]">
                    {' '}
                    Tailwind CSS
                  </span>
                  ，<span className="font-semibold text-[#0EA5E9]"> Axios</span>
                  ，
                  <span className="font-semibold text-[#0EA5E9]">
                    {' '}
                    Shacdn/ui
                  </span>
                  和
                  <span className="font-semibold text-[#0EA5E9]"> Zustand</span>
                  等构建。
                  <br />
                  -&gt; 后端基于
                  <span className="font-semibold text-[#0EA5E9]">Java 21</span>
                  ，
                  <span className="font-semibold text-[#0EA5E9]">
                    Spring Boot
                  </span>
                  ，<span className="font-semibold text-[#0EA5E9]">MySQL</span>
                  ，
                  <span className="font-semibold text-[#0EA5E9]">
                    SpringData JPA
                  </span>
                  开发的后台程序。
                  <br />
                  -&gt; 可以作为
                  <span className="font-semibold text-[#0EA5E9]">业务系统</span>
                  和
                  <span className="font-semibold text-[#0EA5E9]">
                    后台管理系统
                  </span>
                  的前后端开发框架。
                  <br />
                  -&gt; 集成
                  <span className="font-semibold text-[#0EA5E9]">AI</span>。
                </p>
              </div>
            </BoxReveal>
          </div>
        </div>
        <div className="flex justify-center items-center h-[calc(100vh_-_theme(spacing.8))]">
          <Card className="mx-auto max-w-sm z-10 shadow-2xl">
            <CardHeader className="text-center w-96 items-center mt-6">
              <img
                src={logoImg}
                alt={'logo'}
                className="w-16 mb-2 shadow-2xl"
              />
              <CardTitle
                className={
                  'text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'
                }
              >
                X.Ryder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">账号</Label>
                  <Input
                    {...formValidation.register('email')} //注册验证类型为Email
                    type="text"
                    placeholder="输入账号..."
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    // onBlur={sendImgVerificationCode}
                  />
                  {formValidation.formState.errors.email && (
                    <span className="text-red-400 text-sm">
                      {formValidation.formState.errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    {...formValidation.register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="输入密码..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={sendImgVerificationCode}
                  />
                  {formValidation.formState.errors.password && (
                    <span className="text-red-400 text-sm">
                      {formValidation.formState.errors.password.message}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-10 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" /> // 隐藏状态时显示 EyeSlashIcon
                    ) : (
                      <EyeOff className="h-5 w-5" /> // 可见状态时显示 EyeIcon
                    )}
                  </button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="verifyCode">验证码</Label>
                  <div className="flex gap-4 justify-center items-center">
                    <Input
                      type="text"
                      placeholder="输入图形验证码..."
                      value={verifyCode}
                      required
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setVerifyCode(e.target.value)}
                    />
                    <div className="w-52 bg-transparent">
                      {verifyCodeImg === '' ? (
                        <span className="text-white">自动获取验证码</span>
                      ) : (
                        <img
                          src={verifyCodeImg}
                          alt="验证码"
                          onClick={sendImgVerificationCode}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={formValidation.handleSubmit(handleSubmit)}
                  disabled={authStore.isLoading}
                >
                  {authStore.isLoading ? '正在登录...' : '登录'}
                </Button>

                {/* TODO: 第三方登录暂未实现 */}
                {/* <Button variant="outline" className="w-full"> */}
                {/* 使用第三方账号登录 */}
                {/* </Button> */}
              </div>
            </CardContent>
          </Card>
          <DotPattern
            width={16}
            height={16}
            cx={12}
            cy={12}
            cr={1}
            className={cn(
              '[mask-image:radial-gradient(900px_circle_at_right,white,transparent)]'
            )}
          />
        </div>
      </div>
      <footer className={'text-center text-muted-foreground text-xs'}>
        <p>&copy; {currentYear} X.Ryder. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Login
