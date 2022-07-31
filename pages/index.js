/*
*  TODO 没有写表单必填项
*  TODO 没有写表单提示信息
*  TODO 没有写短信倒计时
*  TODO 没有写提交的接口
*  TODO 没有写验证码的接口
*
* */
import useSWR from 'swr'
import {useSpring, animated} from 'react-spring'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.scss'
import Players from "../components/Players/Players";
import {useState} from "react";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const router = useRouter()
    const props = useSpring({to: {opacity: 1}, from: {opacity: 0}})
    const {data, error} = useSWR('/api/hello', fetcher)

    // 窗口
    const [showWindow, setShowWindow] = useState(false)

    // 表单
    const [form, setForm] = useState({username: '', email: '', code: ''})

    function handleClickOneWindow() {
        setShowWindow(true);
    }

    function handleClickClosureWindow() {
        setShowWindow(false);
    }

    function handleChangInput(event,type) {
        if(type === 'username') return console.log(event.target.value)
    }

    /*数据请求拦截 与 loading加载*/
    if (!data) return <div>Loading...</div>
    if (error) return <div>报错了,刷新看看？...</div>

    return <animated.div style={props}>
        <div className={`${styles.container} mt-20 w-full`}>
            <main className={`${styles.main}`}>
                <h1 className={styles.title}>
                    这是服务器官网: <a>HuaYu!</a>
                </h1>
                <div className='text-2xl mt-2 w-1/2'>服务器宣传语: <span
                    className='text-red-400'>{data.data.motd?.clean} </span></div>
                <div className='text-4xl mt-10'>在线玩家</div>
                <div className='text-xl'>在线人数: {data.data.players?.online}</div>

                <div className='mt-2 flex-wrap w-5/6'>
                    <Players sample={data.data.players?.sample}/>
                </div>

                <div
                    className='w-1/2 h-60 mt-10 flex flex-col justify-center items-center  border-2 border-neutral-100 '>
                    <h1 className='text-3xl'>白名单申请!</h1>
                    <div className='flex mt-2'>
                        <div className='h-10'>
                            <input
                                onChange={handleChangInput.bind(this,'username')}
                                value={form.username}
                                type='type'
                                placeholder='请输入游戏ID'
                                className='
                                h-10 pl-3 border-2
                                rounded-md cursor-pointer'
                            ></input>
                        </div>
                        <div>
                            <button
                                onClick={handleClickOneWindow}
                                type='submit'
                                className='
                                 ml-2  h-10  w-20 rounded-md bg-purple-600 text-white
                                 hover:bg-purple-800'
                            >提交
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {showWindow && <div
                className='
                 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90
                 flex justify-center items-center'
            >
                <div className='
                  w-1/3 h-1/3
                  rounded-xl
                  bg-gray-800 text-white
               '>
                    <div>
                        <div onClick={handleClickClosureWindow} className='flex justify-end p-5'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 text-white cursor-pointer hover:text-neutral-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>

                        <div className='
                        text-3xl pt-5
                        text-center
                    '>
                            填写以下信息
                        </div>

                        <div className='
                          mt-5
                          flex  items-center flex-col
                     '>
                            <div className='
                        flex justify-center flex-col
                        '>

                                <label className='flex mt-3'>
                                    <div className='text-right w-28'>QQ邮箱：</div>
                                    <div className='flex-1'>
                                        <input
                                            value={form.email}
                                            className='rounded-md pl-3 border-2 bg-gray-800 placeholder:text-white'
                                            placeholder='输入QQ邮箱'/>
                                    </div>
                                </label>
                                <label className='flex mt-5'>
                                    <div className='text-right w-28'>QQ邮箱验证码：</div>
                                    <div className='flex-1 mr-3'>
                                        <input
                                            value={form.code}
                                            className='rounded-md pl-3 border-2 bg-gray-800 placeholder:text-white'
                                            placeholder='输入邮箱验证码'/>
                                    </div>
                                    <div className='w-30'>发送验证码</div>
                                </label>
                                <div className='flex justify-center items-center mt-7'>
                                    <button
                                        className='w-28 h-8 border-2 border-gray-400 rounded-md hover:border-gray-600'>提交
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}


            {/*<label className='pl-5 mt-5 justify-center flex items-center w-full '>*/}
            {/*    <span className='pr-2'>QQ邮箱：</span>*/}
            {/*    <input*/}
            {/*        placeholder='输入QQ邮箱'*/}
            {/*        className='*/}
            {/*                        w-46 h-10*/}
            {/*                        rounded-md text-white*/}
            {/*                        border-2*/}
            {/*                        bg-gray-900*/}
            {/*                        pl-5*/}
            {/*                        placeholder:text-white*/}
            {/*                    '*/}
            {/*    />*/}
            {/*</label>*/}
            {/*<label className='mt-5 justify-center flex items-center w-full '>*/}
            {/*    <span>邮箱验证码：</span>*/}
            {/*    <input*/}
            {/*        placeholder='输入QQ邮箱验证码'*/}
            {/*        className='*/}
            {/*                        w-46 h-10*/}
            {/*                        rounded-md text-white*/}
            {/*                        border-2*/}
            {/*                        border-2*/}
            {/*                        bg-gray-900*/}
            {/*                        pl-5*/}
            {/*                        placeholder:text-white*/}
            {/*                    '*/}
            {/*    />*/}
            {/*    <button className>重新发送验证码</button>*/}
            {/*</label>*/}
            {/*<label className='mt-5'>*/}
            {/*    <button className='*/}
            {/*                 mt-5 ml-10*/}
            {/*                 h-10*/}
            {/*                 rounded-md*/}
            {/*                 w-40*/}
            {/*                 bg-gray-900*/}
            {/*                 text-white*/}
            {/*                 hover:bg-gray-600*/}
            {/*              '>提交*/}
            {/*    </button>*/}
            {/*</label>*/}


            {/* 先屏蔽调整链接*/}
            {/*<div className="flex flex-row justify-center mt-10">*/}
            {/*    <div className='flex w-5/6 flex-wrap justify-center '>*/}
            {/*        <Card title='服务器规则' handleClickPage={handleClickPage.bind(this,'/docs/introduce')} />*/}
            {/*        <Card title='熊孩子uid' />*/}
            {/*        <Card*/}
            {/*            bgColor={'card-red'}*/}
            {/*            title='如何使用指令'*/}
            {/*            icon='CheckOutlined'*/}
            {/*        />*/}
            {/*        <Card*/}
            {/*            bgColor={'card-red'}*/}
            {/*            title='版本更新信息'*/}
            {/*            icon='CheckOutlined'*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>


    </animated.div>

}
