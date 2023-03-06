import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

export default function Team() {
  const { data: usersData } = api.user.getAll.useQuery();

  return (
    <section>
      <ul role={"list"} className="flex gap-6">
        {usersData?.map((user) => (
          <li key={user.id}>
            <Link href={`/team/${user.id}`}>
              <figure className="rounded-2xl border p-5 transition-shadow hover:shadow-md">
                <Image
                  src={user?.image ?? ""}
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
    </section>
  );
}
