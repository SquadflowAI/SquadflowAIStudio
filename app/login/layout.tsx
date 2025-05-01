export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen md:flex-col flex-row md:overflow-hidden">
        {/* <NavigationBar></NavigationBar> */}
        {/* <div className="w-full flex-none md:w-64">
          <SideNav />
        </div> */}
        <div className="flex-grow  md:overflow-y-auto">{children}</div>
      </div>
    );
  }