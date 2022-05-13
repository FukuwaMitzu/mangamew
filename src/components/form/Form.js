import React, { useState } from "react"

const FormContext = React.createContext();
export default function Form({children, method, onSubmit}){
    const [state, setState] = useState({
        method: method || "GET"
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(onSubmit)onSubmit(state);
    }

    return <FormContext.Provider value={state}>
        <form onSubmit={handleSubmit} method={state.method}>
            {children}
        </form>
    </FormContext.Provider>
}

export {FormContext, Form}