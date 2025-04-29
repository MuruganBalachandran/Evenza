import { FaCalendar, FaFilter, FaList, FaTh, FaUser, FaSearch } from 'react-icons/fa';

interface HistoryHeaderProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  categories: string[];
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  role: 'all' | 'host' | 'attendee';
  category: string;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  view,
  setView,
  filters,
  setFilters,
  categories
}) => {
  return (
    <header className="history-header">
      <div className="header-main">
        <div className="header-content">
          <div className="header-title">
            <h1>Event History</h1>
            <p>Your complete event timeline</p>
          </div>
          <div className="header-actions">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search events..."
                className="search-input"
              />
            </div>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
              >
                <FaTh /> Grid
              </button>
              <button 
                className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
              >
                <FaList /> List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <FaCalendar />
          <input 
            type="date" 
            value={filters.startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setFilters({
              ...filters,
              startDate: e.target.value ? new Date(e.target.value) : null
            })}
          />
          <span>to</span>
          <input 
            type="date"
            value={filters.endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setFilters({
              ...filters,
              endDate: e.target.value ? new Date(e.target.value) : null
            })}
          />
        </div>

        <div className="filter-group">
          <FaUser />
          <select
            value={filters.role}
            onChange={(e) => setFilters({
              ...filters,
              role: e.target.value as 'all' | 'host' | 'attendee'
            })}
          >
            <option value="all">All Roles</option>
            <option value="host">Host</option>
            <option value="attendee">Attendee</option>
          </select>
        </div>

        <div className="filter-group">
          <FaFilter />
          <select
            value={filters.category}
            onChange={(e) => setFilters({
              ...filters,
              category: e.target.value
            })}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default HistoryHeader;
