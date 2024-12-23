import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SuccessScreenProps {
    planName: string
    onBackToHome: () => void
    onCreateEvent: () => void
}

export function SuccessScreen({ planName, onBackToHome, onCreateEvent }: SuccessScreenProps) {
    return (
        <Card className="max-w-2xl ml-20 border-none bg-transparent shadow-none">
            <CardHeader>
                <CardTitle className="text-[32px] font-bold">Congratulations!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-left text-lg font-semibold">
                    Your subscription has now been upgraded to the {planName}!
                </p>
                <p className="text-left">
                    Let's get you started with your new plan by creating <br className="hidden md:block" /> your first event and checking out all of
                    the cool <br className="hidden md:block" /> features that come with your plan.
                </p>
                <div className="flex justify-center gap-4 md:gap-8 md:w-[70%] mt-8">
                    <Button size={"lg"} className="w-full" variant="outline" onClick={onBackToHome}>
                        Back to Home
                    </Button>
                    <Button size={"lg"} className="w-full" onClick={onCreateEvent}>Create new event</Button>
                </div>
            </CardContent>
        </Card>
    )
}

