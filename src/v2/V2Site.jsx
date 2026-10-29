import { useEffect } from "react";
import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";
import {
  PortfolioPage,
  MethodPage,
  CraftPage,
  ContactPage,
  NotFoundPage,
} from "./OtherPages";
import { Header } from "./Shared";
import "./V2Site.css";
import "./InnerPages.css";
import CeveroFooter from "./CeveroFooter";
import "./Cevero.css";
import { pageTitles } from "./pageTitles";
export default function V2Site({ pathname }) {
  const path = (pathname || "/").replace(/\/+$/, "") || "/";
  const routes = {
    "/": HomePage,
    "/services": ServicesPage,
    "/portfolio": PortfolioPage,
    "/methodology": MethodPage,
    "/savoir-faire": CraftPage,
    "/contact": ContactPage,
  };
  const Page = routes[path] || NotFoundPage;
  useEffect(() => {
    document.title = `${pageTitles[path] || "Page introuvable"} | MultiShift Studio`;
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash)?.scrollIntoView({ block: "start" }),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [path]);
  return (
    <div
      className={`v2-site cv-site ${path === "/" ? "v2-is-home" : "v2-is-interior"}`}
      id="top"
    >
      <a className="v2-skip" href="#v2-main">
        Aller au contenu
      </a>
      <Header path={path} dark={false} />
      <main id="v2-main">
        <Page />
      </main>
      <CeveroFooter path={path} />
    </div>
  );
}
