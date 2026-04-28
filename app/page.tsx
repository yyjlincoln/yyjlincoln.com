import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const makeCommands = [
  { cmd: "make build", desc: "Build Docker image for current platform" },
  { cmd: "make buildx", desc: "Build multi-platform image, load locally" },
  { cmd: "make push", desc: "Build multi-platform image and push to registry" },
  { cmd: "make run", desc: "Run the container on port 3000" },
  { cmd: "make stop", desc: "Stop the running container" },
  { cmd: "make clean", desc: "Remove the local Docker image" },
  { cmd: "make up", desc: "Start dev environment with Docker Compose" },
  { cmd: "make down", desc: "Stop the dev environment" },
  { cmd: "make info", desc: "Print build configuration" },
  { cmd: "make generate-nginx", desc: "Generate nginx reverse proxy config" },
  {
    cmd: "make generate-manifest",
    desc: "Build, push, and create deployment manifest",
  },
];

export default function Home() {
  return (
    <main className="min-h-svh flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Hello, World
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            A Next.js deploy template with Docker, nginx, and one-command
            deployments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Next.js 16</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="secondary">Tailwind v4</Badge>
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="secondary">Docker</Badge>
          <Badge variant="secondary">TypeScript</Badge>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Project Setup</CardTitle>
            <CardDescription>
              This template is configured for containerised deployment with
              standalone output. Configuration lives in{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                project.json
              </code>{" "}
              &mdash; set your registry, image name, and target platforms there.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Make Commands</CardTitle>
            <CardDescription>
              Everything is driven through the Makefile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {makeCommands.map(({ cmd, desc }) => (
                <div
                  key={cmd}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                >
                  <code className="text-sm font-mono font-medium whitespace-nowrap">
                    {cmd}
                  </code>
                  <span className="text-sm text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Flow</CardTitle>
            <CardDescription>
              Run{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                make generate-manifest
              </code>{" "}
              to build, push, and package a deployment manifest. Transfer the
              tarball to your server and run{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                deploy.py
              </code>{" "}
              to pull the image, install the nginx config, and start the
              container.
            </CardDescription>
          </CardHeader>
        </Card>

        <p className="text-xs text-muted-foreground text-center pb-4">
          Edit{" "}
          <code className="bg-muted px-1 py-0.5 rounded font-mono">
            app/page.tsx
          </code>{" "}
          to get started.
        </p>
      </div>
    </main>
  );
}
