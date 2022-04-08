import { 
    Navbar, 
    Page, 
    BlockTitle, 
    Block, 
    Row, 
    Col, 
    List, 
    Button, 
    Checkbox,
    Card, 
    CardContent
} from 'framework7-react';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/Input';
import { BackButton, DeleteButton, AddButton } from '../../components/Buttons';
import { ModelCtx } from '../../context';
import Toast from '../../components/Toast';
import * as Model from '../../entities/API';
import { generateId } from '../../utils';
import { PresentationSelector } from '../../components/Selectors';
import iconProduct from '../../assets/icons/calculador.png';
import iconDose from '../../assets/icons/recolectado.png';
import iconArea from '../../assets/icons/sup_lote.png';
import iconName from '../../assets/icons/reportes.png';
import iconCapacity from '../../assets/icons/capacidad_carga.png';


const Supplies = props => {


    const model = useContext(ModelCtx);

    const [{
        fieldName, 
        gpsEnabled, 
        fieldCoordinates, 
        loadBalancingEnabled,
        workArea, 
        capacity
    }, setInputs] = useState({
        fieldName: model.fieldName || '', // Nombre de lote
        gpsEnabled: false, // Habilitar GPS
        fieldCoordinates: model.fieldCoordinates || [], // Ubicacion del lote
        loadBalancingEnabled: model.loadBalancingEnabled || false, // Habilitar balanceo de carga
        workArea: model.workArea || '', // Superficie
        capacity: model.capacity || '' // Capacidad carga
    });

    const [products, setProducts] = useState(model.products || []);

    const addProduct = () => {
        const temp = [...products];
        temp.push({
            key: generateId(),
            name: model.main_prod || '',
            dose: model.dose || '',
            presentation: 0 // 0: ml/ha, 1: gr/ha, 2: ml/100L, 3: gr/100L
        });
        model.update("products", temp);        
        setProducts(temp);
    };

    const removeProduct = index => {
        const temp = [...products];
        temp.splice(index, 1);
        model.products = temp;
        model.update("products", temp);
        setProducts(temp);
    };

    const setMainParams = (attr, value) => {
        model.update(attr, value);
        if(attr === "gpsEnabled" && value){
            navigator.geolocation.getCurrentPosition( position => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setInputs(prevState => ({ ...prevState, fieldCoordinates: coords }));
            });
        }
        setInputs(prevState => ({ ...prevState, [attr]: value }));
    };

    const setProductParams = (index, attr, value) => {
        const temp = [...products];
        temp[index][attr] = value;
        model.update("products", temp);
        setProducts(temp);
    };

    const submit = () => {
        const params = {
            A: workArea, 
            T: capacity,
            Qt: model.workVolume,
            products
        };
        console.log(params);
        const res = Model.computeSuppliesList(params);
        model.update('mixResult', res);
        console.log(res);
        //props.f7router.navigate("/suppliesList/");
    };

    return (
        <Page>            
            <Navbar title="Calculador de insumos" style={{maxHeight:"40px", marginBottom:"0px"}}/>      
            <BlockTitle style={{marginBottom:"0px", marginTop: "0px"}}>Datos del lote</BlockTitle>
            <List form noHairlinesMd style={{marginBottom:"10px"}}>    
                <Input
                    slot="list"
                    label="Lote"
                    name="fieldName"
                    type="text"
                    icon={iconName}
                    value={fieldName}
                    onChange={v=>setMainParams('fieldName', v.target.value)}
                    ></Input>
                <Input
                    className="help-target-supplies-form"
                    slot="list"
                    label="Superficie"
                    name="workArea"
                    type="number"
                    unit="ha"
                    icon={iconArea}
                    value={workArea}
                    onChange={v=>setMainParams('workArea', parseFloat(v.target.value))}
                    ></Input>
                <div slot="list" style={{paddingLeft: 30, paddingBottom: 10}}>
                    <Checkbox
                        checked={gpsEnabled}
                        onChange={v=>setMainParams('gpsEnabled', v.target.checked)}/>
                    <span style={{paddingLeft: 10, color: gpsEnabled ? "#000000" : "#999999", fontSize: "0.8em"}}>Geoposición [{fieldCoordinates[0]?.toFixed(4) || '?'}, {fieldCoordinates[1]?.toFixed(4) || '?'}] </span>
                </div>
            </List>
            <BlockTitle style={{marginBottom:"0px", marginTop: "20px"}}>Datos de aplicación</BlockTitle>
            <List form noHairlinesMd style={{marginBottom:"10px"}}>
                <Input
                    className="help-target-load-number"
                    slot="list"
                    label="Capacidad de carga"
                    name="capacity"
                    type="number"
                    unit="lts"
                    icon={iconCapacity}
                    value={capacity}
                    onChange={v=>setMainParams('capacity', parseFloat(v.target.value))}
                    ></Input>
                <div slot="list" style={{paddingLeft: 30, paddingBottom: 10}}>
                    <Checkbox
                        checked={loadBalancingEnabled}
                        onChange={v=>setMainParams('loadBalancingEnabled', v.target.checked)}/>
                    <span style={{paddingLeft: 10, color: loadBalancingEnabled ? "#000000" : "#999999", fontSize: "0.8em"}}>Balancear cargas</span>
                </div>
            </List>
            <Block style={{marginTop: "0px", marginBottom: "0px"}}>
                <BlockTitle style={{marginBottom:"0px", marginTop: "0px"}}>Lista de insumos</BlockTitle>
                {
                    products.map((p, index) =>(
                        <Card key={p.key} style={{margin:"0px 0px 10px 0px"}}>
                            <DeleteButton onClick={()=>removeProduct(index)}/>
                            <CardContent style={{paddingTop:0}}>
                                <span style={{color:"gray"}}>Producto {index+1}</span>
                                <List form noHairlinesMd style={{marginBottom:"0px", marginTop: "0px"}}>
                                    <Input
                                        slot="list"
                                        label="Nombre"
                                        type="text" 
                                        icon={iconProduct}                                       
                                        value={p.name || ''}
                                        onInputClear={()=>setProductParams(index, "name", "")}
                                        onChange={v=>setProductParams(index, "name", v.target.value)}
                                        ></Input>
                                    <Input
                                        className="help-target-add-products"
                                        slot="list"
                                        label="Dosis"
                                        type="number"
                                        unit={Model.presentationUnits[p.presentation]}
                                        icon={iconDose}
                                        value={p.dose || ''}
                                        onInputClear={()=>setProductParams(index, "dose", "")}
                                        onChange={v=>setProductParams(index, "dose", parseFloat(v.target.value))}
                                        ></Input>
                                </List>
                                <PresentationSelector value={p.presentation} onChange={v=>{setProductParams(index, "presentation", v)}}/>
                            </CardContent>                    
                        </Card>
                    ))
                }
                {
                    products.length > 0 ? 
                        null
                    :                        
                        <div style={{textAlign: "center", color:"rgb(150,150,150)"}}>
                            <p>Agregue productos a la lista presionando en "+"</p>
                        </div>
                }
            </Block>
            <Block style={{margin:0}}>
                <AddButton onClick={()=>addProduct()}/>
            </Block>
            <Row style={{marginBottom:"15px"}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button fill onClick={submit} style={{textTransform:"none"}}>Calcular insumos</Button>
                </Col>
                <Col width={20}></Col>
            </Row>                
            <BackButton {...props} />
        </Page>
    );
};

export default Supplies;