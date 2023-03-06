import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // getByCreated: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.user.groupBy({
  //     by: ["createdAt"],
  //     _count: {
  //       createdAt: true,
  //     },
  //   });
  // }),

  getAll: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: input.search,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          image: `https://plchldr.co/i/150x150?text=${input.name}`,
          email: input.email,
        },
      });
    }),
});
