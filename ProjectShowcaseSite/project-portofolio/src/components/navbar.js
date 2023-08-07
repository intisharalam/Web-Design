import styles from "../styles/navbar.module.scss";
import Image from "next/image";
import Logo from "/public/Logo-black-2.svg";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
    ["Home", "/"],
    ["Projects", "/projGallery"],
    ["About", "/#about"],
    ["Contact", "/#contact"],
];

function NavListItem({ arrItems = ["", ""] }) {
    const router = useRouter();

    return (
        arrItems.map((linkList) => (
            <li key={linkList[0]} className={router.pathname == linkList[1] ? styles.active : ""}>
                <Link href={linkList[1]}>
                    {linkList[0]}
                </Link>
            </li>
        ))
    );
}

export default function Navbar() {
    const [navActive, setNavActive] = useState(false);

    // Function to handle scrolling behavior
    const handleScroll = () => {
        const body = document.body;
        const html = document.documentElement;
        if (navActive) {
            window.scrollTo(0, 0);
            body.style.overflow = "hidden";
            html.style.overflow = "hidden";
        } else {
            body.style.overflow = "auto";
            html.style.overflow = "auto";

        }
    };

    // Add an event listener to handle scrolling when `navActive` changes
    useEffect(() => {
        handleScroll();
    }, [navActive]);

    return (
        <nav className={styles.nav}>
            <div className={styles.navTop}>
                <Link href="/" className={styles.siteName}>
                    <Image
                        className={styles.logoImg}
                        src={Logo}
                        width={78}
                        height={78}
                        alt="logo"
                    />
                </Link>

                <div onClick={() => setNavActive(!navActive)} className={`${styles.nav_menu_bar} ${navActive ? styles.nav_menu_bar_active : ""}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <ul onClick={() => setNavActive(false)} className={`${styles.nav_menu_list} ${navActive ? styles.nav_menu_list_active : ""}`}>
                <NavListItem arrItems={links} />
            </ul>
        </nav>
    );
}
