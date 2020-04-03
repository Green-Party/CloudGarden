/**
 * Creation Date: February 26, 2020
 * Author: Logan McDonald
 * Code for subscribing to notifications
 * Adapted from https://medium.com/@seladir/how-to-implement-web-push-notifications-in-your-node-react-app-9bed79b53f34
 */

const convertedVapidKey = urlBase64ToUint8Array(
  process.env.REACT_APP_PUBLIC_VAPID_KEY
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    // eslint-disable-next-line
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function sendSubscription(subscription) {
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {
    method: "POST",

    body: JSON.stringify(subscription),

    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function subscribeUser() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");

          return;
        }

        registration.pushManager.getSubscription().then(existedSubscription => {
          if (existedSubscription === null) {
            console.log("No subscription detected, make a request.");

            registration.pushManager
              .subscribe({
                applicationServerKey: convertedVapidKey,

                userVisibleOnly: true
              })
              .then(newSubscription => {
                console.log("New subscription added.");

                sendSubscription(newSubscription);
              })
              .catch(e => {
                if (Notification.permission !== "granted") {
                  console.log("Permission was not granted.");
                } else {
                  console.error(
                    "An error ocurred during the subscription process.",
                    e
                  );
                }
              });
          } else {
            console.log("Existed subscription detected.");

            sendSubscription(existedSubscription);
          }
        });
      })

      .catch(e => {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}
