import {Button, Checkbox, Form, Input, InputNumber, notification, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@firebase/config.js";
import {FieldType, NotificationType} from "@types";
import { addNewUser } from "@firebase/index.js";

const SignUpForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const onSignUp = async (values: FieldType) => {
        const {username, password} = values
        if (typeof username === "string") {
            if (password != null) {
                await createUserWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        addNewUser(user.uid, user.email)
                        navigate('/')
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        openNotification('warning', errorMessage)
                    });
            }
        }
    }

    const openNotification = (type: NotificationType, error: string) => {
        api[type]({
            message: 'Регистрация не удалась',
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
                onFinish={onSignUp}
                autoComplete="off"
                className="h-screen w-1/2 bg-white flex flex-col justify-center items-center basis-1/3"
            >
                <div className="text-2xl mb-5 ml-10 font-bold">Регистрация</div>
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
                    label="Телефон: "
                    rules={[{required: false, message: 'Введите ваш телефон!'}]}
                    style={{width: "360px"}}
                >
                    <Space direction="vertical">
                        <InputNumber addonBefore="+7" style={{width: "180px"}} controls/>
                    </Space>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{offset: 4, span: 16}}
                >
                    <Checkbox style={{width: "180px"}}>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 0, span: 16}}>
                    <Button type="default" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 0, span: 16}}>
                    <Button type="link" onClick={() => navigate('/')}>
                        Уже есть аккаунт? Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignUpForm;