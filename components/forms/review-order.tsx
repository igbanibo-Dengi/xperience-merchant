"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { PaymentFormValues } from "@/lib/schema"
import { useState } from "react"

interface ReviewOrderProps {
    plan: {
        name: string
        price: number
        description: string
        features: string[]
    }
    paymentDetails: PaymentFormValues
    onBack: () => void
    onConfirm: () => void
}

export function ReviewOrder({ plan, paymentDetails, onBack, onConfirm }: ReviewOrderProps) {
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [error, setError] = useState<string | null>(null)


    return (
        <Card className="max-w-4xl ml-20 border-none bg-transparent">
            <CardHeader>
                <CardTitle className="text-[32px] font-bold">Review Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-8">
                        <div className="flex flex-col p-4 bg-muted rounded-md border border-foreground">
                            <h3 className="font-semibold text-[24px]">{plan.name}</h3>
                            <span className="my-4">
                                <p className="text-lg font-bold">${plan.price}</p>
                                <p className="font-normal text-sm text-muted-foreground">per month</p>
                            </span>
                            <p className="mb-4 text-lg">{plan.description}</p>
                            <ul className="space-y-2 text-sm list-disc list-inside pl-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="terms"
                                checked={termsAccepted}
                                onCheckedChange={(checked) => {
                                    setTermsAccepted(checked as boolean)
                                    setError(null)
                                }}
                            />
                            <Label htmlFor="terms" className="text-sm">
                                I agree to the{" "}
                                <a href="#" className="text-blue-600 font-semibold hover:underline">
                                    Terms & Conditions
                                </a>
                            </Label>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total:</span>
                                <span>${plan.price}.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4 gap-8">
                            <Button className="w-full" type="button" variant="outline" onClick={onBack}>
                                Back
                            </Button>
                            <Button className="w-full" disabled={!termsAccepted} onClick={onConfirm}>Continue</Button>
                        </div>
                    </div>
                    <div className="space-y-4 pt-5">
                        <div>
                            <h3 className="font-bold text-lg">Payment Method</h3>
                            <p className="text-muted-foreground">
                                VISA ending in {paymentDetails.card.cardNumber.slice(-4)}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Billing Address</h3>
                            <address className="text-muted-foreground not-italic">
                                {paymentDetails.billing.address}
                                <br />
                                {paymentDetails.billing.city}, {paymentDetails.billing.state}{" "}
                                {paymentDetails.billing.zipCode}
                                <br />
                                {paymentDetails.billing.country}
                            </address>
                        </div>
                    </div>
                </div>


            </CardContent>
        </Card>
    )
}

