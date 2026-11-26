const BASE=new URL('./',self.location.href);
const PREFIX='townmate-web-'+encodeURIComponent(BASE.pathname)+'-';
const CACHE=PREFIX+'c5a3d9de40ba';
const ASSETS=["assets/CafeInterior-AbxTQ4P6.js","assets/CoffeeRoom-94OqakWI.js","assets/TownScene-JUPH7GRR.js","assets/index-BjZTWvro.js","assets/index-DRqEpmE1.css","assets/supabase-CdKrgs0J.js","assets/three-DbrxjyXE.js","assets/web-CYKrcbWS.js","assets/web-CvwnqFhu.js","data/wukang-map.json","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","index.html","manifest.webmanifest"].map(file=>new URL(file,BASE).pathname);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(BASE.pathname+'index.html')).then(cached=>cached||fetch(event.request)));
  }else if(ASSETS.includes(url.pathname)){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(url.pathname)).then(cached=>cached||fetch(event.request)));
  }
});
