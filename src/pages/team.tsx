import { useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

import Loader from "~/components/Loader";
import Header from "~/components/Head";

import formatDate from "~/utils/formatDate";
import classNames from "~/utils/classNames";

const tabs = ["Grid", "Table"];

export default function Team() {
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data: usersData } = api.user.getAll.useQuery({ search: search });

  if (!usersData) return <Loader />;

  console.log(search);

  return (
    <>
      <Header title="Team" />
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
        <input
          type="text"
          className="mb-6 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {activeTab === "Grid" && (
          <ul role={"list"} className="flex flex-wrap justify-between gap-6">
            {usersData?.map((user) => (
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
        )}

        {activeTab === "Table" && (
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
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Detail</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {usersData.map((user) => (
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
                          {formatDate(usersData[0].createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(usersData[0].updatedAt)}
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
                            Detail<span className="sr-only">, {user.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
