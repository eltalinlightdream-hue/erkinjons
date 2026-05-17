import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Folder, Plus, Trash2, Pencil, Play, Loader2, Flame, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import {
  listFolders, createFolder, renameFolder, deleteFolder,
  listWords, addWord, deleteWord, dueWords, reviewWord, reviewStreak,
} from "@/lib/vocabulary.functions";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({ meta: [
    { title: "Vocabulary Practice — Abduraimov Erkinjon" },
    { name: "description", content: "Anki-style flashcard practice. Build folders, add words, and review with spaced repetition." },
  ]}),
  component: Vocab,
});

type View = { kind: "folders" } | { kind: "folder"; id: string } | { kind: "review"; folderId?: string };

function Vocab() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>({ kind: "folders" });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (!user) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        {view.kind === "folders" && <Folders onOpen={(id) => setView({ kind: "folder", id })} onReview={(id) => setView({ kind: "review", folderId: id })} />}
        {view.kind === "folder" && <FolderDetail folderId={view.id} onBack={() => setView({ kind: "folders" })} onReview={() => setView({ kind: "review", folderId: view.id })} />}
        {view.kind === "review" && <Review folderId={view.folderId} onBack={() => setView({ kind: "folders" })} />}
      </section>
    </SiteLayout>
  );
}

// ----- Folders list -----
function Folders({ onOpen, onReview }: { onOpen: (id: string) => void; onReview: (id?: string) => void }) {
  const fetchFolders = useServerFn(listFolders);
  const fetchStreak = useServerFn(reviewStreak);
  const createFn = useServerFn(createFolder);
  const qc = useQueryClient();
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const { data: folders, isLoading } = useQuery({ queryKey: ["folders"], queryFn: () => fetchFolders() });
  const { data: streak } = useQuery({ queryKey: ["streak"], queryFn: () => fetchStreak() });

  const onCreate = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      await createFn({ data: { name: newName.trim() } });
      setNewName("");
      qc.invalidateQueries({ queryKey: ["folders"] });
    } finally { setAdding(false); }
  };

  const totalDue = (folders ?? []).reduce((s, f) => s + (f.due ?? 0), 0);

  return (
    <>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Vocabulary</h1>
          <p className="text-muted-foreground">Folders, spaced-repetition flashcards, and your review streak.</p>
        </div>
        <div className="flex gap-3">
          <Card className="px-4 py-3 inline-flex items-center gap-2">
            <Flame className="w-4 h-4 text-gold" />
            <span className="text-sm"><strong>{streak?.streak ?? 0}</strong> day streak</span>
          </Card>
          <Button onClick={() => onReview(undefined)} disabled={totalDue === 0} className="bg-gradient-gold text-primary-foreground">
            <Play className="w-4 h-4 mr-1" /> Review all ({totalDue})
          </Button>
        </div>
      </div>

      <Card className="p-4 mb-6 flex items-center gap-2">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New folder name…" />
        <Button onClick={onCreate} disabled={adding || !newName.trim()}>
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      </Card>

      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(folders ?? []).map((f) => (
            <FolderCard key={f.id} folder={f} onOpen={() => onOpen(f.id)} onReview={() => onReview(f.id)} />
          ))}
        </div>
      )}
    </>
  );
}

function FolderCard({ folder, onOpen, onReview }: { folder: any; onOpen: () => void; onReview: () => void }) {
  const renameFn = useServerFn(renameFolder);
  const deleteFn = useServerFn(deleteFolder);
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  const save = async () => {
    await renameFn({ data: { id: folder.id, name } });
    setEditing(false);
    qc.invalidateQueries({ queryKey: ["folders"] });
  };
  const remove = async () => {
    if (!confirm(`Delete folder "${folder.name}" and all its words?`)) return;
    await deleteFn({ data: { id: folder.id } });
    qc.invalidateQueries({ queryKey: ["folders"] });
  };

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Folder className="w-5 h-5 text-secondary" />
        </span>
        {folder.is_default && <Badge variant="secondary" className="bg-accent text-foreground">Default</Badge>}
      </div>
      {editing ? (
        <div className="flex gap-2 mb-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button size="sm" onClick={save}>Save</Button>
        </div>
      ) : (
        <h3 className="font-serif text-lg font-semibold mb-1">{folder.name}</h3>
      )}
      <div className="text-xs text-muted-foreground mb-4 flex flex-wrap gap-3">
        <span>{folder.count} words</span>
        {folder.due > 0 && <Badge className="bg-gold/15 text-gold border-gold/30 text-[10px]">{folder.due} due today</Badge>}
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={onOpen}>Open</Button>
        <Button size="sm" onClick={onReview} disabled={folder.count === 0} className="bg-gradient-gold text-primary-foreground">
          <Play className="w-3 h-3 mr-1" /> Review
        </Button>
        {!folder.is_default && (
          <>
            <Button size="icon" variant="ghost" onClick={() => setEditing(!editing)}><Pencil className="w-4 h-4" /></Button>
            <Button size="icon" variant="ghost" onClick={remove}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </>
        )}
      </div>
    </Card>
  );
}

// ----- Folder detail (word list + add) -----
function FolderDetail({ folderId, onBack, onReview }: { folderId: string; onBack: () => void; onReview: () => void }) {
  const fetchWords = useServerFn(listWords);
  const addFn = useServerFn(addWord);
  const delFn = useServerFn(deleteWord);
  const fetchFolders = useServerFn(listFolders);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ word: "", definition: "", example: "" });

  const { data: folders } = useQuery({ queryKey: ["folders"], queryFn: () => fetchFolders() });
  const folder = folders?.find((f) => f.id === folderId);
  const { data: words, isLoading } = useQuery({
    queryKey: ["words", folderId],
    queryFn: () => fetchWords({ data: { folderId } }),
  });

  const onAdd = async () => {
    if (!form.word.trim() || !form.definition.trim()) {
      toast.error("Word and definition are required"); return;
    }
    await addFn({ data: { folderId, word: form.word.trim(), definition: form.definition.trim(), example: form.example.trim() } });
    setForm({ word: "", definition: "", example: "" });
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["words", folderId] });
    qc.invalidateQueries({ queryKey: ["folders"] });
  };

  return (
    <>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> All folders
      </button>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-3xl font-bold">{folder?.name ?? "Folder"}</h1>
          <p className="text-sm text-muted-foreground">{words?.length ?? 0} words • {folder?.due ?? 0} due today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1" /> Add Word</Button>
          <Button onClick={onReview} disabled={!words?.length} className="bg-gradient-gold text-primary-foreground">
            <Play className="w-4 h-4 mr-1" /> Review
          </Button>
        </div>
      </div>

      {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /> : (
        <div className="grid sm:grid-cols-2 gap-3">
          {(words ?? []).map((w) => (
            <Card key={w.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-lg font-semibold">{w.word}</h3>
                <Button size="icon" variant="ghost" onClick={async () => {
                  await delFn({ data: { id: w.id } });
                  qc.invalidateQueries({ queryKey: ["words", folderId] });
                  qc.invalidateQueries({ queryKey: ["folders"] });
                }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <p className="text-sm text-muted-foreground">{w.definition}</p>
              {w.example && <p className="text-sm italic text-muted-foreground mt-1">"{w.example}"</p>}
            </Card>
          ))}
          {(words ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground sm:col-span-2 text-center py-12">No words yet — add your first one.</p>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Word</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Word" value={form.word} onChange={(e) => setForm({ ...form, word: e.target.value })} />
            <Textarea placeholder="Definition" value={form.definition} onChange={(e) => setForm({ ...form, definition: e.target.value })} />
            <Textarea placeholder="Example sentence (optional)" value={form.example} onChange={(e) => setForm({ ...form, example: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onAdd} className="bg-gradient-gold text-primary-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----- Review session -----
function Review({ folderId, onBack }: { folderId?: string; onBack: () => void }) {
  const fetchDue = useServerFn(dueWords);
  const reviewFn = useServerFn(reviewWord);
  const qc = useQueryClient();

  const { data: cards, isLoading, refetch } = useQuery({
    queryKey: ["due", folderId ?? "all"],
    queryFn: () => fetchDue({ data: { folderId } }),
    refetchOnMount: "always",
  });

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const total = cards?.length ?? 0;
  const current = cards?.[i];
  const progress = total ? Math.round((i / total) * 100) : 0;

  const rate = async (rating: "again" | "hard" | "good" | "easy") => {
    if (!current) return;
    await reviewFn({ data: { id: current.id, rating } });
    setFlipped(false);
    if (i + 1 >= total) {
      qc.invalidateQueries({ queryKey: ["folders"] });
      qc.invalidateQueries({ queryKey: ["streak"] });
      refetch();
      setI(0);
    } else { setI(i + 1); }
  };

  return (
    <>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> Exit session
      </button>
      <h1 className="text-3xl font-bold mb-2">Review</h1>
      <Progress value={progress} className="mb-6" />
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /> :
        !current ? (
          <Card className="p-12 text-center">
            <h3 className="font-serif text-2xl font-semibold mb-2">All done 🎉</h3>
            <p className="text-muted-foreground mb-4">No more cards due. Come back later!</p>
            <Button onClick={onBack} variant="outline">Back to folders</Button>
          </Card>
        ) : (
          <>
            <Card
              className="p-10 min-h-[260px] flex flex-col items-center justify-center cursor-pointer text-center bg-gradient-warm"
              onClick={() => setFlipped(!flipped)}
            >
              {!flipped ? (
                <>
                  <h2 className="font-serif text-4xl font-semibold mb-3">{current.word}</h2>
                  <p className="text-sm text-muted-foreground">Tap to reveal</p>
                </>
              ) : (
                <>
                  <p className="text-lg mb-3">{current.definition}</p>
                  {current.example && <p className="italic text-muted-foreground">"{current.example}"</p>}
                </>
              )}
            </Card>
            {flipped && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                <Button variant="outline" onClick={() => rate("again")} className="border-destructive/40 text-destructive">Again</Button>
                <Button variant="outline" onClick={() => rate("hard")}>Hard</Button>
                <Button variant="outline" onClick={() => rate("good")} className="border-sage/40 text-sage">Good</Button>
                <Button onClick={() => rate("easy")} className="bg-gradient-gold text-primary-foreground">Easy</Button>
              </div>
            )}
            <p className="text-center text-xs text-muted-foreground mt-4">{i + 1} of {total}</p>
          </>
        )
      }
    </>
  );
}

// silence unused warning
void Link;