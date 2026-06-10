-- couple-quiz: story unlock schedule (org Carlos, projeto dedicado)
-- PIN admin: definido em app_settings (altere via SQL com extensions.crypt)

create extension if not exists pgcrypto with schema extensions;

create table public.app_settings (
  key text primary key,
  value text not null
);

alter table public.app_settings enable row level security;

create table public.story_unlocks (
  story_id text primary key,
  title text not null,
  sort_order smallint not null,
  unlock_at timestamptz not null
);

alter table public.story_unlocks enable row level security;

create policy "Public read story unlocks"
  on public.story_unlocks
  for select
  to anon, authenticated
  using (true);

insert into public.app_settings (key, value) values
  ('admin_pin_hash', extensions.crypt('07021995', extensions.gen_salt('bf')));

insert into public.story_unlocks (story_id, title, sort_order, unlock_at) values
  (
    'time',
    'Tempo juntos',
    1,
    (timestamp '2026-06-12 00:00:00' at time zone 'America/Sao_Paulo')
  ),
  (
    'timeline',
    'Timeline',
    2,
    (timestamp '2026-06-12 08:00:00' at time zone 'America/Sao_Paulo')
  ),
  (
    'map',
    'Mapa',
    3,
    (timestamp '2026-06-12 11:00:00' at time zone 'America/Sao_Paulo')
  ),
  (
    'hearts',
    'Caça aos corações',
    4,
    (timestamp '2026-06-12 14:00:00' at time zone 'America/Sao_Paulo')
  ),
  (
    'wheel',
    'Roleta da sorte',
    5,
    (timestamp '2026-06-12 17:00:00' at time zone 'America/Sao_Paulo')
  ),
  (
    'quiz',
    'Quiz',
    6,
    (timestamp '2026-06-12 20:00:00' at time zone 'America/Sao_Paulo')
  );

create or replace function public.admin_unlock_story(
  p_story_id text,
  p_pin text,
  p_unlock_at timestamptz default now()
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_hash text;
begin
  select value into stored_hash
  from public.app_settings
  where key = 'admin_pin_hash';

  if stored_hash is null or extensions.crypt(p_pin, stored_hash) <> stored_hash then
    raise exception 'invalid_pin';
  end if;

  update public.story_unlocks
  set unlock_at = p_unlock_at
  where story_id = p_story_id;

  if not found then
    raise exception 'story_not_found';
  end if;
end;
$$;

create or replace function public.admin_unlock_all_stories(
  p_pin text,
  p_unlock_at timestamptz default now()
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_hash text;
begin
  select value into stored_hash
  from public.app_settings
  where key = 'admin_pin_hash';

  if stored_hash is null or extensions.crypt(p_pin, stored_hash) <> stored_hash then
    raise exception 'invalid_pin';
  end if;

  update public.story_unlocks
  set unlock_at = p_unlock_at;
end;
$$;

grant execute on function public.admin_unlock_story(text, text, timestamptz) to anon, authenticated;
grant execute on function public.admin_unlock_all_stories(text, timestamptz) to anon, authenticated;

alter publication supabase_realtime add table public.story_unlocks;
