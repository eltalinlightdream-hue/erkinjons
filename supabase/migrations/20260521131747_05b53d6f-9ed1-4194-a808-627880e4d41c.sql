create or replace function public.get_all_students()
returns table (
  id uuid,
  email text,
  full_name text,
  is_premium boolean,
  activated_at timestamptz,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select 
    p.id,
    u.email,
    p.full_name,
    p.is_premium,
    p.activated_at,
    p.created_at
  from public.profiles p
  join auth.users u on u.id = p.id
  order by p.created_at desc;
$$;

create or replace function public.admin_set_student_premium(
  target_user_id uuid,
  premium boolean
)
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
  set 
    is_premium = premium,
    activated_at = case when premium then now() else null end
  where id = target_user_id;
$$;

grant execute on function public.get_all_students() to authenticated;
grant execute on function public.admin_set_student_premium(uuid, boolean) to authenticated;