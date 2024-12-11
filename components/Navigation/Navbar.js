
import Link from "next/link";
import styles from './Navbar.module.css'
import Image from "next/image";
import logoImg from "@/app/assets/oea logo2.png"
import Navlink from "./NavLink";


export default function Navbar() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image src={logoImg} alt="Company Logo" priority />
                OEA GSV Dashboard
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Navlink href={'/'}>Home</Navlink>
                    </li>
                    <li>
                        <Navlink href={'/Hub'}>Hub</Navlink>
                    </li>
                    <li>
                        <Navlink href={'/summary'}>Summary</Navlink>
                    </li>
                   
                    <li>
                        <a href="www.google.com">API</a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}