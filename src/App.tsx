import { Layout } from "layout";
import { Auth, Home } from "organisms";
import { useUser } from "hooks";

export default function App() {
  const user = useUser();

  return <Layout>{!user ? <Auth /> : <Home user={user} />}</Layout>;
}
