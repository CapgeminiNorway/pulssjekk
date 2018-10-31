console.log("Service Worker Loaded...");
self.addEventListener("push", e => {
  console.log("Push Recieved...");
  self.registration.showNotification("test", {
    body: "Notified by Pulssjekk!"
  });
});
