import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";

import "./styles.css";
import Logo from "../../Assets/logo.svg";
import api from "../../Sevices/api";

interface Item {
    id: number;
    title: string;
    image: string;
}

interface IBGEUF {
    sigla: string;
}

interface IBGECity {
    nome: string;
}

const CreatePoint = () => {
    //Items states
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    //Input data states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    });

    //Locations data states
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState("0");
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState("0");

    //Map States
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
        0,
        0,
    ]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    //User location effect
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    });

    //Get items effect
    useEffect(() => {
        api.get("items").then((response) => {
            setItems(response.data);
            console.log(response);
        });
    }, []);

    //IBGE data effects
    useEffect(() => {
        axios
            .get<IBGEUF[]>(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            )
            .then((response) => {
                const ufInitials = response.data.map((uf) => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === "0") {
            return;
        }
        axios
            .get<IBGECity[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )
            .then((response) => {
                const cityNames = response.data.map((city) => city.nome);
                setCities(cityNames);
            });
    }, [selectedUf]);

    //Location Input Functions
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    //Map Functions
    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    //Input functions
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    //Items functions
    function handleSelectItem(id: number) {
        const alreadySelec = selectedItems.findIndex((item) => item === id);
        if (alreadySelec >= 0) {
            const filteredItems = selectedItems.filter((item) => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items,
        };

        await api.post("points", data);

        setLoading(true);
        setTimeout(() => {
            history.push("/");
        }, 3000);
    }

    return (
        <div id="page-create-point">
            {loading ? (
                <div id="overlay">
                    <div id="message" className="fadeIn">
                        <CheckIcon id="icon" />
                        <h6>Ponto de coleta criado!</h6>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            <div className="content">
                <header>
                    <img src={Logo} alt="ecoletaLogo" />
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para home
                    </Link>
                </header>
                <form onSubmit={handleSubmit}>
                    <h1>
                        Cadastro do <br />
                        ponto de coleta
                    </h1>
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço no mapa</span>
                        </legend>

                        <Map
                            center={initialPosition}
                            zoom={13}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={selectedPosition} />
                        </Map>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select
                                    name="uf"
                                    id="uf"
                                    value={selectedUf}
                                    onChange={handleSelectUf}
                                >
                                    <option value="0">Selecione...</option>
                                    {ufs.map((uf) => (
                                        <option key={uf} value={uf}>
                                            {uf}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select
                                    name="city"
                                    id="city"
                                    value={selectedCity}
                                    onChange={handleSelectCity}
                                    required
                                >
                                    <option value="0">Selecione...</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Ítens de coleta</h2>
                            <span>Selecione um ou mais itens abaixo</span>
                        </legend>
                        <ul className="items-grid">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={
                                        selectedItems.includes(item.id)
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    <img src={item.image} alt="imgItem" />
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>
                    <button type="submit">Cadastrar ponto de coleta</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePoint;
