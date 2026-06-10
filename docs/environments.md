# Ambientes — Lovebox (couple-quiz)

Mapa de onde cada deploy e o dev local apontam. **Nunca alterar projetos da org Integra.**

## Resumo

| Ambiente | Git | Vercel | Supabase | URL tipica |
|----------|-----|--------|----------|------------|
| **Producao** | `main` | Production | `couple-quiz` (`rjlbqgdmbszstezxvghn`) | https://couple-quiz-henna.vercel.app |
| **Homologacao** | `develop` | Preview | `couple-quiz-staging` (org Carlos) | `couple-quiz-*-git-develop-*.vercel.app` |
| **Local** | qualquer | — | `couple-quiz-staging` | http://localhost:5174 |

## Supabase

### Producao — `couple-quiz`

- Org: **Carlos** (`irwxqtzqlktyrnkyvikp`)
- Ref: `rjlbqgdmbszstezxvghn`
- URL: `https://rjlbqgdmbszstezxvghn.supabase.co`
- Migration: `supabase/migrations/001_story_unlocks.sql`
- PIN admin: `07021995`

### Homologacao — `couple-quiz-staging`

- Org: **Carlos** (mesma org, projeto **separado**)
- Nome: `couple-quiz-staging`
- Regiao: `sa-east-1`
- Migration: `supabase/migrations/001_story_unlocks_staging.sql` (schema identico, PIN `staging123`)
- PIN admin: **`staging123`**

#### Criar o projeto staging (primeira vez)

Conta free Supabase permite **2 projetos ativos** por administrador. Se a criacao falhar com *project limit*, pause ou exclua um projeto free que nao use (nao mexer em Integra sem necessidade) ou faca upgrade do plano.

1. Dashboard Supabase → org **Carlos** → **New project** → nome `couple-quiz-staging`, regiao Sao Paulo
2. SQL Editor → colar e executar `supabase/migrations/001_story_unlocks_staging.sql`
3. Settings → API → copiar **Project URL** e **anon public key**
4. Atualizar `.env.local`, vars **Preview** na Vercel e redeploy

Via MCP (quando houver vaga no limite free):

```text
create_project: couple-quiz-staging, org Carlos, sa-east-1
apply_migration: 001_story_unlocks_staging (conteudo do arquivo SQL)
```

## Variaveis de ambiente

| Variavel | Local | Preview (`develop`) | Production (`main`) |
|----------|-------|---------------------|---------------------|
| `VITE_APP_ENV` | `local` | `staging` | `production` |
| `VITE_SUPABASE_URL` | URL staging | URL staging | URL prod |
| `VITE_SUPABASE_ANON_KEY` | anon staging | anon staging | anon prod |

Badge no admin e banner em homolog (`VITE_APP_ENV=staging`): **Homologacao** / **Producao** / **Local**.

### Local — `.env.local`

Copie de `.env.example`. Aponte **sempre para staging** em dev:

```env
VITE_APP_ENV=local
VITE_SUPABASE_URL=https://<ref-staging>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-staging>
```

Nao commitar `.env.local` nem chaves.

### Vercel — projeto `snax10s-projects/couple-quiz`

- **Production Branch:** `main`
- **Production:** vars prod + `VITE_APP_ENV=production`
- **Preview** (branch `develop` e PRs): vars staging + `VITE_APP_ENV=staging`

Apos alterar vars: **Redeploy** (Vite embute env no build).

Preview URL estavel (opcional): Vercel → Settings → Domains → alias fixo para branch `develop`.

## Admin

| Ambiente | URL | Banco | PIN |
|----------|-----|-------|-----|
| Local | http://localhost:5174/admin | staging | `staging123` |
| Preview | `https://<preview>/admin` | staging | `staging123` |
| Producao | https://couple-quiz-henna.vercel.app/admin | prod | `07021995` |

## Validacao

1. Staging: 6 linhas em `story_unlocks`, RPC com PIN `staging123`
2. Local: liberar story no admin → home desbloqueia; **prod inalterada**
3. Preview (`develop`): deploy Preview → admin libera story → home reflete
4. Production (`main`): continua no banco prod; Preview nao altera prod
5. Badge de ambiente visivel no admin (e banner em homolog nos stories)

## O que nao fazer

- Nao renomear repo GitHub `couple-quiz` nem Supabase prod `couple-quiz`
- Nao usar org Integra
- Nao commitar anon keys
