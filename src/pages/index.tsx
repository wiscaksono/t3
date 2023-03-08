import Layout from "~/components/Layout";
import { getSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Example() {
  const { data: reportChart } = api.chart.reportData.useQuery();

  const data = reportChart?.map((report) => ({
    name: report.createdAt.toISOString().slice(0, 10),
    count: report._count.title,
  }));

  let result = data?.reduce((acc, curr) => {
    let existing = acc.find((item) => item.name === curr.name);
    if (existing) {
      existing.count += curr.count;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <Layout title={"Dashboard"} data={[]}>
      <ResponsiveContainer width={500} height={500}>
        <LineChart data={result}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Layout>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };

  return {
    props: { session },
  };
}
