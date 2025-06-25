import Navbar from "../ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen md:flex-col flex-row md:overflow-hidden">
        <Navbar></Navbar>
        <div className="flex-grow md:overflow-y-auto">{children}</div>
      </div>
    );
  }