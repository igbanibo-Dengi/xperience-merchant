"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SignInData, signInSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Mail, Lock, Apple, Chrome } from "lucide-react"

interface SignInFormProps {
    onSubmit: (data: SignInData) => void
}

export function SignInForm({ onSubmit }: SignInFormProps) {
    const form = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <div className="flex flex-col justify-center min-h-screen p-8">
            <div className="w-full max-w-lg mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign in</h1>
                    <p className="text-muted-foreground">Enter your email and password to sign in to your account</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Email" type="email" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Password" type="password" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                            Sign in
                        </Button>
                        <div className="text-center">
                            <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                                Forgot password?
                            </Link>
                        </div>
                        {/* <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Button variant="outline" className="w-full" type="button">
                                <Apple className="mr-2 h-4 w-4" />
                                Apple
                            </Button>
                            <Button variant="outline" className="w-full" type="button">
                                <Chrome className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div> */}
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/sign-up" className="text-orange-500 hover:text-orange-600">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

