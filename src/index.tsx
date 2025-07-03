import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./index.scss";
const { VITE_MOCK_RESULTS } = import.meta.env;

// Lazy load views
const MediaView = lazy(() => import("./views/media/MediaView"));
const MediaDetailView = lazy(() => import("./views/mediaDetail/MediaDetailView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MediaView />
      </Suspense>
    ),
  },
  {
    path: "/:media_type/:id?",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MediaDetailView />
      </Suspense>
    ),
  },
]);
async function enableMocking() {
  if (VITE_MOCK_RESULTS !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js", // Make sure this file exists in your public folder
      options: {
        // This is important: ensure the scope includes all paths
        scope: "/",
      },
    },
  });
  return;
}
const container = document.getElementById("root");
const root = createRoot(container!);
enableMocking().then(() => {
  root.render(<RouterProvider router={router} />);
});
