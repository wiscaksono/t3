import { useState, Fragment, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/router";
import { Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import Layout from "~/components/Layout";

import classNames from "~/utils/classNames";
import formatDate from "~/utils/formatDate";
import { api, type RouterOutputs } from "~/utils/api";
import { STATUS } from "~/utils/data";

const tabs = ["Details", "Raw Data"];

type ReportProps = RouterOutputs["report"]["create"];
type userProps = RouterOutputs["user"]["getAll"][0];

interface ReportUserProps extends ReportProps {
  user: userProps;
}

const Post = () => {
  const [values, setValues] = useState<ReportUserProps>();
  const { query } = useRouter();
  const { data: reportData } = api.report.getById.useQuery(String(query.id), {
    onSuccess: (data) => setValues(data),
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Layout title={"oakdoaskd"} data={reportData || values}>
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

        <section className="py-6">
          {activeTab === "Details" && (
            <Details
              reportData={reportData}
              values={values}
              setValues={setValues}
            />
          )}
          {activeTab === "Raw Data" && <RawData reportData={reportData} />}
        </section>
      </section>
    </Layout>
  );
};

export default Post;

const Details = ({
  reportData,
  values,
  setValues,
}: {
  reportData: ReportUserProps;
  values: ReportUserProps;
  setValues: Dispatch<SetStateAction<ReportUserProps | undefined>>;
}) => {
  const [status, setStatus] = useState("PENDING");

  const update = api.report.update.useMutation({});

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update.mutate({
      id: reportData.id,
      description: values.description,
    });
  };

  return (
    <div>
      <form
        className="space-y-5 rounded-2xl border p-5"
        onSubmit={(e) => handleUpdate(e)}
      >
        <div className="flex gap-5">
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Report id
            </label>
            <div className="mt-2">
              <input
                disabled
                id="id"
                name="id"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                defaultValue={reportData.id}
              />
            </div>
          </div>

          <div className="flex w-1/2 items-center gap-5">
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
                  type="text"
                  autoComplete="createdAt"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                  defaultValue={formatDate(reportData.createdAt)}
                  disabled
                />
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="updatedAt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Updated at
              </label>
              <div className="mt-2">
                <input
                  id="updatedAt"
                  name="updatedAt"
                  type="text"
                  autoComplete="updatedAt"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                  defaultValue={formatDate(reportData.createdAt)}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
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
                autoComplete="location"
                disabled
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                defaultValue={reportData.location}
                onChange={(e) =>
                  setValues({ ...reportData, location: e.target.value })
                }
              />
            </div>
          </div>

          <div className="w-1/2">
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>

            <Listbox value={status} onChange={setStatus}>
              <div className="relative mt-2">
                <Listbox.Button className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate text-left">{status}</span>
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
                    {STATUS.map((status, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                            ? "bg-indigo-100 text-indigo-900"
                            : "text-gray-900"
                          }`
                        }
                        value={status}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {status}
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

        <div className="flex flex-1 items-center gap-5">
          <div className="w-1/2">
            <label
              htmlFor="reporter"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Reporter
            </label>
            <div className="mt-2">
              <input
                id="reporter"
                name="reporter"
                type="text"
                autoComplete="reporter"
                disabled
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                defaultValue={reportData.user.name}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="reporter-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Reporter Email
            </label>
            <div className="mt-2">
              <input
                id="reporter-email"
                name="reporter-email"
                type="text"
                autoComplete="reporter-email"
                disabled
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 sm:text-sm sm:leading-6"
                defaultValue={reportData.user.email}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              name="description"
              id=""
              cols={30}
              rows={10}
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={reportData.description}
              onChange={(e) =>
                setValues({ ...reportData, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            className="w-max rounded-md bg-gray-300 py-2 px-3 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      </form>
    </div>
  );
};

const RawData = ({ reportData }: { reportData: ReportUserProps }) => {
  return (
    <section className="overflow-x-auto rounded-2xl border p-5">
      <pre className="text-gray-600">{JSON.stringify(reportData, null, 2)}</pre>
    </section>
  );
};
