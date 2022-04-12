import { Menu, MenuDropdown, MenuDropdownItem, MenuItem } from 'framework7-react';
import { importAll } from '../../utils';
import nozzles from '../../data/nozzles';
import classes from './style.module.css';

const images = importAll(require.context('../../assets/nozzles', false, /\.(png)$/));

const SelectedOption = props => (
    props.selection ? 
    <div className={classes.SelectedOptionContainer}>
        {props.selection.img && <img className={classes.SelectedOptionIcon} src={images[props.selection.img].default} alt={"icon"} />}
        <span className={classes.SelectedOptionText} >{props.selection.name} </span>
    </div> 
    : 
    "Elegir..."
);

const NozzleMenu = props => { 
    
    console.log("menu", props.selection);

    const level1 = props.selection[0] > -1 ? nozzles[props.selection[0]].childs : [];
    const level2 = props.selection[1] > -1 && nozzles[props.selection[0]].childs[props.selection[1]].childs ? nozzles[props.selection[0]].childs[props.selection[1]].childs : [];
    const level3 = props.selection[2] > -1 && nozzles[props.selection[0]].childs[props.selection[1]].childs[props.selection[2]].childs ? nozzles[props.selection[0]].childs[props.selection[1]].childs[props.selection[2]].childs : [];

    const handleClick = (lvl, idx) => {
        switch(lvl){
            case 0:
                props.onOptionSelected([idx, -1, -1, -1]);
                break;
            case 1:
                props.onOptionSelected([props.selection[0], idx, -1, -1], nozzles[props.selection[0]].childs[idx].childs ? null : nozzles[props.selection[0]].childs[idx]);
                break;
            case 2: 
                props.onOptionSelected([props.selection[0], props.selection[1], idx, -1], nozzles[props.selection[0]].childs[props.selection[1]].childs[idx].childs ? null : nozzles[props.selection[0]].childs[props.selection[1]].childs[idx]);    
                break;
            case 3:
                props.onOptionSelected([props.selection[0], props.selection[1], props.selection[2], idx], nozzles[props.selection[0]].childs[props.selection[1]].childs[props.selection[2]].childs[idx]);                    
                break;
            default:
                break;
        }
    };

    return (
        <div className={classes.MenuContainer}>
            <Menu>
                <MenuItem text={<SelectedOption selection={nozzles[props.selection[0]]} />} dropdown>
                    <MenuDropdown left>                    
                        {
                            nozzles.map((op, idx) => (
                                <MenuDropdownItem 
                                    key={idx} 
                                    text={op.name} 
                                    onClick={()=>handleClick(0, idx)}>
                                    {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                </MenuDropdownItem>
                            ))
                        }
                    </MenuDropdown>
                </MenuItem>
                {
                    level1.length > 0 && 
                    <MenuItem text={<SelectedOption selection={level1[props.selection[1]]} />} dropdown>
                        <MenuDropdown center contentHeight="200px">
                            {
                                level1.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(1, idx)}>
                                        {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                    </MenuDropdownItem>
                                ))
                            }
                        </MenuDropdown>
                    </MenuItem>
                }
                {
                    level2.length > 0 && 
                    <MenuItem text={<SelectedOption selection={level2[props.selection[2]]} />} dropdown>
                        <MenuDropdown center contentHeight="200px">                        
                            {
                                level2.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(2, idx)}>
                                        {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                    </MenuDropdownItem>
                                ))
                            }
                        </MenuDropdown>
                    </MenuItem>
                }
                {
                    level3.length > 0 && 
                    <MenuItem text={<SelectedOption selection={level3[props.selection[3]]} />} dropdown>
                        <MenuDropdown right contentHeight="200px">                        
                            {
                                level3.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(3, idx)}>
                                        {op.img && <img src={images[op.img].default} alt="icon" height="25px"/>}
                                    </MenuDropdownItem>
                                ))
                            }
                        </MenuDropdown>
                    </MenuItem>
                }            
            </Menu>
        </div>
    );
};

export default NozzleMenu;