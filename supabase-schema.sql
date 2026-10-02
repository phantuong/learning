-- Learning progress sync schema
-- Run this once in Supabase Dashboard > SQL Editor.
create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_page text,
  last_subject text,
  last_course text,
  reading_story_current integer not null default 1,
  reading_completed jsonb not null default '[]'::jsonb,
  reading_answers jsonb not null default '{}'::jsonb,
  math_progress jsonb not null default '{}'::jsonb,
  shapes_progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;

drop policy if exists "Users can read own progress" on public.learning_progress;
drop policy if exists "Users can insert own progress" on public.learning_progress;
drop policy if exists "Users can update own progress" on public.learning_progress;

create policy "Users can read own progress"
  on public.learning_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.learning_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_learning_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists learning_progress_updated_at on public.learning_progress;
create trigger learning_progress_updated_at
before update on public.learning_progress
for each row execute function public.set_learning_progress_updated_at();
