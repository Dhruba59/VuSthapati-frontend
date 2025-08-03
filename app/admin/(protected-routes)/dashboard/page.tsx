import { ProtectedRoute } from "@/components/protected-route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { messagesAPI, newsAPI, projectsAPI } from "@/lib/api";
import { MessagePayload } from "@/lib/models";
import { PROJECT_TYPE } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const totalProject = await projectsAPI
    .getAll(PROJECT_TYPE.ALL)
    .then((res) => res.length)
    .catch(() => 0);
  const totalNews = await newsAPI
    .getAll()
    .then((res) => res.length)
    .catch(() => 0);

  let messages = await messagesAPI.getAll().then((res) => res.slice(0,3) ?? res).catch(() => []);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome to your admin dashboard.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProject}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages?.length ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total News Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNews}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your portfolio activity for the past 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Activity chart will be displayed here
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>
                You received 5 new messages this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {
                  messages.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      No recent messages.
                    </div>
                  ) : messages?.map((msg: MessagePayload, index: number) => (
                    <div key={index} className="border-b pb-2">
                      <div className="font-medium">{msg.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {msg.message.length > 50 ? `${msg.message.slice(0, 50)}...` : msg.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(msg?.createdAt ?? '').toLocaleString()}
                      </div>
                    </div>
                  ))
                }
                {/* <div className="border-b pb-2">
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">
                    I'm interested in your services...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    2 days ago
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">
                    Great portfolio! Are you available for...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    3 days ago
                  </div>
                </div> */}
                {/* <div>
                  <div className="font-medium">Tech Company Inc.</div>
                  <div className="text-sm text-muted-foreground">
                    We'd like to discuss a potential project...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    5 days ago
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
