const { createReducer, createAction } = require("@reduxjs/toolkit");

const onSideBarTrigger = createAction("sidebar/ontrigger");


const initState = {
    isActive : false
}

const sideBarReducer = createReducer(initState, (builder)=>{
    builder.addCase( onSideBarTrigger, (state, action)=>{
            state.isActive = !state.isActive;
        }
    );
});

export default sideBarReducer;
export {onSideBarTrigger};