import { Navbar, Page } from 'framework7-react';
import { useContext } from 'react';
import { BackButton } from '../../components/Buttons';
import { ModelCtx } from '../../context';

const Params = props => {

    const model = useContext(ModelCtx);

    console.log(model);
    
    return (
        <Page>            
            <Navbar title="Parámetros de fertilización" style={{maxHeight:"40px", marginBottom:"0px"}}/>            
            <BackButton {...props} />
        </Page>
    );
};

export default Params;