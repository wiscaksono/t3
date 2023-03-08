import Sidebar from "./Sidebar";
import Header from "./Head";
import Loader from "./Loader";

export default function Layout({ children, title, data }: any) {
  return (
    <>
      <Header title={title} />
      <Sidebar />
      <main className="flex flex-1 flex-col lg:pl-64">
        <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {data ? children : <Loader />}
        </div>
      </main>
    </>
  );
}
