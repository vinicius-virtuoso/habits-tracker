import "./lib/dayjs";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { api } from "./lib/axios";

export function App() {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(async (serviceWorker) => {
      let subscription = await serviceWorker.pushManager.getSubscription();

      if (!subscription) {
        const publicKey = await api.get("/push/public_key");

        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey.data.publicKey,
        });
      }

      await api.post("/push/register", {
        subscription,
      });

      await api.post("/push/send", {
        subscription,
      });
    });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-bg_black">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}

export default App;
