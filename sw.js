/* Mestre - Treinamento · service worker (versão com banco de dados)
   Arquivos do site: rede primeiro, cópia local sem internet.
   Biblioteca do Supabase e fontes: cópia local primeiro.
   Chamadas ao banco de dados (supabase.co) nunca são guardadas em cache. */
const CACHE='mestre-db-v1';
const ASSETS=['./','index.html','config.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    e.respondWith(fetch(req).then(r=>{const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); return r;}).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
  } else if(/fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{const cp=res.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); return res;})));
  }
});
