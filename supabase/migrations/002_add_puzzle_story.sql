-- Adiciona o story do quebra-cabeça e reordena sort_order dos stories seguintes.

insert into public.story_unlocks (story_id, title, sort_order, unlock_at) values
  (
    'puzzle',
    'Quebra-cabeça',
    5,
    (timestamp '2026-06-12 15:30:00' at time zone 'America/Sao_Paulo')
  )
on conflict (story_id) do update set
  title = excluded.title,
  sort_order = excluded.sort_order,
  unlock_at = excluded.unlock_at;

update public.story_unlocks set sort_order = 6 where story_id = 'wheel';
update public.story_unlocks set sort_order = 7 where story_id = 'quiz';
