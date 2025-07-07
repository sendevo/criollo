import logoInta from '../../assets/anclaje_logo_inta.png';
import logoMin from '../../assets/anclaje_logo_ministerio.png';
import logoSec from '../../assets/anclaje_logo_secretaria.png';

const styles = {
    logo: {
        margin: "0px",
        padding: "0px", 
        height: "40px"
    },

    bottomBox: {
        backgroundColor: "#2D6F94",
        height: "60px",
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px"
    }
};

const Footer = () => (
    <div style={styles.bottomBox}>
        <img src={logoInta} style={{...styles.logo, marginLeft: "5px"}} alt="inta"/>
        <img src={logoMin} style={styles.logo} alt="ministerio"/>
        <img src={logoSec} style={{...styles.logo, marginRight: "5px"}} alt="secretaria"/>
    </div>            
);

export default Footer;