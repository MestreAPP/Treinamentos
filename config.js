/* =====================================================================
   Mestre - Treinamento · configuração do banco de dados (Supabase)
   Onde encontrar os dois valores (painel do Supabase, dentro do projeto):
   • Botão "Connect" no topo da tela  → Project URL e Publishable key
   • ou Project Settings › API Keys    → Publishable key (sb_publishable_...)
     e Project Settings › Data API     → Project URL (https://xxxx.supabase.co)
   Projetos antigos: aba "Legacy API Keys" › chave "anon" (começa com eyJ...)
   também funciona.
   A Publishable key pode ficar no site: o acesso é protegido pelas regras
   de segurança (RLS) criadas pelo supabase.sql.
   NUNCA use aqui a Secret key (sb_secret_...) nem a service_role.
   ===================================================================== */
window.MESTRE_CONFIG = {
  supabaseUrl: 'https://klvzejrcjwdfueqtfbhu.supabase.co',
  supabaseKey: 'sb_publishable_l46fZHFNaNGtIRRx18L7UA_FJpJi86K'
};
