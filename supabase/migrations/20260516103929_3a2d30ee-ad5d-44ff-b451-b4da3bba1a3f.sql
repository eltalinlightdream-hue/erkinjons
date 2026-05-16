
CREATE OR REPLACE FUNCTION public.protect_premium_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'authenticated' THEN
    NEW.is_premium := OLD.is_premium;
    NEW.activated_at := OLD.activated_at;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.protect_premium_fields() FROM PUBLIC, anon, authenticated;
