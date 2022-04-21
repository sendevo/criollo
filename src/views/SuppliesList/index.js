import { f7, Navbar, Page, Row, Col, Button, BlockTitle, List } from 'framework7-react';
import React, { useContext, useState } from 'react';
import { BackButton } from '../../components/Buttons';
import Input from '../../components/Input';
import SuppliesTable from '../../components/SuppliesTable';
import { ModelCtx } from '../../context';
import { formatNumber } from '../../utils';
import iconReport from '../../assets/icons/reportes.png';
import classes from './style.module.css';

const SuppliesList = props => {

    const model = useContext(ModelCtx);

    const [comments, setComments] = useState('');

    const addSuppliesToReport = () => {
        const {
            loadBalancingEnabled,
            supplies,
            lotName,
            lotCoordinates,
            workArea,
            workVolume,
            capacity
        } = model;
        model.addSuppliesToReport({
            loadsText,
            loadBalancingEnabled,
            pr: supplies.pr,
            lotName,
            lotCoordinates,
            workArea,
            workVolume,
            capacity,
            comments
        });
        f7.panel.open();
    };

    const loadsText = model.loadBalancingEnabled ? 
        model.supplies.Ncb+" carga(s) de " +Math.round(model.supplies.Vcb)+ " litros " 
        : 
        model.supplies.Ncc+" carga(s) completa(s)"+(model.supplies.Vf > 0 ? " y 1 fracción de carga de " +Math.round(model.supplies.Vf)+ " litros" : "");

    return (
        <Page>
            <Navbar title="Lista de insumos" style={{maxHeight:"40px", marginBottom:"0px"}} />
            <BlockTitle className={classes.SectionTitle}>Parámetros de Mezcla</BlockTitle>
            <Row>
                <table className={["data-table", classes.MainTable].join(' ')}>
                    <tr>
                        <td><b>Lote:</b></td>
                        <td>{model.lotName}</td>
                    </tr>
                    {
                        model.lotCoordinates && 
                        <tr>
                            <td><b>Ubicación:</b></td>
                            <td>{model.lotCoordinates.length > 0 ? "lat: "+model.lotCoordinates.join(', long:') : " - "}</td>
                        </tr>
                    }
                    <tr>
                        <td><b>Superficie:</b></td>
                        <td>{model.workArea} ha</td>
                    </tr>
                    <tr>
                        <td><b>Volumen de pulverización:</b></td>
                        <td>{formatNumber(model.workVolume)} l/ha</td>
                    </tr>
                    <tr>
                        <td><b>Capacidad del tanque:</b></td>
                        <td>{model.capacity} litros</td>
                    </tr>
                    <tr>
                        <td><b>Cantidad de cargas:</b></td>
                        <td>{loadsText}</td>
                    </tr>
                </table>
            </Row>

            <BlockTitle className={classes.SectionTitle}>Insumos</BlockTitle>
            <Row>
                <SuppliesTable supplies={model.supplies} loadBalancing={model.loadBalancingEnabled}/>
            </Row>

            <List form noHairlinesMd style={{marginBottom:"10px", marginTop: "10px"}}>    
                <Input
                    slot="list"
                    label="Observaciones"
                    name="comments"
                    type="textarea"
                    icon={iconReport}
                    value={comments}
                    onChange={e => setComments(e.target.value)}>
                </Input>
            </List>

            <Row style={{marginTop:"20px", marginBottom: "15px"}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button className="help-target-add-report" fill onClick={addSuppliesToReport} style={{textTransform:"none"}}>
                        Agregar a reporte
                    </Button>
                </Col>
                <Col width={20}></Col>
            </Row>

            <BackButton {...props} />

        </Page>
    );
};

export default SuppliesList;