"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInData, signInSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Sign in</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to sign in to your account
                    </p>
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type="email" {...field} />
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
                                    <Input placeholder="Password" type="password" {...field} />
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
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">OR</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <Button variant="outline" className="w-full" type="button">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-8h8v2H8v-2z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Apple
                    </Button>
                    <Button variant="outline" className="w-full" type="button">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-8h8v2H8v-2z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-orange-500 hover:text-orange-600">
                        Sign up
                    </Link>
                </div>
            </form>
        </Form>
    )
}

