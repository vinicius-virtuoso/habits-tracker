self.addEventListener("push", (event) => {
  const body = event.data?.text() ?? "Testeeeeeeee";

  event.waitUntil(
    self.registration.showNotification("Habits", {
      body,
    })
  );
});
