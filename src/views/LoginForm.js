import TextBox from "src/components/form/TextBox"
import Form from "src/components/form/Form"
import Submit from "src/components/form/Submit";
import axios from "axios";
import { MangaMewAPIURL } from "src/config";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { saveAuthTokens } from "src/reducers/userReducer";


export default function LoginForm() {
    const router = useRouter();
    const storeDispatch = useDispatch();



    const handleSubmit = (e)=>{
        axios.post(MangaMewAPIURL("/auth/login"),{
        // axios.post("https://api.mangadex.org/auth/login",{
            username:e.loginUsername.value,
            email: e.loginUsername.value,
            password: e.loginPassword.value,
        }).then(
            ({data, status})=>{
                if(status==200){
                    storeDispatch(saveAuthTokens({token: data.token.session, refreshToken: data.token.refresh}));
                    router.push("/");
                }
            }
        );
    }

    return (
        <div className="w-full max-w-lg">
            <Form method={"POST"} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <TextBox label={"username"} id="loginUsername"></TextBox>
                    <TextBox label={"password"} type="password" id="loginPassword"></TextBox>
                    <Submit name="Login"></Submit>
                </div>
            </Form>
        </div>
    )
}