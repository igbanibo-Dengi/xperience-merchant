"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckoutSchema, checkoutSchema } from "@/lib/schema"
import { PlanSelection } from "./plan-selection"
import { PaymentDetails } from "./payment-form"
import { ReviewOrder } from "./review-order"
import { SuccessScreen } from "./success-screen"


type Step = "plan" | "payment" | "review" | "success"

export function CheckoutForm() {
    const [step, setStep] = useState<Step>("plan")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            plan: {
                planType: "pro",
                price: 149,
            },
            payment: {
                useCompanyAddress: false,
            },
            review: {
                acceptTerms: false,
            },
        },
    })

    async function onSubmit(data: CheckoutSchema) {
        if (step === "plan") {
            setStep("payment")
            return
        }

        if (step === "payment") {
            setStep("review")
            return
        }

        if (step === "review") {
            setIsSubmitting(true)
            // Simulate API call
            console.log(data);

            await new Promise((resolve) => setTimeout(resolve, 2000))
            setIsSubmitting(false)
            setStep("success")
        }
    }

    return (
        <div className="mx-auto">
            {step === "plan" && (
                <PlanSelection form={form} onSubmit={form.handleSubmit(onSubmit)} />
            )}
            {step === "payment" && (
                <PaymentDetails
                    form={form}
                    onSubmit={form.handleSubmit(onSubmit)}
                    onBack={() => setStep("plan")}
                />
            )}
            {step === "review" && (
                <ReviewOrder
                    form={form}
                    onSubmit={form.handleSubmit(onSubmit)}
                    onBack={() => setStep("payment")}
                    isSubmitting={isSubmitting}
                />
            )}
            {step === "success" && (
                <SuccessScreen planType={form.getValues("plan.planType")} />
            )}
        </div>
    )
}

