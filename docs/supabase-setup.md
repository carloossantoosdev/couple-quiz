# Supabase — couple-quiz (org Carlos)

Dois projetos na org **Carlos** (nunca Integra):

| Projeto | Uso | Ref (prod) |
|---------|-----|------------|
| **couple-quiz** | Producao | `rjlbqgdmbszstezxvghn` |
| **couple-quiz-staging** | Local + Preview Vercel | criar no Dashboard (ver abaixo) |

Mapa completo de ambientes: [`environments.md`](./environments.md).

## Producao — couple-quiz

URL: `https://rjlbqgdmbszstezxvghn.supabase.co`  
Regiao: `sa-east-1`  
Migration: `supabase/migrations/001_story_unlocks.sql`  
PIN admin: `07021995`

## Homologacao — couple-quiz-staging

Migration: `supabase/migrations/001_story_unlocks_staging.sql`  
PIN admin: **`staging123`**

Criacao e credenciais: ver secao staging em [`environments.md`](./environments.md).

## Variaveis na Vercel

Projeto **couple-quiz** (`snax10s-projects/couple-quiz`):

| Variavel | Production (`main`) | Preview (`develop`) |
|----------|---------------------|---------------------|
| `VITE_APP_ENV` | `production` | `staging` |
| `VITE_SUPABASE_URL` | URL prod | URL staging |
| `VITE_SUPABASE_ANON_KEY` | anon prod | anon staging |

Com URL + anon key, o app usa Supabase automaticamente. **Redeploy obrigatorio** apos salvar vars.

Opcional para dev sem Supabase: `VITE_UNLOCK_MODE=local`

## Local

Copie `.env.example` para `.env.local` e preencha credenciais **staging**.

## Admin

- URL: `/admin`
- PIN: definido no Supabase (`app_settings`) — prod vs staging em [`environments.md`](./environments.md)
- Alterar PIN (SQL Editor):

```sql
UPDATE app_settings
SET value = extensions.crypt('SEU_NOVO_PIN', extensions.gen_salt('bf'))
WHERE key = 'admin_pin_hash';
```

## Cronograma padrao (12/06/2026 BRT)

| Story | Horario |
|-------|---------|
| time | 00:00 |
| timeline | 08:00 |
| map | 11:00 |
| hearts | 14:00 |
| wheel | 17:00 |
| quiz | 20:00 |
