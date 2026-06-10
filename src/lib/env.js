export const appEnv = import.meta.env.VITE_APP_ENV ?? 'local'

export const isStaging = appEnv === 'staging'
export const isProduction = appEnv === 'production'
export const isLocal = appEnv === 'local'

const ENV_LABELS = {
  local: 'Local',
  staging: 'Homologação',
  production: 'Produção',
}

export const envLabel = ENV_LABELS[appEnv] ?? appEnv

export const envBadgeClass =
  appEnv === 'production'
    ? 'env-badge env-badge-prod'
    : appEnv === 'staging'
      ? 'env-badge env-badge-staging'
      : 'env-badge env-badge-local'
