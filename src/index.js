import { Windmill } from "@windmill/react-ui";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { register } from "register-service-worker";
import App from "./App";
import "./assets/css/tailwind.css";
import ThemedSuspense from "./components/ThemedSuspense";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.render(
  <AuthProvider>
    <SidebarProvider>
      <Suspense
        fallback={
          <ThemedSuspense className="min-h-screen my-auto dark:bg-gray-900" />
        }
      >
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </AuthProvider>,
  document.getElementById("root")
);

register(process.env.PUBLIC_URL + "service-worker.js", {
  ready(registration) {
    console.log("Service worker is active.");
  },
  registered(registration) {
    console.log("Service worker has been registered.");
  },
  cached(registration) {
    console.log("Content has been cached for offline use.");
  },
  updatefound(registration) {
    console.log("New content is downloading.");
  },
  updated(registration) {
    console.log("New content is available; please refresh.");
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) {
        return;
      }
      this.refreshing = true;
      window.location.reload();
    });
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
