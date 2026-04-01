export default function StatBox({ label, value, change, isPositive = true }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium">
          {label}
        </p>
        <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-50 mt-2">
          {value}
        </p>
        {change !== undefined && (
          <p
            className={`text-sm font-semibold mt-2 ${
              isPositive ? 'percentage-up' : 'percentage-down'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}%
          </p>
        )}
      </div>
    </div>
  );
}
