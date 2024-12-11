"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavLink.module.css";

export default function Navlink({href, children}) {
    const path = usePathname();
    return (
        <Link href= {href} className= {path ===href? `${styles.active} ${styles.link}`: styles.link}>{children}</Link>
    )

}