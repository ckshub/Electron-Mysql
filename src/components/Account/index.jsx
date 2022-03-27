import { Form, Input, Button, Checkbox } from 'antd';
const { ipcRenderer } = window.require('electron');
//multipleStatements: true  此功能打开可同时使用多条  查询语句
const Account = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        // 通过ipcRenderer.send发起一个send请求，将sql语句作为args传递过去
        ipcRenderer.send('send', 'select * from caggs');
        // 渲染进程监听reply
        ipcRenderer.on('reply', (event, args) => {
            // 获取的args就是sql中查询出来的数据
            // state.count = args.length
            console.log(args)
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <button onClick={onFinish}></button>
        // <Form
        //     name="basic"
        //     labelCol={{ span: 8 }}
        //     wrapperCol={{ span: 16 }}
        //     initialValues={{ remember: true }}
        //     onFinish={onFinish}
        //     onFinishFailed={onFinishFailed}
        //     autoComplete="off"
        // >
        //     <Form.Item
        //         label="Username"
        //         name="username"
        //         rules={[{ required: true, message: 'Please input your username!' }]}
        //     >
        //         <Input />
        //     </Form.Item>

        //     <Form.Item
        //         label="Password"
        //         name="password"
        //         rules={[{ required: true, message: 'Please input your password!' }]}
        //     >
        //         <Input.Password />
        //     </Form.Item>

        //     <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        //         <Checkbox>Remember me</Checkbox>
        //     </Form.Item>

        //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        //         <Button type="primary" htmlType="submit">
        //             Submit
        //         </Button>
        //     </Form.Item>
        // </Form>
    );
};
export default Account 