
-- vocabulary_folders
CREATE TABLE public.vocabulary_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vocabulary_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own folders select" ON public.vocabulary_folders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own folders insert" ON public.vocabulary_folders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own folders update" ON public.vocabulary_folders FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own folders delete" ON public.vocabulary_folders FOR DELETE TO authenticated USING (auth.uid() = user_id AND is_default = false);

-- vocabulary_words
CREATE TABLE public.vocabulary_words (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  folder_id UUID NOT NULL REFERENCES public.vocabulary_folders(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  definition TEXT NOT NULL,
  example TEXT,
  next_review TIMESTAMPTZ NOT NULL DEFAULT now(),
  interval_days INTEGER NOT NULL DEFAULT 0,
  ease_factor NUMERIC NOT NULL DEFAULT 2.5,
  last_reviewed TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_vocab_user_review ON public.vocabulary_words(user_id, next_review);
ALTER TABLE public.vocabulary_words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own words all" ON public.vocabulary_words FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- test_results
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  passage_title TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  band NUMERIC,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_results_user ON public.test_results(user_id, completed_at DESC);
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own results select" ON public.test_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own results insert" ON public.test_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- articles_read
CREATE TABLE public.articles_read (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  article_slug TEXT NOT NULL,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.articles_read ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own reads all" ON public.articles_read FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- bookmarks
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('article','vocabulary')),
  reference_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, type, reference_id)
);
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bookmarks all" ON public.bookmarks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- passage_notes
CREATE TABLE public.passage_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  passage_id TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, passage_id)
);
ALTER TABLE public.passage_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notes all" ON public.passage_notes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Update handle_new_user to seed default folder
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.vocabulary_folders (user_id, name, is_default)
  VALUES (NEW.id, 'General', true)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Backfill: ensure existing users have a General folder
INSERT INTO public.vocabulary_folders (user_id, name, is_default)
SELECT p.id, 'General', true FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.vocabulary_folders f WHERE f.user_id = p.id AND f.is_default = true
);
