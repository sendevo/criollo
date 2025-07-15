import { Page, Navbar, Block, List, Row, Col, Button } from "framework7-react";
import Input from "../../components/Input";
import { NavbarTitle } from "../../components/Buttons";
import { useContext, useState } from "react";
import { ModelCtx } from "../../context";
import { computeQd } from "../../entities/API";
import { set2Decimals } from "../../utils";


const View = props => { // View
    
    const model = useContext(ModelCtx);

    const [nutrientDose, setNutrientDose] = useState(0);
    const [nutrientConcentration, setNutrientConcentration] = useState(100);

    const handleNutrientDoseChange = (e) => {
        setNutrientDose(e.target.value);
    };

    const handleNutrientConcentrationChange = (e) => {
        setNutrientConcentration(e.target.value);
    };

    const handleExport = () => { 
        const nd = parseFloat(nutrientDose);
        const nc = parseFloat(nutrientConcentration);
        const wv = computeQd({
            Dnu: nd,
            Cnu: nc,
            Dp: model.productDensity 
        });
        model.update({
            nutrientDose: nd,
            nutrientConcentration: nc,
            workVolume: set2Decimals(wv),
            volumeUpdated: true
        });
        props.f7router.back();        
    };

    return (
        <Page>
            <Navbar style={{maxHeight:"40px", marginBottom:"0px"}}>
                <NavbarTitle {...props} title="Ajuste por concentración"/>
            </Navbar>
            <Block style={{margin:"0px"}}>
                <List form noHairlinesMd style={{marginTop:"0px"}}>
                    <Input
                        slot="list"
                        label="Dosis de nutriente"
                        name="nutrientDose"
                        type="number"
                        unit="kg/ha"
                        value={nutrientDose}
                        onChange={handleNutrientDoseChange}>
                    </Input>

                    <Input
                        slot="list"
                        label="Concentración de nutriente"
                        name="nutrientConcentration"
                        type="number"
                        unit="%"
                        value={nutrientConcentration}
                        onChange={handleNutrientConcentrationChange}>
                    </Input>
                </List>
            </Block>
            
            <Block style={{textAlign:"center", marginBottom: 15}}>
                <Row>
                    <Col width={20}></Col>
                    <Col width={60}><Button fill onClick={handleExport}>Exportar</Button></Col>
                    <Col width={20}></Col>
                </Row>
            </Block>
        </Page>
    );
};

export default View;