import PropTypes from 'prop-types';
import Nav from "./nav/nav"
import styles from "./profile.module.css"

const Profile =  ({children}) => {
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

Profile.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node
    ]).isRequired,

}