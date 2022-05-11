import TextBox from "src/components/form/TextBox"
import Form from "src/components/form/Form"
export default function LoginForm() {
    return (
        <Form>
            <TextBox label={"username"} id="10"></TextBox>
            <TextBox label={"password"} type="password" id="11"></TextBox>
            <button type="submit">Login</button>
        </Form>
    )
}