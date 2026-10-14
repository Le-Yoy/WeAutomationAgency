// IndexNow: tells Bing (and Yandex, Seznam…) about every URL in the live sitemap.
// ChatGPT search leans on Bing, so this speeds up AI visibility too.
// Usage after a deploy: `npm run indexnow` (submits all sitemap URLs).
const HOST = 'weautomationagency.com';
const KEY = '83e88923d901477f81f1311a195f83d7'; // must match public/<KEY>.txt

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status}`);
