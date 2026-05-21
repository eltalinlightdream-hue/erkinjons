import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Crown, Loader2, Search, Shield, Users } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel - Abduraimov Erkinjon" },
      { name: "description", content: "Private student administration panel." },
    ],
  }),
  component: Admin,
});

const ADMIN_EMAIL = "eltalinlightdream@gmail.com";

type Student = {
  id: string;
  email: string | null;
  full_name: string | null;
  is_premium: boolean;
  activated_at: string | null;
  created_at: string;
};

function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user || !isAdmin) return;
    void loadStudents();
  }, [user, isAdmin]);

  async function loadStudents() {
    setStudentsLoading(true);
    const { data, error } = await (supabase as any).rpc("get_all_students");

    if (error) {
      toast.error(error.message);
      setStudentsLoading(false);
      return;
    }

    setStudents((data ?? []) as Student[]);
    setStudentsLoading(false);
  }

  async function togglePremium(student: Student) {
    const nextPremium = !student.is_premium;
    setUpdatingId(student.id);

    const { data, error } = await (supabase as any).rpc("admin_set_student_premium", {
      target_user_id: student.id,
      premium: nextPremium,
    });

    setUpdatingId(null);

    if (error) {
      toast.error(error.message || "Could not update premium status.");
      return;
    }

    const updated = Array.isArray(data) ? data[0] : data;
    setStudents((current) =>
      current.map((item) =>
        item.id === student.id
          ? {
              ...item,
              is_premium: Boolean(updated?.is_premium ?? nextPremium),
              activated_at: updated?.activated_at ?? (nextPremium ? new Date().toISOString() : null),
            }
          : item,
      ),
    );
    toast.success(nextPremium ? "Premium turned on." : "Premium turned off.");
  }

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;

    return students.filter((student) =>
      [student.email, student.full_name]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query)),
    );
  }, [students, search]);

  const premiumCount = students.filter((student) => student.is_premium).length;

  if (loading || (!user && !loading)) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </div>
      </SiteLayout>
    );
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <section className="container mx-auto px-4 py-16 max-w-2xl">
          <Card className="p-8 text-center">
            <Shield className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Admin access only</h1>
            <p className="text-sm text-muted-foreground">
              This page is private and can only be opened by the site owner.
            </p>
          </Card>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-10 max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage students and premium access.</p>
          </div>
          <Button variant="outline" onClick={loadStudents} disabled={studentsLoading}>
            {studentsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-5 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Total students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
          </Card>
          <Card className="p-5 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center">
              <Crown className="w-5 h-5 text-gold" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Premium students</p>
              <p className="text-2xl font-bold">{premiumCount}</p>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students by email or name"
              className="pl-9"
            />
          </div>

          {studentsLoading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-3 pr-4 font-medium">Email</th>
                    <th className="py-3 pr-4 font-medium">Name</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Activation date</th>
                    <th className="py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4 font-medium">{student.email || "-"}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{student.full_name || "-"}</td>
                      <td className="py-3 pr-4">
                        {student.is_premium ? (
                          <Badge className="bg-gold/15 text-gold border-gold/30">
                            <Crown className="w-3 h-3 mr-1" /> Premium
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-accent">Free</Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {student.activated_at ? new Date(student.activated_at).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          size="sm"
                          variant={student.is_premium ? "outline" : "default"}
                          onClick={() => togglePremium(student)}
                          disabled={updatingId === student.id}
                        >
                          {updatingId === student.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : student.is_premium ? (
                            "Turn off"
                          ) : (
                            "Turn on"
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredStudents.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">No students found.</p>
              )}
            </div>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
}
