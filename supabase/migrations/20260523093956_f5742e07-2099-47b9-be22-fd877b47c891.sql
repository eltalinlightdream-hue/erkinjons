
-- Admin check helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) = 'eltalinlightdream@gmail.com'
  );
$$;

-- Harden admin functions with internal admin check
CREATE OR REPLACE FUNCTION public.get_all_students()
RETURNS TABLE(id uuid, email text, full_name text, is_premium boolean, activated_at timestamp with time zone, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY
    SELECT p.id, u.email::text, p.full_name, p.is_premium, p.activated_at, p.created_at
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.id
    ORDER BY p.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_set_student_premium(target_user_id uuid, premium boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE public.profiles
  SET is_premium = premium,
      activated_at = CASE WHEN premium THEN now() ELSE NULL END
  WHERE id = target_user_id;
END;
$$;

-- Revoke broad execute; keep authenticated (internal check enforces admin)
REVOKE EXECUTE ON FUNCTION public.get_all_students() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_student_premium(uuid, boolean) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
