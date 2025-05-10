import Home from "@/components/Home"
import { getUserEvents } from "@/lib/actions/events/getUserEvents"
import { getUserPlan } from "@/lib/actions/plans/plans.actions"
import { getLoggedInUser } from "@/lib/actions/user/user.action"
import { EventsData } from "@/types/event"


const Page = async () => {

  const userPlan = await getUserPlan()
  const UserData = await getLoggedInUser()
  console.log(userPlan);

  let eventsData: EventsData = []

  try {
    const response = await getUserEvents()
    // Access the events array from response.data

    eventsData = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Failed to fetch events:', error)
    // Continue with empty array
  }

  const plan = userPlan.data
  const user = UserData.data



  return (
    <Home
      plan={plan}
      user={user}
      events={eventsData}
    />
  )
}

export default Page