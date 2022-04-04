import { useEffect, useState } from 'react';
import './index.css'
import { Form, Input, Button, List, Divider } from 'antd';
const { ipcRenderer } = window.require('electron');
//multipleStatements: true  此功能打开可同时使用多条  查询语句
const Account = () => {
    const [data, setData] = useState([])
    const [SQL, setSQL] = useState('')
    const [SqlForm] = Form.useForm();
    const searchData = (values) => {
        let select = 'select * from caggs '
        // 通过ipcRenderer.send发起一个send请求，将sql语句作为args传递过去
        let hasSql = false
        if (values.SphericityFrom !== undefined && values.SphericityTo !== undefined) {
            if (hasSql) {
                select += 'and'
            } else {
                select += 'where'
            }
            select += ` Sphericity between ${values.SphericityFrom} and ${values.SphericityTo} `
            hasSql = true
        }
        if (values.FlatnessFrom !== undefined && values.FlatnessTo !== undefined) {
            if (hasSql) {
                select += 'and'
            } else {
                select += 'where'
            }
            select += ` Flatness between ${values.FlatnessFrom} and ${values.FlatnessTo} `
            hasSql = true

        }
        if (values.ElongationFrom !== undefined && values.ElongationTo !== undefined) {
            if (hasSql) {
                select += 'and'
            } else {
                select += 'where'
            }
            select += ` Elongation between ${values.ElongationFrom} and ${values.ElongationTo} `
            hasSql = true
        }
        if (values.AngularityIndexFrom !== undefined && values.AngularityIndexTo !== undefined) {
            if (hasSql) {
                select += 'and'
            } else {
                select += 'where'
            }
            select += ` Angularity_Index between ${values.AngularityIndexFrom} and ${values.AngularityIndexTo} `
            hasSql = true
        }
        ipcRenderer.send('send', select);
        setSQL(select)
        localStorage.setItem('sql', JSON.stringify(values)) // 保存sql记录
        // 渲染进程监听reply
        ipcRenderer.on('reply', (event, args) => {
            // 获取的args就是sql中查询出来的数据
            // state.count = args.length
            setData(args)
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const value = JSON.parse(localStorage.sql) || ''
        SqlForm.setFieldsValue(value)
        searchData(value)
    }, [])
    return (
        <>
            {/* <Form
                name="basic"
                labelCol={{ div: 8 }}
                wrapperCol={{ div: 16 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, div: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, div: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form> */}
            <Form
                name="basic"
                labelCol={{ div: 8 }}
                wrapperCol={{ div: 16 }}
                initialValues={{ remember: true }}
                onFinish={searchData}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={SqlForm}
            >

                <div className='select-input'>
                    <div className='select-key'>Sphericity：</div>
                    <div className='select-input-value'>
                        <div>from</div>
                        <Form.Item
                            name="SphericityFrom"
                        >
                            <Input min={0} />
                        </Form.Item>
                        <div>to</div>
                        <Form.Item
                            name="SphericityTo"
                        >
                            <Input min={0} />
                        </Form.Item>
                    </div>

                </div>
                <div className='select-input'>
                    <div className='select-key'>Flatness：</div>
                    <div className='select-input-value'>

                        <div>from</div>
                        <Form.Item
                            name="FlatnessFrom"
                        >
                            <Input min={0} />
                        </Form.Item>
                        <div>to</div>
                        <Form.Item
                            name="FlatnessTo"
                        >
                            <Input min={0} />
                        </Form.Item>
                    </div>

                </div>
                <div className='select-input'>
                    <div className='select-key'>Elongation：</div>
                    <div className='select-input-value'>
                        <div>from</div>
                        <Form.Item
                            name="ElongationFrom"
                        >
                            <Input min={0} />
                        </Form.Item>
                        <div>to</div>
                        <Form.Item
                            name="ElongationTo"
                        >
                            <Input min={0} />
                        </Form.Item>
                    </div>

                </div>
                <div className='select-input'>
                    <div className='select-key'>Angularity Index：</div>
                    <div className='select-input-value'>
                        <div>from</div>
                        <Form.Item
                            name="AngularityIndexFrom"
                        >
                            <Input min={0} />
                        </Form.Item>
                        <div>to</div>
                        <Form.Item
                            name="AngularityIndexTo"
                        >
                            <Input min={0} />

                        </Form.Item>
                    </div>
                </div>
                <Form.Item wrapperCol={{ offset: 8, div: 16 }}>
                    <Button style={{ 'position': 'absolute', 'right': '90px' }} htmlType="button" onClick={() => {
                        SqlForm.resetFields();
                    }}>
                        Reset
                    </Button>
                    <Button style={{ 'position': 'absolute', 'right': '0px' }} type="primary" htmlType="submit">
                        Inquire
                    </Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">数据展示</Divider>
            <span style={{ 'fontSize': '16px' }}>SQL语句：{SQL}</span>
            <List
                className='data-list'
                header={<div>总共：{data.length}条数据</div>}
                footer={<div>到底啦~</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        {item.Image}
                    </List.Item>
                )}
            />
        </>
    );
};
export default Account 