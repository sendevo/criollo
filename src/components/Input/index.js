import { ListInput } from "framework7-react";
import classes from './style.module.css'

const Input = props => (
    <div className={classes.Container} style={props.style}>
        <ListInput
            className={classes.Input}
            outline
            floatingLabel
            clearButton
            {...props}>
            {
            props.icon ?
                <img className={classes.InputIcon} src={props.icon} slot="media" alt="icon"/>
            :
                null
            }   
        </ListInput>
        {props.unit ? <span className={classes.UnitLabel}>{props.unit}</span> : null}
    </div>
);

export default Input;