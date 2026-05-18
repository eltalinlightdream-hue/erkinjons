import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [draftWord, setDraftWord] = useState(word);
  const [draftDefinition, setDraftDefinition] = useState(definition);
  const [draftExample, setDraftExample] = useState(example);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraftWord(word);
    setDraftDefinition(definition);
    setDraftExample(example);
  }, [open, word, definition, example]);

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
      await addWordFn({
        data: {
          folderId: target,
          word: draftWord,
          definition: draftDefinition,
          example: draftExample,
        },
      });
      qc.invalidateQueries({ queryKey: ["folders"] });
      toast.success(`Saved "${draftWord}" to your vocabulary.`);
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookmarkPlus className="w-5 h-5 text-secondary" /> Save to Vocabulary
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Word</label>
            <Input value={draftWord} onChange={(e) => setDraftWord(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Definition</label>
            <Textarea
              value={draftDefinition}
              onChange={(e) => setDraftDefinition(e.target.value)}
              placeholder="Add a definition"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Example</label>
            <Textarea
              value={draftExample}
              onChange={(e) => setDraftExample(e.target.value)}
              placeholder="Add an example sentence"
            />
          </div>
          <div className="pt-2">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Folder</label>
            <Select value={folderId || folders?.[0]?.id || ""} onValueChange={setFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose folder" />
              </SelectTrigger>
              <SelectContent>
                {(folders ?? []).map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={busy || !draftWord.trim()}
            className="bg-gradient-gold text-primary-foreground"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
