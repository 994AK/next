import useSWR from 'swr'
import {useSpring, animated} from 'react-spring'
import {useRouter} from 'next/router'
import {Card} from "../components/Card";
import styles from '../styles/Home.module.scss'
import Players from "../components/Players/Players";

const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Home() {
    const router = useRouter()
    const props = useSpring({to: {opacity: 1}, from: {opacity: 0}})
    const {data, error} = useSWR('/api/hello', fetcher)
    /*数据请求拦截 与 loading加载*/
    if (!data) return <div>Loading...</div>
    if (error) return <div>报错了,刷新看看？...</div>


    // function handleClickPage (path) {
    //   router.push(path);
    // }

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

                    <form className='flex mt-2'>
                        <div className='h-10'>
                           <input
                               type='type'
                               placeholder='请输入游戏ID'
                               className='
                                h-10 pl-3 border-2
                                rounded-md cursor-pointer'
                           ></input>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='
                                 ml-2  h-10  w-20 rounded-md bg-purple-600 text-white
                                 hover:bg-purple-800'
                            >提交
                            </button>
                        </div>
                    </form>
                </div>
            </main>


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
