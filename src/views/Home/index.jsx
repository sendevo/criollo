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
        <PageContent className={classes.Content}>
            <svg
                className={classes.Wave}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none">
                <path
                    fill="#ffffff"
                    d="M0,100 C580,280 1000,0 1440,130 L1440,320 L0,320 Z"/>
            </svg>
            <div className={classes.BottomWhite}></div>
            <Block className={classes.TitleContainer}>
                <h2 className={classes.Title}>Criollo</h2>
                <img className={classes.AppLogo} src={logoCriollo} alt="logo"/>
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