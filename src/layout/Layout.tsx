import { Nav } from "organisms";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="dark">
      <div className="min-w-full min-h-screen dark:bg-zinc-900 flex flex-col">
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
