export default function Card({
  title,
  subtitle,
  children,
  className = '',
  headerAction,
}) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="card-head flex items-center justify-between">
          <div>
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            {subtitle && (
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
