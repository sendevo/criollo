import { Navbar, Page, List } from 'framework7-react';
import { useContext, useState } from 'react';
import { BackButton } from '../../components/Buttons';
import { NozzleSeparationSelector } from '../../components/Selectors';
import Input from "../../components/Input";
import Picker from '../../components/Picker';
import { ModelCtx } from '../../context';
import iconDistance from '../../assets/icons/dpicos.png';
import iconNozzle from '../../assets/nozzles/iso_0.png';
import nozzles from '../../entities/nozzles.json';

const Params = props => {

    const model = useContext(ModelCtx);

    const [inputs, setInputs] = useState({
        nozzleSeparation: model.nozzleSeparation || 0.35,
    });

    const {
        nozzleSeparation
    } = inputs;

    const handleNozzleSeparationChange = value => {
        const ns = parseFloat(value);
        setInputs({
            ...inputs,
            nozzleSeparation: ns
        });
        model.update("nozzleSeparation", ns);
    };

    const handlePickerChange = v => {
        console.log(v);
    };

    const pickerCols = [
        {
            values: [0, 1, 2, 3],
            displayValues: ['ISO', 'DyN', 'CEN', 'AMT'],
            onChange: function (picker, value) {
                if (picker.cols[1].replaceValues) {
                    picker.cols[1].replaceValues(nozzles[value]);
                }
            }
        },
        {
            textAlign: 'left',
            values: [0, 1],
            displayValues: ['Cono Hueco', 'Cono Lleno']
        },
        {
            values: [0, 1, 2, 3, 4, 5],
            displayValues: ['D1', 'D1.5', 'D2', 'D3', 'D4', 'D5']
        },
        ,
        {
            values: [0, 1, 2, 3, 4],
            displayValues: ['DC13', 'DC23', 'DC25', 'DC45', 'DC46']
        }
    ];
    
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
            </List>

            <Picker                 
                pattern={"linear"}
                title={"Ancho de labor"} 
                cols={pickerCols} 
                value={[0]}
                onChange={handlePickerChange}
                icon={iconNozzle}
                />

            <BackButton {...props} />
        </Page>
    );
};

export default Params;