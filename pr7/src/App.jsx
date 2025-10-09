import React, { useEffect, useState } from "react";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";

const navLinks = [
  { label: "Home", href: "#/" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [route, setRoute] = useState(() => (location.hash ? location.hash.slice(1) : "/"));

  useEffect(() => {
    function onHash() {
      setRoute(location.hash ? location.hash.slice(1) : "/");
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function renderContent() {
    if (route === "/" || route === "") {
      return (
        <div>
          <h1>Welcome to My Website</h1>
          <p>This is the main content of the webpage.</p>
        </div>
      );
    }
    if (route === "about") return <About />;
    if (route === "contact") return <Contact />;

    return (
      <section className="page">
        <h2>Not Found</h2>
        <p>The page "{route}" was not found.</p>
      </section>
    );
  }

  return (
    <div className="app-container">
      <button
        className="sidebar-toggle"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span className="menu-icon">&#9776;</span>
      </button>
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setSidebarOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className={sidebarOpen ? "shifted" : ""}>{renderContent()}</main>
    </div>
  );
}

export default App;
