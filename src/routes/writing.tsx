import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

export const Route = createFileRoute("/writing")({
  head: () => ({ meta: [
    { title: "IELTS Writing — Task 1 & Task 2 | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Writing Task 1 and Task 2 practice and lessons." },
  ]}),
  component: Writing,
});

function Writing() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">IELTS Writing</h1>

        {/* Video lessons banner */}
        <div className="flex items-center justify-between bg-accent rounded-2xl px-6 py-4 mb-8 gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-base">Want to watch Writing lessons?</p>
            <p className="text-sm text-muted-foreground">I have dedicated Writing playlists on my Video Lessons page.</p>
          </div>
          <Link to="/videos">
            <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white shrink-0">
              <Youtube className="w-4 h-4 mr-2" /> Watch Video Lessons
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="t1">
          <TabsList>
            <TabsTrigger value="t1">Task 1</TabsTrigger>
            <TabsTrigger value="t2">Task 2</TabsTrigger>
          </TabsList>
          <TabsContent value="t1" className="py-10 text-muted-foreground">
            Content coming soon.
          </TabsContent>
          <TabsContent value="t2" className="py-10 text-muted-foreground">
            Content coming soon.
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}
