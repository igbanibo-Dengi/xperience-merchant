import Home from "@/components/Home"
import { getUserEvents } from "@/lib/actions/events/getUserEvents"
import { getUserPlan } from "@/lib/actions/plans/plans.actions"
import { getLoggedInUser } from "@/lib/actions/user/user.action"


const Page = async () => {

  const userPlan = await getUserPlan()
  const UserData = await getLoggedInUser()
  const eventsData = await getUserEvents()

  const plan = userPlan.data
  const user = UserData.data
  const events = eventsData.data

  return (
    <Home
      plan={plan}
      user={user}
      events={events}
    />
  )
}

export default Page