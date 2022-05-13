import Head from "next/head";
import { Fragment, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";
import { loadAuth, resetAuth, saveAuthTokens } from 'src/reducers/userReducer'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MangaMewAPIURL } from "src/config";

export default function App(props) {
    const storeDispatch = useDispatch();
    const userSelector = useSelector((state)=>state.User);
    
    useEffect(()=>{
        storeDispatch(loadAuth());
    }, []);

   useEffect(()=>{
       if(!userSelector.isReady)return;
       if(!userSelector.token && userSelector.refreshToken)
       {
            axios.post(MangaMewAPIURL("/auth/refresh"),{
                token: userSelector.refreshToken
            }).then(({data})=>{
                storeDispatch(saveAuthTokens({token: data.token.session, refreshToken: data.token.refresh}));
            }).catch((e)=>{
                storeDispatch(resetAuth());
            });
       }
   });

    return (
        <Fragment>
        <Head>
            <title>MangaMew - A Manga Reader</title>
        </Head>
            {   userSelector.isReady &&
                <div className="flex">
                    <SideBar></SideBar>
                    <div className="min-w-0 w-full flex flex-col">
                        <NavigationBar></NavigationBar>
                        <div className="max-w-[1340px] mx-auto w-full pb-20 px-5">
                            {props.children}
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
};