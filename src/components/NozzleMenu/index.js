import { useState } from 'react';
import { Menu, MenuDropdown, MenuDropdownItem, MenuItem } from 'framework7-react';
import nozzles from '../../data/nozzles';
import classes from './style.module.css';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}
const images = importAll(require.context('../../assets/nozzles', false, /\.(png|jpe?g|svg)$/));

const SelectedOption = props => {
    return (
        props.selection ? 
        <div className={classes.SelectedOptionContainer}>
            {props.selection.img && <img className={classes.SelectedOptionIcon} src={images[props.selection.img].default} alt={"icon"} />}
            <span className={classes.SelectedOptionText} >{props.selection.name} </span>
        </div> 
        : 
        "Elegir..."
    )
}

const NozzleMenu = props => { 

    const [level0] = useState(nozzles);
    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);
    const [level3, setLevel3] = useState([]);

    const [selection, setSelection] = useState([0, 0, 0, 0]);

    const handleClickLvl0 = idx => {        
        setLevel1(nozzles[idx].childs);
        setLevel2([]);
        setLevel3([]);
        setSelection([idx, -1, -1, -1]);
    };

    const handleClickLvl1 = idx => {
        if(nozzles[selection[0]].childs[idx].childs)
            setLevel2(nozzles[selection[0]].childs[idx].childs);
        else
            props.onSelected(nozzles[selection[0]].childs[idx]);
        setLevel3([]);
        setSelection([selection[0], idx, -1, -1]);
    };

    const handleClickLvl2 = idx => {
        if(nozzles[selection[0]].childs[selection[1]].childs[idx].childs)
            setLevel3(nozzles[selection[0]].childs[selection[1]].childs[idx].childs);
        else
            props.onSelected(nozzles[selection[0]].childs[selection[1]].childs[idx]);
        setSelection([selection[0], selection[1], idx, -1]);
    };

    const handleClickLvl3 = idx => {
        props.onSelected(nozzles[selection[0]].childs[selection[1]].childs[selection[2]].childs[idx]);
        setSelection([selection[0], selection[1], selection[2], idx]);
    };

    return (
        <Menu>
            <MenuItem
                text={<SelectedOption selection={level0[selection[0]]} />} dropdown>
                <MenuDropdown left>                    
                    {
                        level0.map((op, idx) => (
                            <MenuDropdownItem 
                                key={idx} 
                                text={op.name} 
                                onClick={()=>handleClickLvl0(idx)}>
                                {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                            </MenuDropdownItem>
                        ))
                    }
                </MenuDropdown>
            </MenuItem>
            {
                level1.length > 0 && 
                <MenuItem text={<SelectedOption selection={level1[selection[1]]} />} dropdown>
                    <MenuDropdown center contentHeight="200px">
                        {
                            level1.map((op, idx) => (
                                <MenuDropdownItem 
                                    key={idx} 
                                    text={op.name} 
                                    onClick={()=>handleClickLvl1(idx)}>
                                    {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                </MenuDropdownItem>
                            ))
                        }
                    </MenuDropdown>
                </MenuItem>
            }
            {
                level2.length > 0 && 
                <MenuItem text={<SelectedOption selection={level2[selection[2]]} />} dropdown>
                    <MenuDropdown center contentHeight="200px">                        
                        {
                            level2.map((op, idx) => (
                                <MenuDropdownItem 
                                    key={idx} 
                                    text={op.name} 
                                    onClick={()=>handleClickLvl2(idx)}>
                                    {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                </MenuDropdownItem>
                            ))
                        }
                    </MenuDropdown>
                </MenuItem>
            }
            {
                level3.length > 0 && 
                <MenuItem text={<SelectedOption selection={level3[selection[3]]} />} dropdown>
                    <MenuDropdown right contentHeight="200px">                        
                        {
                            level3.map((op, idx) => (
                                <MenuDropdownItem 
                                    key={idx} 
                                    text={op.name} 
                                    onClick={()=>handleClickLvl3(idx)}>
                                    {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                </MenuDropdownItem>
                            ))
                        }
                    </MenuDropdown>
                </MenuItem>
            }            
        </Menu>
    );
};

export default NozzleMenu;