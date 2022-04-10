import { f7, Navbar, Page, Row, Col, Button, BlockTitle} from 'framework7-react';
import React, { useContext } from 'react';
import { BackButton } from '../../components/Buttons';
import { ModelCtx } from '../../context';
import { formatNumber } from '../../utils';
import classes from './style.module.css';

const SuppliesList = props => {

    const model = useContext(ModelCtx);

    const addSuppliesToReport = () => {
        const {
            loadBalancingEnabled,
            supplies,
            fieldName,
            workArea,
            workVolume,
            capacity
        } = model;
        model.addSuppliesToReport({
            loadsText,
            loadBalancingEnabled,
            products: supplies.pr,
            fieldName,
            workArea,
            workVolume,
            capacity
        });
        f7.panel.open();
    };

    const loadsText = model.loadBalancingEnabled ? 
        model.supplies.Ncb+" carga(s) de " +formatNumber(model.supplies.Vcb)+ " litros " 
        : 
        model.supplies.Ncc+" carga(s) completa(s)"+(model.supplies.Vf > 0 ? " y 1 fracción de carga de " +formatNumber(model.supplies.Vf)+ " litros" : "");

    return (
        <Page>
            <Navbar title="Lista de insumos" style={{maxHeight:"40px", marginBottom:"0px"}} />
            <BlockTitle className={classes.SectionTitle}>Parámetros de Mezcla</BlockTitle>
            <Row>
                <table className={["data-table", classes.MainTable].join(' ')}>
                    <tr>
                        <td><b>Lote:</b></td>
                        <td>{model.fieldName}</td>
                    </tr>
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
                <table className={["data-table", classes.SuppliesTable].join(' ')}>
                    <tr>
                        <th height="40" className="label-cell">Producto</th>
                        {!model.loadBalancingEnabled && <th className="label-cell"><div>Carga</div><div>completa</div></th>}
                        {!model.loadBalancingEnabled && <th className="label-cell"><div>Fracción</div><div>de carga</div></th>}
                        {model.loadBalancingEnabled && <th className="label-cell">Carga</th>}
                        <th className="label-cell"><div>Total</div><div>insumos</div></th>
                    </tr>
                    <tbody>
                    {
                        model.supplies?.pr?.map(prod => (
                            <tr key={prod.key}>
                                <td>{prod.name}</td>
                                {!model.loadBalancingEnabled && <td>{formatNumber(prod.cpp)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                {!model.loadBalancingEnabled && <td>{formatNumber(prod.cfc)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                {model.loadBalancingEnabled && <td>{formatNumber(prod.ceq)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>}
                                <td>{formatNumber(prod.total)} {prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg"}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Row>

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