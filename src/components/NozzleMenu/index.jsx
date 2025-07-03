import { Menu, MenuDropdown, MenuDropdownItem, MenuItem } from 'framework7-react';
import nozzles from '../../data/nozzles_droplet_sizes.json';
import nozzleIcons from './nozzleIcons';
import classes from './style.module.css';

const SelectedOption = props => (
    props.selection ? 
        <div className={classes.SelectedOptionContainer}>
            {props.selection.img && <img className={classes.SelectedOptionIcon} src={nozzleIcons[props.selection.img]} alt={"icon"} />}
            <span className={classes.SelectedOptionText} >{props.selection.name} </span>
        </div> 
    : 
        "Elegir..."
);

const NozzleMenu = ({selection, onOptionSelected}) => { 

    const getChild = path => path.reduce((acc, idx) => {
            if (!acc || !Array.isArray(acc.childs) || idx < 0) return null;
            return acc.childs[idx];
        }, { childs: nozzles });

    const level1 = selection[0] > -1 ? getChild([selection[0]])?.childs || [] : [];
    const level2 = selection[1] > -1 ? getChild([selection[0], selection[1]])?.childs || [] : [];
    const level3 = selection[2] > -1 ? getChild([selection[0], selection[1], selection[2]])?.childs || [] : [];

    const handleClick = (level, index) => {
        let newSelection = [...selection];
        newSelection[level] = index;

        for (let i = level + 1; i < newSelection.length; i++)
            newSelection[i] = -1;

        onOptionSelected(newSelection);
    };

    return (
        <div className={classes.MenuContainer}>
            <Menu>
                <MenuItem className={classes.MenuItem} text={<SelectedOption selection={nozzles[selection[0]]} />} dropdown>
                    <MenuDropdown left>
                        {
                            nozzles.map((op, idx) => (
                                <MenuDropdownItem 
                                    key={idx} 
                                    text={op.name} 
                                    onClick={()=>handleClick(0, idx)}>
                                    {op.img && <img src={nozzleIcons[op.img]} alt="icon" height="25px"/>}
                                </MenuDropdownItem>
                            ))
                        }
                    </MenuDropdown>
                </MenuItem>
                {
                    level1.length > 0 && 
                    <MenuItem className={classes.MenuItem} text={<SelectedOption selection={level1[selection[1]]} />} dropdown>
                        <MenuDropdown center contentHeight="200px">
                            {
                                level1.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(1, idx)}>
                                        {op.img && <img src={nozzleIcons[op.img]} alt="icon" height="25px"/>}
                                    </MenuDropdownItem>
                                ))
                            }
                        </MenuDropdown>
                    </MenuItem>
                }
                {
                    level2.length > 0 && 
                    <MenuItem className={classes.MenuItem} text={<SelectedOption selection={level2[selection[2]]} />} dropdown>
                        <MenuDropdown center contentHeight="200px">                        
                            {
                                level2.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(2, idx)}>
                                        {op.img && <img src={nozzleIcons[op.img]} alt="icon" height="25px"/>}
                                    </MenuDropdownItem>
                                ))
                            }
                        </MenuDropdown>
                    </MenuItem>
                }
                {
                    level3.length > 0 && 
                    <MenuItem className={classes.MenuItem} text={<SelectedOption selection={level3[selection[3]]} />} dropdown>
                        <MenuDropdown right contentHeight="200px">                        
                            {
                                level3.map((op, idx) => (
                                    <MenuDropdownItem 
                                        key={idx} 
                                        text={op.name} 
                                        onClick={()=>handleClick(3, idx)}>
                                        {op.img && <img src={nozzleIcons[op.img]} alt="icon" height="25px"/>}
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