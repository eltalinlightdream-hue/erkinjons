
-- Activation codes for premium redemption
CREATE TABLE public.activation_codes (
  code TEXT PRIMARY KEY,
  note TEXT,
  used_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.activation_codes ENABLE ROW LEVEL SECURITY;

-- No public policies: only service role (server functions) can read/write codes.
-- Users redeem via a server function using the admin client.
