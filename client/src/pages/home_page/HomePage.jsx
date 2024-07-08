import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./homePage.css";

import LogoPatounes from "../../assets/logo/1patounes.png";
import LogoCicorne from "../../assets/logo/cicorne.png";
import { AuthentificationContext } from "../../use_context/authentification";

function HomePage() {
  const {auth} = useContext(AuthentificationContext)
  const navigate = useNavigate();

    if (auth !== null && auth !== false) {
      navigate("/page-recherche");
    }

  return (
    <div className="homePage">
      <header className="homePageHeader">
        <img
          className="homePageLogoCicorne"
          src={LogoCicorne}
          alt="Site logo representing a chimera of a stork and a unicorn"
        />
      </header>
      <div className="homeRightContainer">
        <main className="homePageMain">
          <section className="homePageSectionTitle">
            <img
              className="homePageLogoPatounes"
              src={LogoPatounes}
              alt="Empreinte d'annimal"
            />
            <h1 className="homePageTitle">Cretchom</h1>
          </section>
          <nav className="homePageNav">
            <ul className="homePageNavList">
              <li className="homePageNavItem">
                <Link className="homePageNavLink" to="/connexion">
                  Connexion
                </Link>
              </li>
              <li className="homePageNavItem">
                <Link className="homePageNavLink" to="/inscription">
                  Inscription
                </Link>
              </li>
              <li className="homePageNavItem">
                <Link className="homePageNavLink" to="/page-recherche">
                  Visiteur
                </Link>
              </li>
            </ul>
          </nav>
        </main>
        <footer className="homePageFooter">
          <p>© 2024 Cretchom. Tous droits réservés.</p>
          <NavLink to="/mentions-legales" className="navlink">mentions légales</NavLink>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
