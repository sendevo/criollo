import { Page, Link, PageContent, Block } from 'framework7-react';
import Footer from '../../components/Footer';
import paramsIcon from '../../assets/icons/parametros.png'
import controlIcon from '../../assets/icons/verificacion.png'
import suppliesIcon from '../../assets/icons/calculador.png';
import reportsIcon from '../../assets/icons/reportes.png';
import securityIcon from '../../assets/icons/seguridad.png';
import infoIcon from '../../assets/icons/info.png';
import logoCriollo from '../../assets/icons/iconocriollo.png';
import classes from '../style.module.css';


const Home = () => (
    <Page name="home" className={classes.HomePage}>
        <PageContent>
            <Block style={{textAlign: "center", marginBottom: "0px", marginTop:"20px"}}>
                <img className={classes.AppLogo}src={logoCriollo} alt="logo"/>
            </Block>
            <Block style={{textAlign: "center", marginTop:"5px"}}>
                <h2 className={classes.Title}>CRIOLLO</h2>                
            </Block>
            <Block className={classes.ButtonContainer}>
                <Link href="/params/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={paramsIcon} alt="params"/>
                    <p>Parámetros de <br/> aplicación</p>
                </Link>
                <Link href="/control/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={controlIcon} alt="control"/>
                    <p>Verificación de <br/> picos</p>
                </Link>
                <Link href="/supplies/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={suppliesIcon} alt="supplies"/>
                    <p>Calculador de mezclas</p>
                </Link>
                <Link href="/security/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={securityIcon} alt="security"/>
                    <p>Seguridad y prevención</p>
                </Link>
                <Link href="/reports/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={reportsIcon} alt="reports"/>
                    <p>Reportes</p>
                </Link>
                <Link href="/info/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={infoIcon} alt="info"/>
                    <p>Información y ayuda</p>
                </Link>
            </Block>
            <Footer />
        </PageContent>
    </Page>
);

export default Home;