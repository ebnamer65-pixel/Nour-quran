const C='noor-quran-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(r.headers.has('range'))return; // الصوت يُترك للمتصفح
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{
    if(res.ok&&(u.origin===location.origin||u.host.includes('fonts.g'))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}
    return res}).catch(()=>caches.match('./index.html'))));
});
