import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@radix-ui/react-dialog'
import { ReloadIcon } from '@radix-ui/react-icons'

import React, { useEffect, useState } from 'react'

import { CircleUser, PlusCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import validator from 'validator'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useDialog } from '@/components/use-dialog'
import { useAccountStore } from '@/store/accountStore'
import { useAuthStore } from '@/store/authStore'
import { useSystemStore } from '@/store/systemStore'
import { encryptPassword } from '@/utils'
import { findDepartmentPathById, formatPath } from '@/utils'

const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, '原密码长度必须至少为 8 位'),

    newPassword: z
      .string()
      .min(8, '新密码长度必须至少为 8 位')
      .max(16, '新密码长度不能超过 16 位')
      .regex(/^[A-Za-z]/, '新密码必须以字母开头')
      .regex(/[0-9]/, '新密码必须包含至少一个数字')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, '新密码必须包含至少一个符号'),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword === data.oldPassword) {
      ctx.addIssue({
        path: ['newPassword'],
        message: '新密码不能与原密码相同',
      })
    }

    if (data.confirmPassword !== data.newPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: '确认密码必须与新密码相同',
      })
    }
  })

const Account = () => {
  const { account } = useAccountStore()
  const { department } = useSystemStore()
  const { logout } = useAuthStore()
  const [changing, setChanging] = useState(false)

  const changePasswordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const changePasswordDialog = useDialog<HTMLButtonElement>(changePasswordForm)

  const handlePasswordChange = (data: z.infer<typeof passwordSchema>) => {
    const params = {
      oldPassword: encryptPassword(data.oldPassword, publicKey),
      newPassword: encryptPassword(data.newPassword, publicKey),
    }
    changePassword(params).then((res) => {
      if (res.code == 200) {
        toast.success('修改成功！', {
          description: '正在跳转到登录页面',
        })
        changePasswordDialog.dismiss()
        setTimeout(() => {
          logout()
        }, 2000)
      }
    })
  }
  return (
    <div>
      <Helmet>
        <title>账户设置</title>
      </Helmet>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">首页</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                账户设置
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <ScrollArea className={'h-[calc(100vh-80px)]'}>
        <div className="container grid gap-2 p-4">
          <Card>
            <CardHeader>
              <CardTitle>账户设置</CardTitle>
              <CardDescription>
                编辑个人信息，包括姓名、密码、邮箱、手机号
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <ul className="grid gap-3 md:hidden">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">用户名</span>
                      <span>{account.nickname}</span>
                    </li>
                    {/* <li className="flex items-center justify-between"> */}
                    {/*   <span className="text-muted-foreground">角色</span> */}
                    {/*   <span> */}
                    {/*     {account.roles && */}
                    {/*       account.roles.map((role) => role.name).join(',')} */}
                    {/*   </span> */}
                    {/* </li> */}
                  </ul>
                  <div className="flex items-center space-x-8 flex-col md:flex-row">
                    <div className="hidden md:block md:w-1/4">
                      <Label htmlFor="name">用户名</Label>
                      <p className="font-semibold">{account.nickname}</p>
                    </div>
                    <Separator
                      orientation="vertical"
                      className={'hidden md:block'}
                    />
                    <div className="hidden md:block  md:w-1/4">
                      <Label htmlFor="name">角色</Label>
                      <p className="font-semibold">
                        {formatPath(
                          findDepartmentPathById(
                            department,
                            account.departmentId
                          )
                        ) || '暂无'}
                      </p>
                    </div>
                    <Separator
                      orientation="vertical"
                      className={'hidden md:block'}
                    />
                  </div>
                </div>
                <Separator />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 grid-col gap-2">
              <Button
                variant="destructive"
                {...changePasswordDialog.triggerProps}
              >
                修改密码
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ScrollArea>
      <Dialog {...changePasswordDialog.dialogProps}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改密码</DialogTitle>
            <DialogDescription>修改密码之后需要重新进行登录</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...changePasswordForm}>
              <form
                onSubmit={changePasswordForm.handleSubmit(handlePasswordChange)}
                className="w-full space-y-6"
              >
                <FormField
                  control={changePasswordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>原密码</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="输入原密码"
                          {...field}
                          autoComplete={'off'}
                          className="w-2/3"
                          type={'password'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={changePasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>新密码</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="输入新密码"
                          {...field}
                          autoComplete={'off'}
                          className="w-2/3"
                          type={'password'}
                        />
                      </FormControl>
                      <FormDescription>
                        长度为 8-16 位。 由字母、数字和符号组成，并以字母开头。
                        新密码不得与原密码相同。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={changePasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>确认密码</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="确认密码"
                          {...field}
                          autoComplete={'off'}
                          className="w-2/3"
                          type={'password'}
                        />
                      </FormControl>
                      <FormDescription>
                        再次输入一次新密码，确保2次输入的密码一致
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {changing ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    正在修改...
                  </Button>
                ) : (
                  <Button type="submit">确认修改</Button>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Account
