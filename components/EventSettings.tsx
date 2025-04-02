import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Event } from "@/types/event"



export default function EventSettings({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Event Settings</h2>
        <p className="text-muted-foreground">Manage your event settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>Update your event details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" defaultValue={event.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea id="description" defaultValue={event.description || ""} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input id="date" type="date" defaultValue={new Date(event.eventDate).toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Input id="time" type="time" defaultValue={event.eventStartTime || ""} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Update your event location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="virtual" defaultChecked={event.location.type === "Virtual"} />
                <Label htmlFor="virtual">Virtual Event</Label>
              </div>

              {event.location.type === "Physical" && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <Input id="venue" defaultValue={event.location.venueName || ""} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue={event.location.city || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue={event.location.state || ""} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button>Save Location</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can view and interact with your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public">Public Event</Label>
                  <p className="text-sm text-muted-foreground">Anyone can discover and view this event</p>
                </div>
                <Switch id="public" defaultChecked={true} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comments">Allow Comments</Label>
                  <p className="text-sm text-muted-foreground">Let attendees comment on photos and moments</p>
                </div>
                <Switch id="comments" defaultChecked={true} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="download">Allow Photo Downloads</Label>
                  <p className="text-sm text-muted-foreground">Let attendees download photos from the event</p>
                </div>
                <Switch id="download" defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage notifications for this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about this event</p>
                </div>
                <Switch id="email" defaultChecked={true} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Switch id="push" defaultChecked={true} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="moments">Xperience Moment Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified before each Xperience moment</p>
                </div>
                <Switch id="moments" defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

