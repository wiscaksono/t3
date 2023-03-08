import { useState } from "react";
import { getSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function User() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    location: "",
  });

  const createReport = api.report.create.useMutation();

  const handleCreate = (e: any) => {
    e.preventDefault();
    createReport.mutate({
      title: values.title,
      description: values.description,
      location: values.location,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="mx-auto w-full max-w-xl space-y-5"
        onSubmit={(e) => handleCreate(e)}
      >
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setValues({ ...values, location: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <textarea
          name="description"
          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="description"
          cols={30}
          rows={10}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-max rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const role = session?.user.role;

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };

  // if (role === "ADMIN")
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };

  return {
    props: { session, role },
  };
}
