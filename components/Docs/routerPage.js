import Introduce from './Introduce';
export function RouterPage({ query }) {
  return <div className="flex-1 bg-white">{query === 'introduce' && <Introduce />}</div>;
}
