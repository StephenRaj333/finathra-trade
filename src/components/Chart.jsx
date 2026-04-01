export default function Chart({ title, subtitle, height = 300, children }) {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="card-head">
          <h3 className="font-semibold text-lg">{title}</h3>
          {subtitle && (
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div
        className="card-body bg-secondary-50 dark:bg-dark-bg rounded flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        {children || (
          <span className="text-secondary-400 dark:text-secondary-600">
            Chart placeholder
          </span>
        )}
      </div>
    </div>
  );
}
