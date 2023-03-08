import { useState, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getSession } from "next-auth/react";

import Layout from "~/components/Layout";

import classNames from "~/utils/classNames";
import { api } from "~/utils/api";
import ROLES from "~/utils/data";

const tabs = ["Details", "Raw Data"];

const Post = ({ role }: any) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { query } = useRouter();
  const { data: userData } = api.user.getById.useQuery(String(query.id));

  return (
    <Layout title={userData.name} data={userData}>
      <section>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={classNames(
                    tab === activeTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <h1 className="py-6 text-2xl font-semibold text-gray-900">
          {userData?.name}
        </h1>

        <section className="w-1/2">
          {activeTab === "Details" && (
            <Details userData={userData} userRole={role} />
          )}
          {activeTab === "Raw Data" && <RawData userData={userData} />}
        </section>
      </section>
    </Layout>
  );
};

export default Post;

const Details = ({ userData, userRole }: any) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [role, setRole] = useState("ADMIN");
  const cancelButtonRef = useRef(null);
  const { push, query } = useRouter();

  const handleDelete = api.user.delete.useMutation({
    onSuccess: () => {
      push("/team");
    },
  });

  return (
    <>
      <form className="space-y-5 rounded-2xl border p-5">
        <div className="flex gap-5">
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User id
            </label>
            <div className="mt-2">
              <input
                disabled
                id="id"
                name="id"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                defaultValue={userData?.id}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role
            </label>

            <Listbox value={role} onChange={setRole}>
              <div className="relative mt-2">
                <Listbox.Button className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate text-left">{role}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {ROLES.map((role, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                            ? "bg-indigo-100 text-indigo-900"
                            : "text-gray-900"
                          }`
                        }
                        value={role}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {role}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={String(userData?.name)}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-5">
            <div className="w-1/2">
              <label
                htmlFor="createdAt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Created at
              </label>
              <div className="mt-2">
                <input
                  id="createdAt"
                  name="createdAt"
                  type="date"
                  autoComplete="createdAt"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Updated at
              </label>
              <div className="mt-2">
                <input
                  id="updatedAt"
                  name="updatedAt"
                  type="date"
                  autoComplete="updatedAt"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={String(userData?.email)}
            />
          </div>
        </div>

        {userRole === "ADMIN" && (
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              className="w-max rounded-md bg-gray-300 py-2 px-3 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => void setDeleteModal(true)}
            >
              Delete
            </button>
            <button
              type="submit"
              className="w-max rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        )}
      </form>

      <Transition.Root show={deleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setDeleteModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to Delete your account? All of
                            your data will be permanently removed. This action
                            cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() =>
                        handleDelete.mutate({ id: String(query.id) })
                      }
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDeleteModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const RawData = ({ userData }: any) => {
  return (
    <section className="rounded-2xl border p-5">
      <pre className="text-gray-600">{JSON.stringify(userData, null, 2)}</pre>
    </section>
  );
};

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

  return {
    props: { session, role },
  };
}
