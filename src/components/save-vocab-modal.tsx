import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { listFolders, addWord } from "@/lib/vocabulary.functions";

interface Props {
  open: boolean;
  onClose: () => void;
  word: string;
  definition: string;
  example: string;
}

export function SaveVocabModal({ open, onClose, word, definition, example }: Props) {
  const fetchFolders = useServerFn(listFolders);
  const addWordFn = useServerFn(addWord);
  const qc = useQueryClient();
  const [folderId, setFolderId] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const { data: folders } = useQuery({
    queryKey: ["folders"],
    queryFn: () => fetchFolders(),
    enabled: open,
  });

  const onSave = async () => {
    const target = folderId || folders?.[0]?.id;
    if (!target) return;
    setBusy(true);
    try {
      await addWordFn({ data: { folderId: target, word, definition, example } });
      qc.invalidateQueries({ queryKey: ["folders"] });
      toast.success(`Saved "${word}" to your vocabulary.`);
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><BookmarkPlus className="w-5 h-5 text-secondary" /> Save to Vocabulary</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div><span className="text-muted-foreground">Word:</span> <strong>{word}</strong></div>
          <div className="text-muted-foreground">{definition}</div>
          {example && <div className="italic text-muted-foreground">"{example}"</div>}
          <div className="pt-2">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Folder</label>
            <Select value={folderId || folders?.[0]?.id || ""} onValueChange={setFolderId}>
              <SelectTrigger><SelectValue placeholder="Choose folder" /></SelectTrigger>
              <SelectContent>
                {(folders ?? []).map((f) => (
                  <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave} disabled={busy} className="bg-gradient-gold text-primary-foreground">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}