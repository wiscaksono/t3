import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <>
      <Sidebar />
      <main className="flex flex-1 flex-col lg:pl-64">
        <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {/* <div className="px-4 sm:px-6 lg:px-0"> */}
          {/*   <h1 className="text-2xl font-semibold text-gray-900">DASHBOARD</h1> */}
          {/* </div> */}
          {children}
        </div>
      </main>
    </>
  );
}
