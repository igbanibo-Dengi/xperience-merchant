import { PaymentFlow } from '@/components/forms/payment-flow'
import { getAllPlans, getUserPlan } from '@/lib/actions/plans/plans.actions'

export default async function Page() {
  // const plans = await getAllPlans()
  // const myPlan = await getUserPlan()

  // console.log(myPlan);

  return (
    <div className="py-10">
      <PaymentFlow />
    </div>
  )
}
