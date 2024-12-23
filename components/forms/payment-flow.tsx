"use client"

import { useState } from "react"
import { PlanSelection } from "./plan-selection"
import { PaymentForm } from "./payment-form"
import { ReviewOrder } from "./review-order"
import { SuccessScreen } from "./success-screen"
import type { PaymentFormValues } from "@/lib/schema"

type Step = "plan-selection" | "payment-form" | "review" | "success"

interface Plan {
    id: string
    name: string
    price: number
    description: string
    features: string[]
}

export function PaymentFlow() {
    const [step, setStep] = useState<Step>("plan-selection")
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [paymentDetails, setPaymentDetails] = useState<PaymentFormValues | null>(null)

    const handlePlanSelection = (plan: Plan) => {
        console.log('Selected plan:', plan)
        setSelectedPlan(plan)
        setStep("payment-form")
    }

    const handlePaymentSubmit = (data: PaymentFormValues) => {
        console.log('Payment form submitted:', data)
        setPaymentDetails(data)
        setStep("review")
    }

    const handlePaymentConfirm = () => {
        // Here you would typically make an API call to process the payment
        console.log('Payment confirmed')
        setStep("success")
    }

    const handleBackToHome = () => {
        // Reset the flow
        setStep("plan-selection")
        setSelectedPlan(null)
        setPaymentDetails(null)
    }

    const handleCreateEvent = () => {
        // Navigate to event creation page
        console.log("Navigate to event creation")
    }

    return (
        <div className="">
            {step === "plan-selection" && <PlanSelection onSelectPlan={handlePlanSelection} />}

            {step === "payment-form" && (
                <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setStep("plan-selection")}
                />
            )}

            {step === "review" && selectedPlan && paymentDetails && (
                <ReviewOrder
                    plan={selectedPlan}
                    paymentDetails={paymentDetails}
                    onBack={() => setStep("payment-form")}
                    onConfirm={handlePaymentConfirm}
                />
            )}

            {step === "success" && selectedPlan && (
                <SuccessScreen
                    planName={selectedPlan.name}
                    onBackToHome={handleBackToHome}
                    onCreateEvent={handleCreateEvent}
                />
            )}
        </div>
    )
}

