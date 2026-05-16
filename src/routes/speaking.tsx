import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/speaking")({
  head: () => ({ meta: [
    { title: "IELTS Speaking — Part 1, 2 & 3 | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Speaking practice for all three parts." },
  ]}),
  component: Speaking,
});

function Speaking() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">IELTS Speaking</h1>
        <Tabs defaultValue="p1">
          <TabsList>
            <TabsTrigger value="p1">Part 1</TabsTrigger>
            <TabsTrigger value="p2">Part 2</TabsTrigger>
            <TabsTrigger value="p3">Part 3</TabsTrigger>
          </TabsList>
          <TabsContent value="p1" className="py-10 text-muted-foreground">Content coming soon.</TabsContent>
          <TabsContent value="p2" className="py-10 text-muted-foreground">Content coming soon.</TabsContent>
          <TabsContent value="p3" className="py-10 text-muted-foreground">Content coming soon.</TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}
