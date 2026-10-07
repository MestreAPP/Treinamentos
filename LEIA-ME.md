# Mestre - Treinamento · pacote para publicação em nuvem

Treinamentos de **Área Fiscal**, **Departamento Pessoal** e **Contabilidade** em um site estático:
não precisa de servidor, banco de dados nem instalação. Basta enviar os arquivos desta pasta
para qualquer serviço de hospedagem de sites estáticos com HTTPS.

## Conteúdo da pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O aplicativo completo (conteúdo, provas, certificados, calculadoras) |
| `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png` | Permitem instalar como aplicativo no celular e no computador |
| `sw.js` | Funcionamento offline e atualização automática de versões |
| `netlify.toml` | Configuração para Netlify |
| `vercel.json` | Configuração para Vercel |
| `staticwebapp.config.json` | Configuração para Azure Static Web Apps |
| `.nojekyll` | Necessário para GitHub Pages |
| `robots.txt` | Impede que buscadores indexem o treinamento |

Envie **todos** os arquivos juntos, na raiz do site. Os arquivos de configuração dos outros
provedores são ignorados, não atrapalham.

## Opção 1 — Netlify (mais simples, sem programação)
1. Crie uma conta gratuita em netlify.com.
2. Em **Sites › Add new site › Deploy manually**, arraste a pasta inteira (ou o arquivo .zip descompactado).
3. Em poucos segundos o site fica disponível em um endereço `https://...netlify.app`.
4. Opcional: em **Domain management**, configure um domínio próprio (ex.: `treinamento.suaempresa.com.br`).
5. Para atualizar, arraste a nova pasta em **Deploys**.

## Opção 2 — Vercel
1. Crie uma conta em vercel.com e instale o Vercel CLI (`npm i -g vercel`), ou importe um repositório do GitHub.
2. Na pasta, execute `vercel --prod` e siga as perguntas.

## Opção 3 — GitHub Pages
1. Crie um repositório (pode ser privado em planos pagos) e envie os arquivos para a branch `main`.
2. Em **Settings › Pages**, escolha *Deploy from a branch* › `main` › `/ (root)`.
3. O site fica em `https://usuario.github.io/repositorio/`.

## Opção 4 — Azure Static Web Apps
1. No portal Azure, crie um recurso **Static Web App** (plano Free).
2. Escolha *Other* como origem e publique a pasta com a extensão do VS Code ou com o
   `swa deploy ./ --env production` (Static Web Apps CLI).

## Opção 5 — AWS S3 + CloudFront
1. Crie um bucket S3 e envie os arquivos.
2. Crie uma distribuição CloudFront apontando para o bucket (com HTTPS) e defina `index.html`
   como objeto raiz.
3. Configure `Cache-Control: no-cache` para `index.html` e `sw.js`.

## Opção 6 — Google Cloud Storage, Firebase Hosting ou servidor próprio
Qualquer hospedagem de arquivos estáticos com HTTPS funciona (Firebase: `firebase init hosting`
e `firebase deploy`; IIS/Apache/Nginx: copie os arquivos para a pasta pública do site).

## Importante: onde ficam os dados dos usuários

- Usuários, progresso, provas, anotações e certificados são salvos **no navegador de cada pessoa**
  (armazenamento local). Não há um banco de dados central.
- Por isso, cada colaborador deve usar sempre o mesmo navegador e computador, ou levar seus dados
  pelo menu **Configurações › Dados e backup** (exportar e importar).
- O **administrador** só vê os usuários cadastrados no navegador dele. Para acompanhar uma turma,
  peça aos alunos que exportem o backup e importe-os no navegador do administrador, ou use um único
  computador de treinamento.
- Limpar os dados do navegador apaga o progresso. Recomende backups periódicos.
- Para ter cadastro e acompanhamento centralizados de todos os usuários, é preciso adicionar um
  back-end (por exemplo Firebase/Firestore, Supabase ou uma API da empresa). Leve este ponto à equipe de TI.

## Segurança
- Use sempre HTTPS (todos os provedores acima oferecem gratuitamente).
- As senhas são guardadas com hash (SHA-256 com salt), mas ficam no próprio navegador: o controle
  de acesso serve para organizar o treinamento, não para proteger informações sensíveis.
- O `robots.txt` e o cabeçalho `X-Robots-Tag` evitam indexação em buscadores. Para restringir o acesso
  apenas a funcionários, use a proteção por senha do provedor (Netlify/Vercel em planos pagos),
  Azure com autenticação, Cloudflare Access ou a rede interna da empresa.

## Atualizações
Ao publicar uma nova versão do `index.html`, os usuários recebem a atualização automaticamente na
próxima vez que abrirem o site com internet. Se quiser forçar a renovação do modo offline, altere o
nome do cache em `sw.js` (`mestre-v1` → `mestre-v2`).

## Teste local antes de publicar
Na pasta, execute `npx serve .` (ou `python -m http.server 8080`) e abra `http://localhost:8080`.
Abrir o `index.html` direto com duplo clique também funciona, mas sem o modo offline.
