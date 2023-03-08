import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chartRouter = createTRPCRouter({
  reportData: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.report.groupBy({
      by: ["createdAt"],
      _count: {
        title: true,
      },
    });
  }),
});
