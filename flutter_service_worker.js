'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "9c2e250929e02134e8172a17952e1b0e",
"version.json": "1dc15bf2a142b2032e160383b9aa8740",
"index.html": "0d9ea096d60cb198df302fb2b5c334cc",
"/": "0d9ea096d60cb198df302fb2b5c334cc",
"main.dart.js": "9d91c9c5420ef1659ce3ded596c68748",
"404.html": "08036fb0dd526db709cf02a63e5ef49f",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"assets/AssetManifest.json": "9d1ab9a2c8d615596149dd4bbbf15c8e",
"assets/NOTICES": "5ac60e4c03477faeac05ebae43a316b1",
"assets/FontManifest.json": "d656320b77e706300b34f485ef077838",
"assets/AssetManifest.bin.json": "0c32956509224d3d6fef9a05371f734f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "6049567a861669d4f47aa1453d77ed11",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/homepage_photo9.png": "85981e917e653a09204c26cd69b1a463",
"assets/assets/homepage_photo8.png": "17fba23d104aacea5e08df5bfdf0c181",
"assets/assets/membership.gif": "9d51cac9d735188156cbd664941fdc00",
"assets/assets/joinTEMP.png": "3a42c4bbf2d09fc89ec9b44ccafa93fa",
"assets/assets/massage3.png": "c8e65cdece3e80c80e701ffb0d359fd3",
"assets/assets/massage2.png": "d4a234eabdee707712ec80a8596e2738",
"assets/assets/homepage.gif": "3b6624069873b14ed78d6b47f1f5488b",
"assets/assets/massage1.png": "b14039a8e8f7c5a84e5f1eaad65bec82",
"assets/assets/infrared_sauna.png": "fd5b10d41bb312072ef98c11f07e4d69",
"assets/assets/massage5.png": "4e60bee244db4f0c566cff8f6c285a21",
"assets/assets/swaylogogreen.svg": "7f0b932c1a8c845c51a290593ac259fd",
"assets/assets/massage4.png": "49ddcf3f493b659fe23db33363bddd8a",
"assets/assets/background_image.png": "a6a784f1741f12c5760bbc7f86f03777",
"assets/assets/homepage_photo13.png": "001bd86ea8c513ad064382c58f6b9964",
"assets/assets/popupphoto.png": "e7c6edde2fa1b392d868f5e5e77b7af0",
"assets/assets/facial6.png": "7c6a7406d091933f6455b4fa431d1567",
"assets/assets/homepage_photo12.png": "eba97e745e042dac2b1a27a9714b2340",
"assets/assets/compression_therapy.png": "843a508a12d4a13e22978ae91ee17274",
"assets/assets/homepage_photo10.png": "a06336497a0395fe752c0ac4fc093252",
"assets/assets/facial4.png": "4dabb392fff299898621741b4be90517",
"assets/assets/facial5.png": "10dd30b76b6bb15aa748a0d58d9f8877",
"assets/assets/homepage_photo11.png": "c0f75e9a044b59f112a2d96cbf57f14e",
"assets/assets/background2.mov": "37cb4ea8a5f31a01a755c9ca0e55a801",
"assets/assets/homepage_photo15.png": "48eaa92545ab35a580d9edd7886806f5",
"assets/assets/cold_plunge.png": "ea96659da2307fccb0894413eeb3b2ba",
"assets/assets/facial1.png": "273d7c6f1fde31e182aaebab870dbc91",
"assets/assets/background.mp4": "cebb2dc0a0dd95423a95129525617f0b",
"assets/assets/homepage_photo14.png": "f37eb884ef9993dc8e0b3dcf1ba44275",
"assets/assets/facial2.png": "cdc16b0cd5f724ea3d0baab870146625",
"assets/assets/facial3.png": "03f8fbb23a0bf7f5c392186e16280350",
"assets/assets/led_light_therapy.png": "ac05957b12c1b00676c92a2e1a3e0dc1",
"assets/assets/swaylogo.png": "da33fe1ba983d0d2c64f90766520be31",
"assets/assets/homepage_photo1.png": "afee2d0e267ab43b57ba379699e9aad5",
"assets/assets/homepage_photo3.png": "190ce5d03670c2ec5353b2ab7c85fbae",
"assets/assets/offerbackground.png": "436531d22222084ecd8c28dd329b877c",
"assets/assets/homepage_photo2.png": "17fba23d104aacea5e08df5bfdf0c181",
"assets/assets/fonts/vance-bold.otf": "2581ec2c04145e474507dfda57bb6a48",
"assets/assets/fonts/vance-text.otf": "803d4c026bdefb79a3a75c4379be2063",
"assets/assets/fonts/vance-light.otf": "41ed23d9a7544b6218518c172a13f540",
"assets/assets/fonts/vance-regular.otf": "e7a18510e2b54cf35ca82725d63348ad",
"assets/assets/treatment3.png": "d4a234eabdee707712ec80a8596e2738",
"assets/assets/homepage_photo6.png": "ebe28b9c51b0c4259f479743865e6d74",
"assets/assets/homepage_photo7.png": "069ec07654c2d92b162d347743b76a1f",
"assets/assets/treatment2.png": "a8c3ec426387adc02f4cdddb598c23d1",
"assets/assets/join2.png": "933eab26762e0cb4d16e2e85e6ce06f7",
"assets/assets/homepage_photo5.png": "b14039a8e8f7c5a84e5f1eaad65bec82",
"assets/assets/background2.mp4": "b540a44df6bdda970d525fa261bd61b7",
"assets/assets/homepage_photo4.png": "ae02e7297ef4741ef6a504d4c7b35575",
"assets/assets/treatment1.png": "230d75693bbf0e83e1b193439184affb",
"assets/assets/background.mov": "8c2d10717137f926d880b1b4c36fb8de",
"assets/assets/join1.png": "9c12bdb8498dd1aa536e4bec16f6bd46",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
