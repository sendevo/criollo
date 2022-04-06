import { 
    Page, 
    Navbar, 
    Block, 
    List, 
    Row, 
    Col, 
    Button
} from "framework7-react";
import { useContext, useState } from "react";
import { useSound } from "use-sound";
import Input from "../../components/Input";
import { ModelCtx } from "../../context";
import { set_2_decimals } from "../../utils";
import moment from 'moment';
import { PlayButton } from "../../components/Buttons";
import Timer from "../../entities/Timer";
import Toast from "../../components/Toast";
import { timerCollectedPrompt } from "../../components/Prompts";
import { ElapsedSelector } from "../../components/Selectors";
import { FaMinus } from 'react-icons/fa';
import oneSfx from '../../assets/sounds/uno.mp3';
import twoSfx from '../../assets/sounds/dos.mp3';
import threeSfx from '../../assets/sounds/tres.mp3';
import readySfx from '../../assets/sounds/listo.mp3';
import classes from './style.module.css';

const defaultTimer = 30000;

const DataTable = props => {

    return ( // Tabla de pesos recolectados
    <table className={`data-table ${classes.Table}`}>
        <thead>
            <tr>
                <th>#</th>
                <th>Recolectado</th>
            </tr>
        </thead>
        <tbody>
        {
            props.data.map((d, idx) => (
                <tr key={idx}>
                    <td>{idx+1}</td>                        
                    <td>{d?.toFixed(2)} kg</td>
                </tr>
            ))
        }
        </tbody>
    </table>
);
    }

const OutputBlock = props => ( // Bloque con resultado final a exportar
    <List form noHairlinesMd style={{marginTop:"0px"}}>
        <Row slot="list">
            <Col width={10}></Col>
            <Col width={80}>
                <Input
                    readOnly
                    value={props.output}
                    label="Peso recolectado promedio"
                    type="number"
                    unit="kg"
                    clearButton={false}
                ></Input>
            </Col>
            <Col width={10}></Col>
        </Row>
    </List>
);

const timer = new Timer(defaultTimer, true);

const Recolected = ({f7router}) => {
    
    const model = useContext(ModelCtx);
    const [elapsed, setElapsed] = useState(model.time*1000 || defaultTimer);
    const [time, setTime] = useState(defaultTimer);
    const [running, setRunning] = useState(false);        
    const [data, setData] = useState([]);
    const [play3] = useSound(threeSfx);
    const [play2] = useSound(twoSfx);
    const [play1] = useSound(oneSfx);
    const [play0] = useSound(readySfx);
    
    const updateElapsed = value => {
        timer.setInitial(value);
        setTime(value);
        setElapsed(value);
        setData([]); // Al cambiar el tiempo, borrar datos anteriores
    };

    const onTimeout = () => {        
        setRunning(false);        
        setTime(elapsed);        
        timerCollectedPrompt( value => {
            const temp = [...data];
            temp.push(parseFloat(value));
            setData(temp);
        });
    };

    const popData = () => { // Quitar último dato medido
        if(data.length > 0){
            const temp = [...data];
            temp.pop();
            setData(temp);            
        }
    };

    const dataAvg = () => data.length > 0 ? data.reduce((r, a) => a + r, 0)/data.length : 0;

    const exportData = () => {           
        model.recolected = set_2_decimals(dataAvg());
        model.time = elapsed/1000;
        f7router.back();
    };

    const toggleRunning = () => {
        if(data.length >= 3){
            Toast("info", "Sólo puede ingresar hasta 3 muestras", 2000, "center");
        }else{
            if(!running){
                timer.onChange = setTime;
                timer.onTimeout = onTimeout;
                timer.clear();
                timer.start();
                setRunning(true);            
            }        
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

    return (
        <Page>
            <Navbar title="Cronómetro" style={{maxHeight:"40px", marginBottom:"0px"}}/>      
            <ElapsedSelector value={elapsed} disabled={running} onChange={v => updateElapsed(v)}/>
            <Block style={{marginTop:"20px", textAlign:"center"}}>
                <p style={{fontSize:"50px", margin:"0px"}}>{getTime()}</p>
                <PlayButton onClick={toggleRunning} running={running} />
            </Block>
            <Block style={{marginBottom: "0px",textAlign:"center"}}>
                <Row style={{alignItems:"center"}}>
                    <Col width={20}>                        
                        <Row>
                            <Button disabled={running || data.length===0} onClick={popData}>
                                <FaMinus color="red" size={30}/>
                            </Button>
                        </Row>
                    </Col>
                    <Col width={80}>
                        <DataTable data={data} />
                    </Col>
                </Row>
            </Block>
            <Block style={{marginTop:"0px",textAlign:"center"}}>
                <OutputBlock output={dataAvg().toFixed(2)}/>
            </Block>
            <Block style={{textAlign:"center"}}>
                <Row>
                    <Col width={20}></Col>
                    <Col width={60}><Button disabled={data.length===0} fill onClick={exportData}>Exportar</Button></Col>
                    <Col width={20}></Col>
                </Row>
            </Block>
        </Page>
    );
};

export default Recolected;