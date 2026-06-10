# Supabase — couple-quiz (org Carlos)

Projeto dedicado: **couple-quiz**  
Ref: `rjlbqgdmbszstezxvghn`  
URL: `https://rjlbqgdmbszstezxvghn.supabase.co`  
Regiao: `sa-east-1`

> Nao usar projetos da org Integra.

## Variaveis na Vercel

Em **Project Settings → Environment Variables** do app couple-quiz:

| Variavel | Valor |
|----------|--------|
| `VITE_SUPABASE_URL` | `https://rjlbqgdmbszstezxvghn.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | anon key em Supabase → Settings → API |

Com URL + anon key, o app usa Supabase automaticamente. **Redeploy obrigatorio** apos salvar as vars (Vite embute env no build).

Opcional para dev local sem Supabase: `VITE_UNLOCK_MODE=local`

## Local

Copie `.env.example` para `.env.local` e preencha a anon key.

## Admin

- URL: `/admin`
- PIN: definido no Supabase (`app_settings`)
- Alterar PIN (SQL Editor):

```sql
UPDATE app_settings
SET value = crypt('SEU_NOVO_PIN', gen_salt('bf'))
WHERE key = 'admin_pin_hash';
```

## Cronograma padrao (12/06/2026 BRT)

| Story | Horario |
|-------|---------|
| time | 00:00 |
| timeline | 08:00 |
| map | 11:00 |
| hearts | 14:00 |
| puzzle | 15:30 |
| wheel | 17:00 |
| quiz | 20:00 |
