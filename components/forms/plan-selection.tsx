'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 49,
    description: 'Small events, conferences, and webinars',
    features: [
      'Event creation',
      'QR code generation',
      'Photo storage',
      'Basic analytics',
      '50 GB storage',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 149,
    description: 'Medium to large events, conferences, and festivals',
    features: [
      'All Basic Plan features',
      'Live picture display',
      'Advanced analytics',
      'Automated photo moderation',
      '200 GB storage',
      'Email and chat support',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    description: 'Unlimited events of any size',
    features: [
      'All Pro Plan features',
      'Unlimited number of events',
      'Advanced analytics and reporting',
      'Advanced customization',
      'Unlimited storage',
      'Dedicated account manager',
    ],
  },
]

interface PlanSelectionProps {
  onSelectPlan: (plan: Plan) => void
}

export function PlanSelection({ onSelectPlan }: PlanSelectionProps) {
  return (
    <div className="h-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Choose your plan</h1>
      <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative border border-foreground bg-muted ${plan.popular ? 'bg-primary text-white shadow-lg' : ''}`}
          >
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-normal text-white">
                      Best Value
                    </span>
                  )}
                </span>
                <p className="text-base font-normal">{plan.description}</p>
                <p className="mt-2 text-3xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal">/month</span>
                </p>
                <Button
                  className={`my-4 w-full bg-foreground font-bold text-white hover:bg-foreground/80 ${plan.popular ? 'bg-white text-foreground hover:bg-muted' : ''}`}
                  variant={plan.popular ? 'outline' : 'default'}
                  onClick={() => onSelectPlan(plan)}
                >
                  Get Started
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
