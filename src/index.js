import 'core-js/stable';
import '@fortawesome/fontawesome-free/css/all.css';

import '@style/handwriting.scss';
import '@js/app';

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
