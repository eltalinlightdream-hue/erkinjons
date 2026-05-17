import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, NotebookPen, Loader2, Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getNote, saveNote } from "@/lib/notes.functions";
import { Link } from "@tanstack/react-router";

export function NotesPanel({ passageId }: { passageId: string }) {
  const { user } = useAuth();
  const fetchNote = useServerFn(getNote);
  const persistNote = useServerFn(saveNote);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data } = useQuery({
    queryKey: ["note", passageId, user?.id],
    queryFn: () => fetchNote({ data: { passageId } }),
    enabled: !!user && open,
  });

  useEffect(() => {
    if (data?.notes !== undefined) setText(data.notes);
  }, [data]);

  const onSave = async () => {
    if (!user) return;
    setSaving(true); setSaved(false);
    try {
      await persistNote({ data: { passageId, notes: text } });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally { setSaving(false); }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border border-border rounded-xl bg-card">
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-accent/40 rounded-xl">
        <span className="inline-flex items-center gap-2"><NotebookPen className="w-4 h-4 text-secondary" /> My Notes</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        {!user ? (
          <p className="text-sm text-muted-foreground">
            <Link to="/auth" className="text-secondary underline">Sign in</Link> to save personal notes for this passage.
          </p>
        ) : (
          <div className="space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={onSave}
              placeholder="Vocabulary, paraphrases, mistakes to remember…"
              className="min-h-[140px] resize-y"
            />
            <div className="flex items-center justify-end gap-2">
              {saved && <span className="text-xs text-sage inline-flex items-center gap-1"><Check className="w-3 h-3" /> Saved</span>}
              <Button size="sm" variant="outline" onClick={onSave} disabled={saving}>
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}