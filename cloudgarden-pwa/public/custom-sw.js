/**
 * Creation Date: February 26, 2020
 * Author: Logan McDonald
 * The push event listener to act as the service-worker.js in the development build and
 * to be appended to the created service-worker.js file in production build
 * Adapted from https://medium.com/@seladir/how-to-implement-web-push-notifications-in-your-node-react-app-9bed79b53f34
 */

self.addEventListener("push", event => {
  const data = event.data.json();

  console.log("New notification", data);

  const options = {
    body: data.body
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
