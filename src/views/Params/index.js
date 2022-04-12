import { f7, Navbar, Page, List, BlockTitle, Row, Col, Button } from 'framework7-react';
import { useContext, useEffect, useState } from 'react';
import { BackButton, CalculatorButton } from '../../components/Buttons';
import { NozzleSeparationSelector } from '../../components/Selectors';
import Input from "../../components/Input";
import NozzleMenu from "../../components/NozzleMenu";
import Toast from '../../components/Toast';
import { ModelCtx } from '../../context';
import * as API from '../../entities/API';
import iconDistance from '../../assets/icons/dpicos.png';
import iconNozzles from '../../assets/icons/cant_picos2.png';
import iconVelocity from '../../assets/icons/velocidad.png';
import iconPressure from '../../assets/icons/presion.png';
import iconVolume from '../../assets/icons/dosis.png';

const Params = props => {

    const model = useContext(ModelCtx);

    const [inputs, setInputs] = useState({
        nozzleSeparation: model.nozzleSeparation || 0.35,        
        nozzleNumber: model.nozzleNumber || '',        
        nominalFlow: model.nominalFlow || 0.8,
        nominalPressure: model.nominalPressure || 3,
        workVelocity: model.workVelocity || 20,
        workVelocityUpdated: false,
        workPressure: model.workPressure || 2,
        workPressureUpdated: false,
        workVolume: model.workVolume || 56,
        workVolumeUpdated: false
    });

    const [nozzleSelection, setNozzleSelection] = useState(model.nozzleSelection || [-1, -1, -1, -1]);

    const {
        nozzleSeparation,
        nozzleNumber,
        nominalFlow,
        nominalPressure,
        workVelocity,
        workVelocityUpdated,
        workPressure,
        workPressureUpdated,
        workVolume,
        workVolumeUpdated
    } = inputs;


    let pumpFlow;
    try{
        pumpFlow = API.computeQb({
            n: nozzleNumber,
            Qnom: nominalFlow,
            Pnom: nominalPressure,
            Pt: workPressure
        });        
    }catch(e){
    }

    useEffect(() => {
        if(model.velocityMeasured)
            setInputs(prevState => ({
                ...prevState,
                workVelocity: model.workVelocity,
                workVelocityUpdated: true,
                workPressureUpdated: false,
                workVolumeUpdated: false
            }));
    }, [model.workVelocity, model.velocityMeasured]);   

    const handleNozzleSeparationChange = value => {
        const ns = parseFloat(value);
        setInputs({
            ...inputs,
            nozzleSeparation: ns,
            workPressureUpdated: false,
            workVelocityUpdated: false,
            workVolumeUpdated: false
        });
        model.update("nozzleSeparation", ns);
    };

    const handleNozzleNumberChange = value => {
        const n = parseInt(value);
        setInputs({
            ...inputs,
            nozzleNumber: n
        });
        model.update("nozzleNumber", n);
    };

    const handleNozzleSelected = (selection, nozzle) => {        
        setNozzleSelection(selection);
        model.update("nozzleSelection", selection);
        if(nozzle){
            const res = API.computeQNom({
                b: nozzle.b,
                c: nozzle.c,
                Pnom: nominalPressure
            });
            setInputs({
                ...inputs,
                nominalFlow: res,
                workPressureUpdated: false,
                workVelocityUpdated: false,
                workVolumeUpdated: false
            });        
            model.update("nominalFlow", res);
        }
    };

    const handleNominalFlowChange = e => {        
        const nf = parseFloat(e.target.value);
        setInputs({
            ...inputs,
            nominalFlow: nf,            
            workPressureUpdated: false,
            workVelocityUpdated: false,
            workVolumeUpdated: false
        });
        setNozzleSelection([-1, -1, -1, -1]);
        model.update({
            nominalFlow: nf,
            nozzleSelection: [-1, -1, -1, -1]
        });
    };

    const handleNominalPressureChange = e => {
        const np = parseFloat(e.target.value);
        setInputs({
            ...inputs,
            nominalPressure: np,
            workPressureUpdated: false,
            workVelocityUpdated: false,
            workVolumeUpdated: false
        });
        model.update("nominalPressure", np);
    };

    const handleWorkVelocityChange = e => {
        const wv = parseFloat(e.target.value);
        setInputs({
            ...inputs,
            workVelocity: wv,
            workVelocityUpdated: true,
            workPressureUpdated: false,
            workVolumeUpdated: false
        });
        model.update("workVelocity", wv);
    };

    const handleWorkPressureChange = e => {
        const wp = parseFloat(e.target.value);
        setInputs({
            ...inputs,
            workPressure: wp,
            workPressureUpdated: true,
            workVelocityUpdated: false,
            workVolumeUpdated: false
        });
        model.update("workPressure", wp);
    };

    const handleWorkVolumeChange = e => {
        const wv = parseFloat(e.target.value);
        setInputs({
            ...inputs,
            workVolume: wv,
            workVolumeUpdated: true,
            workPressureUpdated: false,
            workVelocityUpdated: false
        });
        model.update("workVolume", wv);
    };

    const computeWorkVelocity = () => {
        try{
            const newVel = API.computeVt({
                Va: workVolume,
                Pt: workPressure,
                d: nozzleSeparation,
                Qnom: nominalFlow,
                Pnom: nominalPressure
            });
            model.update({
                workVelocity: newVel,
                velocityMeasured: false
            });
            setInputs({
                ...inputs,
                workVelocity: newVel,
                workVelocityUpdated: true,
                workPressureUpdated: true,
                workVolumeUpdated: true
            });
        } catch(err) {
            Toast("error", err);
        }
    };

    const computeWorkPressure = () => {
        try{
            const newPres = API.computePt({
                Va: workVolume,
                Vt: workVelocity,            
                d: nozzleSeparation,
                Qnom: nominalFlow,
                Pnom: nominalPressure
            });
            model.update("workPressure", newPres);
            setInputs({
                ...inputs,
                workPressure: newPres,
                workVelocityUpdated: true,
                workPressureUpdated: true,
                workVolumeUpdated: true
            });
        } catch(err) {
            Toast("error", err);
        }
    };

    const computeWorkVolume = () => {
        try{
            const newVol = API.computeVa({
                Pt: workPressure,
                Vt: workVelocity,
                d: nozzleSeparation,
                Qnom: nominalFlow,
                Pnom: nominalPressure
            });
            model.update("workVolume", newVol);
            setInputs({
                ...inputs,
                workVolume: newVol,
                workVelocityUpdated: true,
                workPressureUpdated: true,
                workVolumeUpdated: true
            });
        } catch(err) {
            Toast("error", err);
        }
    };

    const addParamsToReport = () => {
        const {
            nozzleSeparation,
            nominalFlow,
            nominalPressure,
            workVelocity,
            workPressure,
            workVolume
        } = inputs;
        model.addParamsToReport({
            nozzleSeparation,
            nominalFlow,
            nominalPressure,
            workVelocity,
            workPressure,
            workVolume
        });
        f7.panel.open();
    };
    
    return (
        <Page>            
            <Navbar title="Parámetros de aplicación" style={{maxHeight:"40px", marginBottom:"0px"}}/>            
            <NozzleSeparationSelector value={nozzleSeparation} onChange={handleNozzleSeparationChange}/>
            <List form noHairlinesMd style={{marginBottom:"10px", marginTop: "10px"}}>    
                <Input
                    slot="list"
                    label="Distancia entre picos"
                    name="nozzleSeparation"
                    type="number"
                    unit="m"
                    icon={iconDistance}
                    value={nozzleSeparation}
                    onChange={v => handleNozzleSeparationChange(v.target.value)}>
                </Input>
                <Input
                    slot="list"
                    label="Cantidad de picos"
                    name="nozzleNumber"
                    type="number"                    
                    icon={iconNozzles}
                    value={nozzleNumber}
                    onChange={v => handleNozzleNumberChange(v.target.value)}>
                </Input>
            </List>

            <BlockTitle style={{marginBottom: 5}}>Capacidad del pico</BlockTitle>
            
            <center>
                <NozzleMenu 
                    onOptionSelected={handleNozzleSelected} 
                    selection={nozzleSelection} />
            </center>

            <List form noHairlinesMd style={{marginBottom:"10px", marginTop: "0px"}}>    
                <Row slot="list">
                    <Col>
                        <Input
                            label="Caudal nominal"
                            name="nominalFlow"
                            type="number"
                            unit="l/min"                    
                            value={nominalFlow}
                            onChange={handleNominalFlowChange}>
                        </Input>
                    </Col>
                    <Col>
                        <Input
                            label="Presión nominal"
                            name="nominalPressure"
                            type="number"
                            unit="bar"                    
                            value={nominalPressure}
                            onChange={handleNominalPressureChange}>
                        </Input>
                    </Col>
                </Row>
            </List>

            <BlockTitle style={{marginBottom: "5px"}}>Parámetros de pulverización</BlockTitle>
            <List form noHairlinesMd style={{marginBottom:"10px"}}>
                <Row slot="list">
                    <Col width="80">
                        <Input
                            slot="list"
                            borderColor={workVelocityUpdated ? "green":"#F2D118"}
                            label="Velocidad avance"
                            name="workVelocity"
                            type="number"
                            unit="km/h"
                            icon={iconVelocity}
                            value={workVelocity}
                            onIconClick={computeWorkVelocity}
                            onChange={handleWorkVelocityChange}>
                        </Input>        
                    </Col>
                    <Col width="20" style={{paddingTop:"5px", marginRight:"10px"}}>
                        <CalculatorButton href="/velocity/" tooltip="Medir velocidad"/>
                    </Col>
                </Row>
                
                <Input
                    slot="list"
                    borderColor={workPressureUpdated ? "green":"#F2D118"}
                    label="Presión de trabajo"
                    name="workPressure"
                    type="number"
                    unit="bar"
                    icon={iconPressure}
                    value={workPressure}
                    onIconClick={computeWorkPressure}
                    onChange={handleWorkPressureChange}>
                </Input>
                {pumpFlow && <div slot="list">
                    <span style={{fontSize: "0.85em", color: "rgb(100, 100, 100)", marginLeft: "50px"}}>
                        Caudal pulverizado: {pumpFlow} l/min
                    </span>
                </div>}

                <Input
                    slot="list"
                    borderColor={workVolumeUpdated ? "green":"#F2D118"}
                    label="Volumen de aplicación"
                    name="workVolume"
                    type="number"
                    unit="l/ha"
                    icon={iconVolume}
                    value={workVolume}
                    onIconClick={computeWorkVolume}
                    onChange={handleWorkVolumeChange}>
                </Input>
            </List>

            <Row style={{marginTop:20, marginBottom: 20}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button 
                        fill    
                        style={{textTransform:"none"}} 
                        disabled={!(workVelocityUpdated && workPressureUpdated && workVolumeUpdated)} 
                        onClick={addParamsToReport}>
                            Agregar a reporte
                    </Button>
                </Col>
                <Col width={20}></Col>
            </Row>


            <BackButton {...props} />
        </Page>
    );
};

export default Params;