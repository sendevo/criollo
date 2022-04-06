import { Page, Link, PageContent, Block } from 'framework7-react';
import control from '../../assets/icons/parametros_fert.png'
import supplies from '../../assets/icons/calculador.png';
import reports from '../../assets/icons/reportes.png';
import info from '../../assets/icons/info.png';
import logoInta from '../../assets/backgrounds/logoInta.png';
import logoMin from '../../assets/backgrounds/logomin.png';
import logo from '../../assets/icons/logo.png';
import classes from '../style.module.css';

const Home = () => (
    <Page name="home" className={classes.HomePage}>
        <PageContent>
            <Block style={{textAlign: "center", marginBottom: "0px"}}>
                <img className="app-logo" src={logo} height="120px" width="120px" alt="logo"/>
            </Block>
            <Block style={{textAlign: "center", marginTop:"10px"}}>
                <h2 className={classes.Title}>CRIOLLO</h2>                
            </Block>
            <Block className={classes.ButtonContainer}>
                <Link href="/control/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={control} alt="control"/>
                    <p>Parámetros de <br/> fertilización</p>
                </Link>
                <Link href="/supplies/" className={[classes.MenuButton]}>
                    <img className={classes.HomeIcon} src={supplies} alt="supplies"/>
                    <p>Calculador de insumos</p>
                </Link>
                <Link href="/reports/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={reports} alt="reports"/>
                    <p>Reportes</p>
                </Link>
                <Link href="/info/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={info} alt="info"/>
                    <p>Información y ayuda</p>
                </Link>
            </Block>
            <div className={classes.LogoFooter}>
                <img src={logoInta} height="80%" className={classes.LogoInta} alt="inta"/>
                <img src={logoMin} height="80%" className={classes.LogoMin} alt="ministerio"/>
            </div>            
        </PageContent>
    </Page>
);

export default Home;