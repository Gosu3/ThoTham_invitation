create extension if not exists "pgcrypto";

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  message text not null,
  guest_of text not null,
  attendance text not null,
  created_at timestamp with time zone not null default now()
);
