import { PaymentFlow } from "@/components/forms/payment-flow";
import { getAllPlans } from "@/lib/actions/plans/plans.actions";

export default async function Page() {

    const plans = await getAllPlans();


    // console.log(plans);


    return (
        <div className="py-10">
            <PaymentFlow />
        </div>
    )
}

