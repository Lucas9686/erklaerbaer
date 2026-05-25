-- Erklärbär: Vector-Store + Chat-Memory + Bild-Bucket (OpenAI text-embedding-3-small, 1536 Dim)

-- pgvector aktivieren
create extension if not exists vector;

-- Vector-Store-Tabelle (n8n Supabase Vector Store, OpenAI 1536)
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  content   text,
  metadata  jsonb,
  embedding vector(1536)
);

create index if not exists documents_embedding_idx
  on documents using hnsw (embedding vector_cosine_ops);

-- Ähnlichkeitssuche-Funktion (vom n8n Supabase Vector Store Node aufgerufen)
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default null,
  filter jsonb default '{}'
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
) language plpgsql as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Chat-Memory-Tabelle (Postgres Chat Memory Node legt sie sonst selbst an)
create table if not exists memory (
  id         serial primary key,
  session_id varchar not null,
  message    jsonb   not null
);

-- Storage-Bucket für Bilder (public read; Bucket-Name case-sensitive!)
insert into storage.buckets (id, name, public)
values ('bilder', 'bilder', true)
on conflict (id) do nothing;
