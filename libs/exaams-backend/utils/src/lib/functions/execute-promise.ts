// Maybe type Maybe<T> = T | null;

export async function executePromise<T, E = Error>(
  fn: Promise<T>
): Promise<[T | null, E | null]> {
  // return fn
  //   .then<[T, null]>((response) => [response, null])
  //   .catch<[null, E]>((error) => [null, error]);
  try {
    const data = await fn;
    return [data, null];
  } catch (error) {
    return [null, error] as [null, E];
  }
}
