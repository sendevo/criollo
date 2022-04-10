import { Navbar, Page, Block, Row, Col, Button } from 'framework7-react';
import { useContext } from 'react';
import { BackButton } from '../../components/Buttons';
import DataTable from '../../components/DataTable';
import { ModelCtx } from '../../context';
import { formatNumber } from '../../utils';
import moment from 'moment';
import { Capacitor } from '@capacitor/core';
//import PDFExport from '../../entities/PDF';
import classes from './style.module.css';
import Toast from '../../components/Toast';

const ReportDetails = props => {
    
    const model = useContext(ModelCtx);
    const report = model.getReport(props.id);

    console.log(report);

    const exportReport = share => {
        //PDFExport(report, share);
        Toast("info", "Funcionalidad aún no disponible", 2000, "center");
    };

    return (
        <Page>            
            <Navbar title={"Reporte de la labor"} style={{maxHeight:"40px", marginBottom:"0px"}}/>
            <Block className={classes.HeaderBlock}>
                <p><b>Nombre: </b>{report.name}</p>
                <p><b>Fecha y hora: </b>{moment(report.timestamp).format("DD/MM/YYYY - HH:mm")}</p>
            </Block>
            {
                report.completed.params &&
                <Block className={classes.SectionBlock}>
                    <h3>Parámetros de aplicación</h3>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>Capacidad del pico</tr>
                            <tr>
                                <td><b>Pico seleccionado:</b></td>
                                <td className={classes.DataCell}>{report.params.nozzleName ? report.params.nozzleName : <i>Otro pico</i>}</td>
                            </tr>                     
                            <tr>
                                <td><b>Caudal nominal:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.nominalFlow)} l/min</td>
                            </tr>
                            <tr>
                                <td><b>Presión nominal:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.nominalPressure)} bar</td>
                            </tr>
                            <tr></tr>
                            <tr>Parámetros de pulverización</tr>
                            <tr>
                                <td><b>Distancia entre picos:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.nozzleSeparation)} m</td>
                            </tr>
                            <tr>
                                <td><b>Velocidad de trabajo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workVelocity)} km/h</td>
                            </tr>
                            <tr>
                                <td><b>Presión de trabajo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workPressure)} bar</td>
                            </tr>
                            <tr>
                                <td><b>Volumen de aplicación:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workVolume)} l/ha</td>
                            </tr>
                        </tbody>
                    </table>
                </Block>
            }
            {
                report.completed.control &&
                <Block className={classes.SectionBlock}>
                    <h3>Verificación de picos</h3>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td><b>Caudal efectivo<br/>promedio:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.efAvg)} l/min</td>
                            </tr>
                            <tr>
                                <td><b>Volumen pulverizado<br/>efectivo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.effectiveSprayVolume)} l/ha</td>
                            </tr>
                            <tr>
                                <td><b>Volumen previsto:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.expectedSprayVolume)} l/ha</td>
                            </tr>
                            <tr>
                                <td><b>Diferencia:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.diff)} l/ha <br/>({formatNumber(report.control.diffp)} %)</td>
                            </tr>
                        </tbody>
                    </table>
                    <DataTable 
                        data={report.control.data} 
                        onDataChange={()=>{}} 
                        rowSelectDisabled={true}
                        evalCollected={()=>{}}/>
                </Block>
            }  
            {
                report.completed.supplies &&
                <Block className={classes.SectionBlock}>
                    <h3>Cálculo de mezcla</h3>
                    <div>Parámetros de mezcla</div>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td><b>Lote:</b></td>
                                <td className={classes.DataCell}>{report.supplies.fieldName}</td>
                            </tr>
                            <tr>
                                <td><b>Superficie:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.supplies.workArea)} ha</td>
                            </tr>
                            <tr>
                                <td><b>Capacidad del tanque:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.supplies.capacity)} litros</td>
                            </tr>
                            <tr>
                                <td><b>Cntidad de cargas:</b></td>
                                <td className={classes.DataCell}>{report.supplies.loadsText}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>Insumos</div>
                    <table className={["data-table", classes.SuppliesTable].join(' ')}>
                        <tr>
                            <th height="40" className="label-cell">Producto</th>
                            {!report.supplies.loadBalancingEnabled && <th className="label-cell"><div>Carga</div><div>completa</div></th>}
                            {!report.supplies.loadBalancingEnabled && <th className="label-cell"><div>Fracción</div><div>de carga</div></th>}
                            {report.supplies.loadBalancingEnabled && <th className="label-cell">Carga</th>}
                            <th className="label-cell"><div>Total</div><div>insumos</div></th>
                        </tr>
                        <tbody>
                        {
                            report.supplies.products?.map(prod => (
                                <tr key={prod.key}>
                                    <td>{prod.name}</td>
                                    {!report.supplies.loadBalancingEnabled && <td>{formatNumber(prod.cpp)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                    {!report.supplies.loadBalancingEnabled && <td>{formatNumber(prod.cfc)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                    {report.supplies.loadBalancingEnabled && <td>{formatNumber(prod.ceq)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                    <td>{formatNumber(prod.total)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </Block>
            }
            <Row style={{marginTop:10, marginBottom: 10}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button fill onClick={()=>exportReport(false)} style={{textTransform:"none"}}>Guardar como  PDF</Button>
                </Col>
                <Col width={20}></Col>
            </Row>

            {Capacitor.isNativePlatform() &&
                <Row>
                    <Col width={20}></Col>
                    <Col width={60}>
                        <Button fill color="teal" onClick={()=>exportReport(true)} style={{textTransform:"none"}}>Compartir</Button>
                    </Col>
                    <Col width={20}></Col>
                </Row>
            }
            
            <BackButton {...props}/>
            
        </Page>
    );
};

export default ReportDetails;