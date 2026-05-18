CREATE TABLE public.test_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  test_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_done' CHECK (status IN ('not_done', 'not_completed', 'finished')),
  score INTEGER,
  total INTEGER,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, test_id)
);

CREATE INDEX idx_test_progress_user_status ON public.test_progress(user_id, status);

ALTER TABLE public.test_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own test progress select" ON public.test_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own test progress insert" ON public.test_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own test progress update" ON public.test_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own test progress delete" ON public.test_progress
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
