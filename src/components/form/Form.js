import React, { useState } from "react"

const FormContext = React.createContext();
export default function Form({children, method}){
    const [state, setState] = useState({
        method: method || "GET"
    });

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(state);
    }

    return <FormContext.Provider value={state}>
        <form onSubmit={onSubmit} method={state.method}>
            {children}
        </form>
    </FormContext.Provider>
}

export {FormContext, Form}