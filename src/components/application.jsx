import useTasks from '../lib/use-tasks';
import { initialFilters } from '../features/filters';
import Filters from './filters';
import Tasks from './tasks';
import useFilters, { filterTasks } from '../lib/filter-tasks';
import { useMemo, useDeferredValue } from 'react';

const Application = () => {
  const [tasks] = useTasks();
  const [filters, setFilter] = useFilters(initialFilters);
  const deferredFilters = useDeferredValue(filters);

  const visibleTasks = useMemo(
    () => filterTasks(tasks, deferredFilters),
    [tasks, deferredFilters],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter(name, value);
  };

  return (
    <main>
      {deferredFilters !== filters && <p>Loading...</p>}
      <Filters filters={filters} onChange={handleChange} />
      <Tasks tasks={visibleTasks} />
    </main>
  );
};

export default Application;
