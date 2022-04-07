import { Card } from "framework7-react";
import { FaCheck, FaTimes, FaQuestion } from 'react-icons/fa';
import { nozzleCollectedPrompt } from "../Prompts";
import classes from './style.module.css';

const DataTable = props => {

    const addCollected = (row, value) => { 
        // Callback prompt
        let tempArr = [...props.data];
        tempArr[row] = {
            value,
            updated: true,
            ...props.evalCollected(value) // Debe retornar ef, s y ok
        };
        props.onDataChange(tempArr);
    };

    const handleRowSelect = row => {
        if(!props.rowSelectDisabled)
            nozzleCollectedPrompt(row, addCollected);
    };

    return (
        <Card className={classes.Card}>
        {
            props.data?.length > 0 ?
            <div>
                <div>
                    <table className={["data-table", classes.Table].join(' ')} >
                        <colgroup>
                            <col span={1} style={{width: "15%"}} />
                            <col span={1} style={{width: "35%"}} />
                            <col span={1} style={{width: "30%"}} />
                            <col span={1} style={{width: "20%"}} />
                        </colgroup>
                        <thead style={{backgroundColor:"rgb(200,200,200)"}}>
                            <tr style={{maxHeight:"40px!important"}}>
                                <th className="label-cell" style={{margin:0, padding:0}}>Pico #</th>
                                <th className="label-cell" style={{margin:0, padding:0}}>
                                    <div>Caudal</div><div>efectivo</div></th>
                                <th className="label-cell" style={{margin:0, padding:0}}>Desvío</th>
                                <th className="label-cell" style={{margin:0, padding:0}}>Correcto</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div style={{maxHeight:"300px",overflow: "auto"}}>
                    <table className={["data-table", classes.Table].join(' ')} >
                        <colgroup>
                            <col span={1} style={{width: "15%"}} />
                            <col span={1} style={{width: "35%"}} />
                            <col span={1} style={{width: "30%"}} />
                            <col span={1} style={{width: "20%"}} />
                        </colgroup>
                        <tbody style={{maxHeight:"300px",overflow: "auto"}}>
                            {
                                props.data.map((row,idx) => (
                                    <tr key={idx} onClick={()=>handleRowSelect(idx)}>
                                        <td className={classes.DataCell}>{idx+1}</td>
                                        <td className={classes.DataCell}>{row.updated ? row.ef.toFixed(2)+" l/min" : " - "}</td>
                                        <td className={classes.DataCell}>{row.updated ? row.s.toFixed(2)+" %" : " - "}</td>
                                        <td className={classes.DataCell}>
                                            {
                                                row.updated?
                                                (
                                                row.ok? 
                                                    <FaCheck color="green" size={20}/>
                                                    :
                                                    <FaTimes color="red" size={20}/>
                                                )
                                                :
                                                <FaQuestion color="blue" size={20}/>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>                
            </div>    
            :
            <div className={classes.EmptyMessage}>
                <p>Ingrese la cantidad de picos a controlar</p>
            </div>
        }
        </Card>
    );
}

export default DataTable;