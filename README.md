
# SIDIAM

Plataforma web para diagnostico de aprendizagem em matematica. Esta etapa do projeto usa `Supabase Auth` para login com e-mail e senha e uma tabela `profiles` para os dados pedagógicos basicos do usuario.

## Requisitos

- Node.js 18+
- Projeto criado no Supabase

## Setup local

1. Instale as dependencias:
   - `npm install`
2. Copie o arquivo de exemplo:
   - `Copy-Item .env.example .env`
3. Preencha no `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. No painel do Supabase, abra o SQL Editor e execute o script em [supabase/profiles.sql](/C:/Users/Kaic/Downloads/SIDIAM%203/supabase/profiles.sql:1).
5. Crie os usuarios iniciais no Supabase Dashboard:
   - `Authentication` -> `Users` -> `Add user`
6. Insira um perfil correspondente na tabela `public.profiles` para cada usuario criado.

## Estrutura esperada da tabela `profiles`

- `id uuid primary key references auth.users(id) on delete cascade`
- `name text not null`
- `role text not null default 'Professor(a)'`
- `school_name text not null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

## Politicas

O script SQL tambem:

- habilita RLS
- permite que o usuario autenticado leia apenas o proprio perfil
- permite que o usuario autenticado atualize apenas o proprio perfil

## Executando o projeto

- `npm run dev` para desenvolvimento
- `npm run build` para validar o build de producao

## Comportamento atual do login

- O usuario entra com e-mail e senha via Supabase Auth
- O app busca o perfil na tabela `profiles`
- Se houver autenticacao sem perfil correspondente, o acesso e bloqueado com mensagem amigavel
- Recuperacao de senha ainda nao foi implementada nesta etapa
