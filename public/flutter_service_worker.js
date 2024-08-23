'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/adidas.png": "0b88b290e9addb726574f6cee78c9fe9",
"assets/adidas.webp": "0a14af6421cbcce4e874e9be26899f63",
"assets/AssetManifest.bin": "396e2c09c254b7b8549cbdf06f29b259",
"assets/AssetManifest.bin.json": "236337eba764f826fefb5270271881c9",
"assets/AssetManifest.json": "1637802943b592a67745c2825eb28151",
"assets/assets/adidas.png": "0b88b290e9addb726574f6cee78c9fe9",
"assets/assets/adidas.webp": "0a14af6421cbcce4e874e9be26899f63",
"assets/assets/bg.jpg": "cd028bb7f7323590692750f8c59f4251",
"assets/assets/Checkmark.png": "a1eef73aa7c62da4e1b9204b3d0a548b",
"assets/assets/gucci.png": "ba0c57b8ba0c7fb42e35e17cf66116c7",
"assets/assets/image.png": "c16c3eccd779954d598d82f7bb27983f",
"assets/assets/jordan.png": "34bf9bcf4cee4b1090317333bd37e18b",
"assets/assets/json/kids_shoes.json": "8f89dd9fe3ac4c64942ec6aed2f30a06",
"assets/assets/json/men_shoes.json": "6701f71789d0da1f5d9c78a5dd5587d6",
"assets/assets/json/men_shoes.json.txt": "d22468c5a886a8dc83a1c9ca67ef5bcb",
"assets/assets/json/men_shoes1111.json": "0b7499f821b1d5dd7da7fc7e4374ab6e",
"assets/assets/json/women_shoes.json": "f21a7b5e09057b99fcc5d48a3e13c54e",
"assets/assets/loader.gif": "74b84c61dc457547ce5c674e0ef82c19",
"assets/assets/logo.png": "7bbc5c35e6500f8313b580fdd46b90d1",
"assets/assets/nike.png": "8b5d6657896a7634f7c3875a32fc600e",
"assets/assets/No.png": "289689aa951d4d05f29724c057b39107",
"assets/assets/noimage.jpg": "a210d1794c8aeaf9762d5abde0ae360b",
"assets/assets/Pose23.png": "3586289eaee8e10ae846e43d32de6768",
"assets/assets/top_image.png": "d32ad114b46674e04199978e0ea4e1c5",
"assets/assets/usa.svg": "d900c14c1f6ba18791994694d67137b8",
"assets/assets/user.jpeg": "259099ac575067510a8bd1c7a03d6fd5",
"assets/bg.jpg": "cd028bb7f7323590692750f8c59f4251",
"assets/Checkmark.png": "a1eef73aa7c62da4e1b9204b3d0a548b",
"assets/FontManifest.json": "fcfb7db811cffe848da300252809b5b8",
"assets/fonts/MaterialIcons-Regular.otf": "c064825fb1729232c4007b2556d3d7e0",
"assets/gucci.png": "ba0c57b8ba0c7fb42e35e17cf66116c7",
"assets/image.png": "c16c3eccd779954d598d82f7bb27983f",
"assets/jordan.png": "34bf9bcf4cee4b1090317333bd37e18b",
"assets/loader.gif": "74b84c61dc457547ce5c674e0ef82c19",
"assets/logo.png": "7bbc5c35e6500f8313b580fdd46b90d1",
"assets/nike.png": "8b5d6657896a7634f7c3875a32fc600e",
"assets/No.png": "289689aa951d4d05f29724c057b39107",
"assets/noimage.jpg": "a210d1794c8aeaf9762d5abde0ae360b",
"assets/NOTICES": "b8721d15b0fa83e30600231d8ac99a2f",
"assets/packages/community_material_icon/fonts/materialdesignicons-webfont.ttf": "84c7bd136590da0a6ed2c21df180c354",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "17ee8e30dde24e349e70ffcdc0073fb0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "9017bf30276557ae3c4de0dee1b5563b",
"assets/Pose23.png": "3586289eaee8e10ae846e43d32de6768",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/top_image.png": "d32ad114b46674e04199978e0ea4e1c5",
"assets/usa.svg": "d900c14c1f6ba18791994694d67137b8",
"assets/user.jpeg": "259099ac575067510a8bd1c7a03d6fd5",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "9147e7df73f37c633505d1ca4c8bd91f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "96fa4749ad2b3ff467878d51ea25c79b",
"/": "96fa4749ad2b3ff467878d51ea25c79b",
"main.dart.js": "f9332ad85bdea396009c5e74450012a4",
"manifest.json": "34f4bd367f5bf7a13207a7014b03c385",
"version.json": "12481ed665e76f12267e9aff8cb08c2c"};
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
