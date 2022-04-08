import { f7, Row, Col, Button } from 'framework7-react';
import React from 'react';
//import CustomInput from '../Inputs';

class Picker extends React.Component {
    
        constructor(props) {
            super(props);            
            this.inputRef = React.createRef();
            this.handleClick = this.handleClick.bind(this);
        }

        componentDidMount(){
            this.picker = f7.picker.create({
                inputEl: this.inputRef.current,
                rotateEffect: true,
                backdrop: true,            
                renderToolbar: () => (`
                    <div class="toolbar">
                        <div class="toolbar-inner">
                            <div class="center" style="width:100%; text-align:center">
                                <a style="color:black; font-size:130%">Selección de pico</a>
                            </div>
                        </div>
                    </div>`
                ),
                on:{
                    close: v=>{
                        if(this.props.onSelected) this.props.onSelected(v.value);
                    },
                    change: v=>{
                        if(this.props.onChange) this.props.onChange(v.value);
                    }
                },
                cols: this.props.cols,
                value: this.props.value
            }); 
        }

        componentWillUnmount(){
            this.picker.destroy();            
        }

        handleClick(e) {        
            e.preventDefault();
            e.stopPropagation();
            setTimeout(()=>{
                this.inputRef.current.click();            
            },10);
        }
    
        render(){
            return(
                <div>
                    <input type="text" readOnly ref={this.inputRef} style={{display:"none"}}/>
                    <Row style={{marginTop:20}}>
                        <Col width={20}></Col>
                        <Col width={60}>
                            <Button 
                                className="help-target-work-width"
                                fill 
                                style={{textTransform:"none"}} 
                                color="teal"
                                onClick={this.handleClick}>
                                Seleccionar pico
                            </Button>
                        </Col>
                        <Col width={20}></Col>
                    </Row>
                </div>
            )
        }
}

export default Picker;