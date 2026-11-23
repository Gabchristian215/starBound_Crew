-- Run in the Supabase SQL editor to create the crewmates table.
create table if not exists public.crewmates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  category text not null check (category in ('Pilot','Engineer','Medic','Scientist')),
  color text not null check (char_length(color) between 1 and 20),
  specialty text not null check (char_length(specialty) between 1 and 40),
  speed text not null check (speed in ('Slow','Steady','Fast','Warp'))
);

create index if not exists crewmates_created_at_idx on public.crewmates (created_at desc);

alter table public.crewmates enable row level security;

-- Demo policies: anyone with the publishable key can read and write.
-- Tighten these if you add auth.
create policy "crewmates read" on public.crewmates for select to anon, authenticated using (true);
create policy "crewmates insert" on public.crewmates for insert to anon, authenticated with check (true);
create policy "crewmates update" on public.crewmates for update to anon, authenticated using (true) with check (true);
create policy "crewmates delete" on public.crewmates for delete to anon, authenticated using (true);
