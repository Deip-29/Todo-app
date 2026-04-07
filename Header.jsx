import '../styles/Header.css'

function Header({ total, completed, pending }) {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">✦</div>
      </div>
      <h1 className="header__title">DoIt</h1>
      <p className="header__subtitle">Stay focused. Get things done.</p>

      <div className="header__stats">
        <span className="stat-pill stat-pill--total">
          <span className="stat-pill__dot" />
          {total} Total
        </span>
        <span className="stat-pill stat-pill--done">
          <span className="stat-pill__dot" />
          {completed} Done
        </span>
        <span className="stat-pill stat-pill--pending">
          <span className="stat-pill__dot" />
          {pending} Pending
        </span>
      </div>
    </header>
  )
}

export default Header
