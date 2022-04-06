import React, {createContext} from 'react';
import CriolloModel from '../entities/Model';

const model = new CriolloModel();

export const ModelCtx = createContext();

export const ModelProvider = props => (
    <ModelCtx.Provider value={model}>
        {props.children}
    </ModelCtx.Provider>
);

