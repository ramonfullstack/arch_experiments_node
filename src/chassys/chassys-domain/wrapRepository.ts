import z from 'zod';
export const wrapRepository =
  <Dto extends z.ZodTypeAny>(dto: Dto) =>
  <Args extends unknown[]>(fn: (...args: Args) => Promise<unknown>) =>
  async (...args: Args): Promise<z.infer<Dto>[]> => {
    try {
      const result = await fn(...args);
      if (Array.isArray(result)) {
        return result.map((item) => dto.safeParse(item)).filter((item) => item.success);
      }
      // eslint-disable-next-line no-console
      console.log('Is not array:', result);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return [];
  };
