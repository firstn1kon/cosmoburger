import Nav from "./nav/nav"
import { FC } from "react"
import styles from "./profile.module.css"

interface IProfile {
    children: React.ReactNode
}

const Profile: FC<IProfile> = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Nav/>
                {children}
            </div>
        </div>

    )
}

export default Profile

