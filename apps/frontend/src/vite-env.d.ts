/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_FRONTEND_URI: string
  readonly VITE_API_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
