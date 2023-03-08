import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const reportRouter = createTRPCRouter({
  getByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.report.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.report.findMany({
      include: {
        user: true,
      },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.report.findUnique({
      where: {
        id: input,
      },
      include: {
        user: true,
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.report.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.report.create({
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          userId: ctx.session.user.id,
        },
      });
    }),
});
