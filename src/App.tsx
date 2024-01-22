import { RecoilRoot } from "recoil";
import Router from "./components/Router";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <RecoilRoot>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : (
        <Router />
      )}
    </RecoilRoot>
  );
}

export default App;
