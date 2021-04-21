import { precacheAndRoute } from 'workbox-precaching';
// Your other import statements go here.

precacheAndRoute(self.__WB_MANIFEST);
// Import Pushy Service Worker 1.0.7
importScripts('https://sdk.pushy.me/web/1.0.7/pushy-service-worker.js');