import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/listening")({
  head: () => ({ meta: [
    { title: "IELTS Listening | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Listening practice and lessons." },
  ]}),
  component: Listening,
});

function Listening() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">IELTS Listening</h1>
        <p className="text-muted-foreground">Content coming soon.</p>
      </section>
    </SiteLayout>
  );
}
