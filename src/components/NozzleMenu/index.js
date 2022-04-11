import { useState } from 'react';
import { Menu, MenuDropdown, MenuDropdownItem, MenuItem } from 'framework7-react';
import nozzles from '../../data/nozzles';

const getLevel0 = () => Object.keys(nozzles).map(key => nozzles[key]);
const getLevel1 = key => Object.keys(nozzles[key].childs).map(c => nozzles[key].childs[c]);

const NozzleMenu = props => { 

    const [level0, setLevel0] = useState(getLevel0());
    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);
    const [level3, setLevel3] = useState([]);

    const [selection, setSelection] = useState([0, 0, 0, 0]);

    const handleClick = (level, index) => {
        console.log(level, index);
        switch (level) {
            case 0:
                setLevel1(getLevel1(level0[index]));
                setSelection([index, 0, 0, 0]);
                break;
            case 1:
                setLevel2(nozzles[selection[0]].childs[index].childs);
                setSelection([selection[0], index, 0, 0]);
                break;
            case 2:
                setLevel3(nozzles[selection[0]].childs[selection[1]].childs[index].childs);
                setSelection([selection[0], selection[1], index, 0]);
                break;
            case 3:
                setSelection([selection[0], selection[1], selection[2], index]);
                break;
            default:
                break;
        }
    };

    return (
        <Menu>
            <MenuItem text={level0[selection[0]].name} dropdown>
                <MenuDropdown left>
                {
                    level0.map((op, index) => (
                        <MenuDropdownItem key={index} text={op.name} onClick={()=>handleClick(0, index)}/>
                    ))
                }
                </MenuDropdown>
            </MenuItem>

            <MenuItem text={level1[selection[1]]?.name} dropdown>
                <MenuDropdown center contentHeight="200px">
                {
                    level1.map((op, index) => (
                        <MenuDropdownItem key={index} text={op.name} onClick={()=>handleClick(1, index)}/>
                    ))
                }
                </MenuDropdown>
            </MenuItem>

            <MenuItem text={level2[selection[2]]?.name} dropdown>
                <MenuDropdown center contentHeight="200px">
                {
                    level2.map((op, index) => (
                        <MenuDropdownItem key={index} text={op.name} onClick={()=>handleClick(2, index)}/>
                    ))
                }
                </MenuDropdown>
            </MenuItem>

            <MenuItem text={level3[selection[3]]?.name} dropdown>
                <MenuDropdown right>
                {
                    level3.map((op, index) => (
                        <MenuDropdownItem key={index} text={op.name} onClick={()=>handleClick(3, index)}/>
                    ))
                }
                </MenuDropdown>
            </MenuItem>
        </Menu>
    );
};

export default NozzleMenu;