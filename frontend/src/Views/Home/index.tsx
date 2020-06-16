import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";
import Logo from "../../Assets/logo.svg";
import background from "../../Assets/home-background.svg";

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={Logo} alt="logoEcoleta" />
                </header>
                <div className="body">
                    <main>
                        <h1>Seu marketplace de coleta de resíduos.</h1>
                        <p>
                            Ajudamos pessoas a encontrarem pontos de coleta de
                            forma eficiente.
                        </p>
                        <Link to="/create-point">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastre um ponto de coleta</strong>
                        </Link>
                    </main>
                    <div>
                        <img src={background} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
