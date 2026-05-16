import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">IELTS Writing</h1>
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
