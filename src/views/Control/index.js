import { 
    Page, 
    Navbar, 
    Block, 
    List
} from "framework7-react";
import { useContext, useState } from "react";
import { ModelCtx } from "../../context";
import { useSound } from "use-sound";
import moment from 'moment';
import Input from "../../components/Input";
//import { set_2_decimals } from "../../utils";
import { PlayButton, BackButton } from "../../components/Buttons";
import Timer from "../../entities/Timer";
import Toast from "../../components/Toast";
import { ElapsedSelector } from "../../components/Selectors";
import DataTable from "../../components/DataTable";

import iconFlow from "../../assets/icons/caudal.png";
import iconNumber from "../../assets/icons/cant_picos.png";

import oneSfx from '../../assets/sounds/uno.mp3';
import twoSfx from '../../assets/sounds/dos.mp3';
import threeSfx from '../../assets/sounds/tres.mp3';
import readySfx from '../../assets/sounds/listo.mp3';
import classes from './style.module.css';


const defaultTimer = 30000;
const timer = new Timer(defaultTimer, true);

const Control = props => {
    
    const model = useContext(ModelCtx);
    const [elapsed, setElapsed] = useState(model.time*1000 || defaultTimer);
    const [time, setTime] = useState(defaultTimer);
    const [running, setRunning] = useState(false);        
    const [workFlow, setWorkFlow] = useState(model.workFlow || null);    
    const [data, setData] = useState([]);

    const [play3] = useSound(threeSfx);
    const [play2] = useSound(twoSfx);
    const [play1] = useSound(oneSfx);
    const [play0] = useSound(readySfx);
    
    const updateElapsed = value => {
        timer.setInitial(value);
        model.update("time", value/1000);
        setTime(value);
        setElapsed(value);
        setData([]); // Al cambiar el tiempo, borrar datos anteriores
    };

    const onTimeout = () => {        
        setRunning(false);        
        setTime(elapsed);        
        Toast("success", "Ingrese el valor recolectado seleccionando la fila correspondiente", 3000, "center");
    };

    const toggleRunning = () => {
        if(data.length > 0)
        {
            if(!running){
                timer.onChange = setTime;
                timer.onTimeout = onTimeout;
                timer.clear();
                timer.start();
                setRunning(true);            
            }else{
                timer.stop();
                timer.clear();
                setTime(elapsed);            
                setRunning(false);
            }
        }else{
            Toast("error", "Indique la cantidad de picos a controlar", 3000, "bottom");
        }
    };

    const getTime = () => {
        if(time === 3000)
            play3();
        if(time === 2000)
            play2();
        if(time === 1000)
            play1();
        if(time < 100)
            play0();
        // unix to min:seg:ms
        return moment(time).format('mm:ss:S');
    };

    const handleFowChange = e => {
        setWorkFlow(e.target.value);
    }

    const handleNozzleCntChange = e => {        
        const temp = [];
        for(let i = 0; i < e.target.value; i++){
            temp.push({
                value: 0,
                effectiveFlow: 0,
                deviation: 0,
                correct: false
            });
        }
        setData(temp);
    }

    return (
        <Page>
            <Navbar title="Verificación de picos" style={{maxHeight:"40px", marginBottom:"0px"}}/>      
            <ElapsedSelector value={elapsed} disabled={running} onChange={updateElapsed}/>

            <List form noHairlinesMd style={{marginBottom:"10px", marginTop: "10px"}}>    
                <Input
                    slot="list"
                    label="Picos a controlar"
                    name="nozzleCnt"
                    type="text"
                    icon={iconNumber}
                    value={data.length === 0 ? null : data.length}
                    onChange={handleNozzleCntChange}
                    ></Input>
                <Input
                    className="help-target-supplies-form"
                    slot="list"
                    label="Caudal de trabajo"
                    name="workFlow"
                    type="number"
                    unit="l/min"
                    icon={iconFlow}
                    value={workFlow}
                    onChange={handleFowChange}
                    ></Input>
            </List>

            <Block style={{marginTop:"20px", textAlign:"center"}}>
                <p style={{fontSize:"50px", margin:"0px"}}>{getTime()} <PlayButton onClick={toggleRunning} running={running} /></p>
            </Block>

            <Block style={{marginBottom: "0px",textAlign:"center"}}>
                <DataTable data={data} onDataChange={setData}/>
            </Block>

            <Block className={classes.OutputBlock}>
                <p><b>Resultados</b></p>
                <p>Caudal efectivo promedio: {} l/min</p>
                <p>Volumen pulverizado efectivo: {} l/ha</p>
                <p>Diferencia: {} l/ha ({} %)</p>
            </Block>
            <BackButton {...props} />
        </Page>
    );
};

export default Control;