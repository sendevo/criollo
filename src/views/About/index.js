import { 
    Page, 
    Block, 
    BlockTitle,
    List,    
    ListItem,
    AccordionContent 
} from 'framework7-react';
import logoInta from '../../assets/logo_inta.png';
import { BackButton } from '../../components/Buttons';

const About = props => (
    <Page name="about">
        <BlockTitle>Acerca de CRIOLLO</BlockTitle>
        <Block>
            <List accordionList>
                <ListItem accordionItem title="Versión de la aplicación">
                    <AccordionContent>
                        <Block>
                            <center>
                                    <h3>CRIOLLO 4.0</h3>
                            </center>
                            <h3>Staff</h3>
                            <p><b>Autor:</b> Juan Pablo D'Amico</p>
                            <p><b>Desarrollo:</b> Matías J. Micheletto, Santiago J. Crocioni, Gabriel M. Eggly</p>
                        </Block>
                    </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Descripción de la app">
                    <AccordionContent>
                        <Block>
                            <p style={{textAlign: "justify"}}>Criollo....</p>
                        </Block>
                    </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Datos de contacto">
                    <AccordionContent>
                        <Block>
                            <p>
                                <img src={logoInta} width="25px" style={{verticalAlign:"middle"}} alt="logo INTA"/> INTA <a href="inta.gob.ar">inta.gob.ar</a>
                            </p>
                            <p>
                                <img src={logoInta} width="25px" style={{verticalAlign:"middle"}} alt="logo INTA"/> E.E.A. Hilario Ascasubi <a href="inta.gob.ar/ascasubi">inta.gob.ar/ascasubi</a>
                            </p>
                            <p>
                                E-mail: <a href="mailto:eeaascasubi.criollo@insta.gob.ar">eeaascasubi.criollo@inta.gob.ar</a>
                            </p>
                        </Block>
                    </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Fuente de información">
                    <AccordionContent>
                        <Block>
                        <p style={{textAlign:"justify"}}>Los criterios de bondad de las determinaciones fueron adaptados de diferentes publicaciones del
                                Instituto Nacional de Tecnología Agropecuaria. Ediciones, INTA.</p>
                        </Block>
                    </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Términos y condiciones">
                    <AccordionContent>
                        <Block>
                        <p><i>Aceptación de los términos y condiciones</i></p>
                            <p style={{textAlign:"justify"}}>Al acceder o utilizar los servicios de CRIOLLO, el usuario acepta los términos y condiciones establecidos a continuación.</p>
                            <p style={{textAlign:"justify"}}>Los textos, las imágenes y demás información que aparece en este sitio y su disposición,
                            pertenecen al Instituto Nacional de Tecnología Agropecuaria (INTA), salvo que se indique lo
                            contrario. La Estación Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA) autoriza a los
                            usuarios a realizar copias, impresiones y distribuir la información contenida en este sitio, sujeta a
                            las siguientes condiciones:</p>
                            <ul style={{listStyle: "inside", paddingLeft: "10px", textAlign: "justify"}}>
                                <li>El uso, impresión, y reproducción de la información disponible en este sitio deberá estar
                                sujeta a fines personales, no comerciales, salvo expresa autorización de la Estación
                                Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA). La modificación de dicha
                                información no está permitida, y es obligatorio para el usuario citar la fuente original en
                                todas las copias que efectúe.</li>
                                <li>Salvo expresa autorización de la Estación Experimental Agropecuaria Hilario Ascasubi
                                (CERBAS - INTA), el emblema y/o el logo del INTA no deberán ser removidos de ninguna
                                página o elemento gráfico propio en que figuren, ni podrán ser utilizados en páginas o
                                elementos gráficos ajenos. De igual manera, no deberán ser modificados, sin autorización,
                                ninguno de esos elementos.</li>
                                <li>No se deberán establecer enlaces cuyo resultado sea la exhibición de una página o imagen
                                de este sitio a menos de contar con la autorización correspondientes.</li>
                            </ul>
                            <p><i>Cambios en los términos y condiciones</i></p>
                            <p style={{textAlign:"justify"}}>La Estación Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA) se 
                                reserva los derechos de cambiar o suspender la totalidad o parte de los servicios prestados en cualquier 
                                momento, previa notificación. Si luego de notificados los cambios en los términos y condiciones, el usuario 
                                continúa utilizando dichos servicios, significa que acepta y está de acuerdo en los términos y condiciones modificados.</p>
                        </Block>
                    </AccordionContent>
                </ListItem>
                <ListItem accordionItem title="Responsabilidades">
                    <AccordionContent>
                        <Block>
                        <p style={{textAlign:"justify"}}>La Estación Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA) no será responsable de los
                                perjuicios que pudieran ocasionar el uso, o la imposibilidad de uso, de la información disponible en
                                este sitio. La Estación Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA) no será
                                responsable de ninguna decisión que el usuario tome luego de la ejecución de las utilidades de la
                                aplicación. Las opiniones, análisis y/o información contenidas en el sitio, son provistas a los
                                usuarios con el único fin de colaborar con los mismos a tomar sus propias decisiones y no pueden
                                ser consideradas como única información necesaria. De este modo, el usuario de dicha
                                información, entiende y acepta que, las decisiones que el mismo pudiere adoptar o dejar de
                                adoptar corren enteramente bajo su propio juicio y riesgo. La Estación Experimental Agropecuaria
                                Hilario Ascasubi (CERBAS - INTA) no efectúa ninguna aseveración o garantía en relación al
                                contenido del sitio, incluyendo permisos de comercialización, o garantía alguna sobre la exactitud,
                                adecuación o integridad de la información y los materiales, y no será responsable por errores u
                                omisiones en los mismos. Es responsabilidad del usuario verificar cualquier información detallada
                                en este sitio. Los enlaces hacia otras organizaciones que se hallen contenidos en estas páginas,
                                cumplen una función meramente informativa y La Estación Experimental Agropecuaria Hilario
                                Ascasubi (CERBAS - INTA) no asume, por consiguiente, responsabilidad alguna en cuanto a su
                                validez o contenido. La Estación Experimental Agropecuaria Hilario Ascasubi (CERBAS - INTA) no
                                asume responsabilidad alguna, con relación a los daños que pudieren sufrir los usuarios debido al
                                uso maligno o intrusivo de este servidor, especialmente en cuanto se refiere a la alteración,
                                agregado o falsificación de la información contenida en el mismo, o a la introducción de virus,
                                troyanos, etc., así como de un contenido gráfico ofensivo o ilegal. La Estación Experimental
                                Agropecuaria Hilario Ascasubi (CERBAS - INTA) no recaba, ni almacena ningún dato sensible de sus
                                usuarios y sólo accede a la información y configuración del dispositivo autorizados y/o habilitado
                                por el usuario.</p>
                        </Block>
                    </AccordionContent>
                </ListItem>
            </List>
            <BackButton {...props} gray/>
        </Block>
    </Page>
);

export default About;
