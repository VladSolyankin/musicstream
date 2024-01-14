import {Button, Checkbox, Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../firebase/index.cjs';
import {FieldType, NotificationType} from "../../ts/types";
import useStore from "../../store/store.js";

const SignInForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    let { currentUser } = useStore()

    const onSignIn = async (values: FieldType) => {
        //navigate("/")
        const {username, password} = values
        if (typeof username === "string") {
            if (password != null) {
                await signInWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        // Signed in
                        currentUser = userCredential.user.uid;
                        navigate('/')
                        console.log(currentUser)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        openNotification('warning', errorMessage)
                        console.log(`${errorCode}: ${errorMessage}`)
                    });
            }
        }
    }

    const openNotification = (type: NotificationType, error: string) => {
        api[type]({
            message: 'Вход не удался',
            description: error,
            duration: 5,
        });
    };

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onSignIn}
                autoComplete="off"
                className="h-screen w-1/2 bg-white flex flex-col justify-center items-center basis-1/3"
            >
                <div className="text-2xl mb-5 font-bold">Вход</div>
                <Form.Item<FieldType>
                    label="Email"
                    name="username"
                    rules={[{required: true, message: 'Введите вашу почту!'}]}
                    style={{width: "360px"}}
                >
                    <Input style={{width: "180px"}}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Введите ваш пароль!'}]}
                    style={{width: "360px"}}
                >
                    <Input.Password style={{width: "180px"}}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{offset: 8, span: 16}}
                    style={{width: "360px"}}
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 0, span: 16}}>
                    <Button type="default" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 0, span: 16}}>
                    <Button type="link" htmlType="submit" onClick={() => navigate('/register')}>
                        Ещё нет аккаунта? Регистрация
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignInForm;