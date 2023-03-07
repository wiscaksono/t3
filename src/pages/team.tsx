import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

import Loader from "~/components/Loader";
import Layout from "~/components/Layout";

import formatDate from "~/utils/formatDate";
import classNames from "~/utils/classNames";
import { api } from "~/utils/api";

const tabs = ["Grid", "Table"];

export default function Team() {
  const [search, setSearch] = useState<string>("");
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: usersData, refetch: refetchUser } = api.user.getAll.useQuery({
    search: search,
  });

  if (!usersData) return <Loader />;

  return (
    <Layout title="Team">
      <section>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option onClick={() => setActiveTab(tab)} key={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>
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

        <section className="py-6">
          <div className="mb-6 flex flex-1 items-center gap-6">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="w-max rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setCreateModal(true)}
            >
              Create
            </button>
          </div>
          {activeTab === "Grid" && <Grid usersData={usersData} />}
          {activeTab === "Table" && <Table usersData={usersData} />}
        </section>
      </section>
      <CreateModal
        createModal={createModal}
        setCreateModal={setCreateModal}
        refetchUser={refetchUser}
      />
    </Layout>
  );
}

const Grid = ({ usersData }: any) => {
  return (
    <ul role={"list"} className="flex flex-wrap justify-between gap-6">
      {usersData?.map((user: any) => (
        <li key={user.id}>
          <Link href={`/team/${user.id}`}>
            <figure className="rounded-2xl border p-5 transition-shadow hover:shadow-md">
              <Image
                src={
                  user?.image ??
                  `https://plchldr.co/i/150x150?text=${user.name}`
                }
                alt={user?.name ?? ""}
                width={150}
                height={150}
                className="rounded-2xl"
              />
              <h3 className="mt-3 text-center text-base font-semibold leading-7 tracking-tight text-gray-900">
                {user.name}
              </h3>
            </figure>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Table = ({ usersData }: any) => {
  return (
    <div className="flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Updated at
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {usersData.map((user: any) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          className="rounded-full"
                          src={String(user.image)}
                          alt={String(user.name)}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(usersData[0]?.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(usersData[0]?.updatedAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="text-gray-900">{"title"}</div>
                    <div className="text-gray-500">{"hehe"}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href={`/team/${user.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Detail
                      <span className="sr-only">, {user.name}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

type valueProps = {
  name: string;
  email: string;
  password: string;
};

const CreateModal = ({ createModal, setCreateModal, refetchUser }: any) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<valueProps>({
    name: "",
    email: "",
    password: "",
  });

  const createAcc = api.user.create.useMutation({
    onSuccess: () => {
      void refetchUser();
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    createAcc.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setCreateModal(false);
    setLoading(false);
  };

  return (
    <Transition.Root show={createModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setCreateModal}
        initialFocus={cancelButtonRef}
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
                <div className="bg-white ">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="px-6 pt-6 text-base font-semibold leading-6 text-gray-900"
                    >
                      Create account
                    </Dialog.Title>
                    <form className="mt-2 " onSubmit={(e) => handleCreate(e)}>
                      <div className="space-y-5 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
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
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  name: e.target.value,
                                })
                              }
                            />
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
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="password"
                              required
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          disabled={loading}
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setCreateModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
