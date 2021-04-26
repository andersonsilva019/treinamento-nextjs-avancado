import { ReactNode } from "react";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import styles from './styles.module.scss'

type LayoutProps = {
  children: ReactNode
}

export function Layout({children}: LayoutProps){
  return(
    <div className={styles.wrapper}>
      <main >
        <Header/>
        {children}
      </main>
      <Player/>
    </div>
  )
}