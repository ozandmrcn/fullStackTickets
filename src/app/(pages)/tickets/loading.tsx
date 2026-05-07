/**
 * @file loading.tsx  (/tickets)
 * @description Fallback UI shown by the <Suspense> boundary in the tickets page
 *              while `TicketsGrid` is fetching data from the database.
 *              Replace the simple text with a skeleton loader for a better UX.
 */

/**
 * Loading
 *
 * Minimal placeholder rendered during data fetching.
 * Intended to be used as the `fallback` prop of a `<Suspense>` wrapper.
 */
const Loading = () => {
  return <div>Loading</div>;
};

export default Loading;
