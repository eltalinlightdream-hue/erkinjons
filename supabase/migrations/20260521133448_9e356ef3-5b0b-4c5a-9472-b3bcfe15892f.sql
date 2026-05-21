CREATE OR REPLACE FUNCTION public.protect_premium_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only block premium-field changes when a user is updating THEIR OWN row.
  -- Admin RPCs (SECURITY DEFINER) update other users' rows, so auth.uid() != NEW.id and they pass through.
  IF auth.uid() = NEW.id THEN
    NEW.is_premium := OLD.is_premium;
    NEW.activated_at := OLD.activated_at;
  END IF;
  RETURN NEW;
END;
$function$;