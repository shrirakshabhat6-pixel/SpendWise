
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>SpendWise</h2>

      <div className="nav-links">
        <Link href="/">Dashboard</Link>
        <Link href="/expenses">Expenses</Link>
      </div>
    </nav>
  );
}
