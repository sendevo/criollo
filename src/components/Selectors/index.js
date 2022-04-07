import { Block, Radio, Row, Col, BlockTitle } from 'framework7-react';
import { openRecipientSizePrompt } from '../Prompts';

const PresentationSelector = props => {    

    const setBulk = checked => { // Configurar para granel
        if(checked)
            props.onChange({
                target: {
                    name: 'presentation',                    
                    value: 0
                }
            });
    };

    const openPrompt = checked => { // Configurar para envases
        if(checked)
            openRecipientSizePrompt(v=>props.onChange(
                {
                    target: {
                        name: 'presentation',                        
                        value: v
                    }
                }
            ));
    };
    
    return (
        <Row style={{fontSize:12}}>
            <Col width={33}>
                Presentación
            </Col>
            <Col  width={33}>
                <Radio 
                    name="input-type" 
                    checked={props.value === 0} 
                    onChange={e=>setBulk(e.target.checked)}/> A granel
            </Col>
            <Col width={33}>
                <Radio 
                    name="input-type" 
                    checked={props.value > 0} 
                    onChange={e=>openPrompt(e.target.checked)}/> En envase
                    <br/>
                {
                    props.value>0?
                    <span style={{color:"darkgray", marginLeft:20}}> (de {props.value} kg)</span>
                    :
                    null
                }
                
            </Col>
        </Row>
    );
};

const ElapsedSelector = props => {

    const setElapsed = (el, value) => {
        if(el.target.checked){
            props.onChange(value);
        }
    };

    return (
        <Block style={{margin:"0px"}}>
            <BlockTitle>Tiempo de muestreo</BlockTitle>
            <Row>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={props.disabled}
                        name="input-type" 
                        checked={props.value===30000} 
                        onChange={e=>setElapsed(e,30000)}/> 30 seg.
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={props.disabled}
                        name="input-type" 
                        checked={props.value===60000} 
                        onChange={e=>setElapsed(e,60000)}/> 60 seg.
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={props.disabled}
                        name="input-type" 
                        checked={props.value===90000} 
                        onChange={e=>setElapsed(e,90000)}/> 90 seg.
                </Col>
            </Row>
        </Block>
    );
};


export { PresentationSelector, ElapsedSelector };