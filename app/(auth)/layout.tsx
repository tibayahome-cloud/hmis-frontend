import "../globals.css";

export const metadata = {
  title: "Login — Tiba HMIS",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card reveal">
        <div className="auth-logo">
          <svg
            width={44}
            height={44}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h2>Tiba HMIS</h2>
          <p className="text-muted">Hospital Management Information System</p>
        </div>
        {children}
      </div>
    </div>
  );
}
