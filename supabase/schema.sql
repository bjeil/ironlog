-- ============================================================================
-- IronLog – Supabase database schema
-- Kjør dette i Supabase Dashboard → SQL Editor (én gang) på det nye
-- Supabase-prosjektet for IronLog.
--
-- Hver bruker ser kun egne data: alle tabeller har user_id som refererer til
-- auth.users, og appen filtrerer alltid på innlogget bruker. RLS er ikke
-- nødvendig siden øvelsene ikke er sensitive (beslutning i spec).
-- ============================================================================

-- 1. Øvelser: brukerens egen katalog.
--    type: 'styrke' | 'cardio'
--    category (kun styrke): 'base' | 'isolasjon'
--    body_part (kun styrke): 'bein' | 'core' | 'bryst' | 'rygg' | 'skuldre' | 'armer'
create table if not exists public.exercises (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  type        text not null check (type in ('styrke', 'cardio')),
  category    text check (category is null or category in ('base', 'isolasjon')),
  body_part   text check (body_part is null or body_part in ('bein', 'core', 'bryst', 'rygg', 'skuldre', 'armer')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, name)
);

create index if not exists exercises_user_idx on public.exercises (user_id);

-- 2. Planlagte økter (workouts).
create table if not exists public.workouts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists workouts_user_idx on public.workouts (user_id);

-- 3. Supersets innen en planlagt økt. Ingen nøsting: et supersett inneholder
--    kun øvelser (via workout_items.superset_id), aldri andre supersets.
create table if not exists public.supersets (
  id         uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  position   int not null,
  unique (workout_id, position)
);

-- 4. Økter-innhold: enkeltøvelser (superset_id null) eller øvelser i supersett,
--    med global rekkefølge (position). sets/reps er valgfritt og kun relevant
--    for styrkeøvelser.
create table if not exists public.workout_items (
  id          uuid primary key default gen_random_uuid(),
  workout_id  uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  superset_id uuid references public.supersets(id) on delete cascade,
  position    int not null,
  sets        int check (sets is null or sets > 0),
  reps        int check (reps is null or reps > 0),
  unique (workout_id, position)
);

create index if not exists workout_items_workout_idx on public.workout_items (workout_id);

-- 5. Loggede økter: én rad per logget økt per dato per bruker.
--    kind: 'styrke' | 'cardio' (begge kan forekomme samme dag).
--    workout_id peker til planlagt økt hvis økten ble valgt derfra (kan være null
--    for egendefinerte økter). rating gjelder hele økten (1–10).
create table if not exists public.workout_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  date        date not null,
  workout_id  uuid references public.workouts(id) on delete set null,
  kind        text not null check (kind in ('styrke', 'cardio')),
  rating      int check (rating is null or rating between 1 and 10),
  comment     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists workout_logs_user_date_idx on public.workout_logs (user_id, date);

-- 6. Loggede øvelser/sets innen en logget økt.
--    Styrke: sets + reps + weight_kg (kun kg).
--    Cardio: duration_min + intensity (1–10).
create table if not exists public.log_items (
  id           uuid primary key default gen_random_uuid(),
  log_id       uuid not null references public.workout_logs(id) on delete cascade,
  exercise_id  uuid not null references public.exercises(id) on delete cascade,
  position     int not null,
  sets         int check (sets is null or sets > 0),
  reps         int check (reps is null or reps > 0),
  weight_kg    numeric(6,2) check (weight_kg is null or weight_kg >= 0),
  duration_min int check (duration_min is null or duration_min > 0),
  intensity    int check (intensity is null or intensity between 1 and 10),
  unique (log_id, position)
);

create index if not exists log_items_log_idx on public.log_items (log_id);
create index if not exists log_items_exercise_idx on public.log_items (exercise_id);
