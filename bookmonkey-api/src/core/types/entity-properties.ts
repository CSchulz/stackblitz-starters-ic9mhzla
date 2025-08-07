/*
 * Extracts public properties from a class.
 * With this helper, you are able to provide property values during class initialization.
 * Often a list of parameters is used for that.
 * This can lead to failures if parameters are passed in a wrong order.
 *
 * @Example
 * ```ts
 * // customer.entity.ts
 *
 * // What happens if you mistakenly pass orderId as first property?
 * constructor(id: string, orderId: string) {}
 * ```
 *
 * vs.
 *
 * ```ts
 * // customer.entity.ts
 *
 * // Passing the entities' properties as Record is more safe to use.
 * // Mistakes can be spotted more easily.
 * constructor(props: EntityProperties<CustomerEntity>) {}
 */
export type EntityProperties<TClass> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [TProperty in keyof TClass as TClass[TProperty] extends Function
    ? never
    : TProperty]: TClass[TProperty];
};
