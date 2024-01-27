import {Button, Checkbox, ConfigProvider, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../api/firebase/config.js';
import {FieldType} from "../../ts/types";
import MyNotification from "../UI/MyNotification";
import {useState} from "react";
import {signInWarning} from "../../ts/constants";

const SignInForm = () => {
    const navigate = useNavigate()
    const [isErrorOpened, setIsErrorOpened] = useState(false)

    const onSignIn = async (values: FieldType) => {
        const {username, password} = values
        if (typeof username === "string") {
            if (password != null) {
                await signInWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        localStorage.setItem('currentUserId', userCredential.user.uid)
                        navigate('/main')
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setIsErrorOpened(true)
                        console.log(`${errorCode}: ${errorMessage}`)
                    });
            }
        }
    }


    return (
        <>
            <MyNotification isOpened={isErrorOpened} params={signInWarning}/>
            <ConfigProvider theme={
                {components:
                        {
                            Form: {
                                labelFontSize: 18,
                                fontSize: 18
                            },
                        }
                }
            }>
                <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onSignIn}
                autoComplete="off"
                className="h-screen bg-white flex flex-col justify-center items-center"
            >
                    <div className="flex justify-center items-center w-screen lg:hidden">
                        <img src="/assets/logo-transparent.png" alt="Logo"/>
                    </div>
                    <div className="text-5xl mb-5 font-bold">Вход</div>
                    <Form.Item<FieldType>
                        label="Email"
                        name="username"
                        className="text-2xl"
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
                        wrapperCol={{offset: 7, span: 16}}
                        style={{width: "360px"}}
                    >
                        <Checkbox className="text">Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 2, span: 16}}>
                        <Button className="flex items-center text-lg" type="default" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 1, span: 16}}>
                        <Button className="text-lg" type="link" htmlType="submit" onClick={() => navigate('/register')}>
                            Ещё нет аккаунта? Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </>
    );
};

export default SignInForm;