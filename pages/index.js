
import useSWR from 'swr'
import {useSpring, animated} from 'react-spring'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.scss'
import Players from "../components/Players/Players";
import Whitelist from "../components/Docs/whitelist";


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const router = useRouter()
    const props = useSpring({to: {opacity: 1}, from: {opacity: 0}})
    const {data, error} = useSWR('/api/hello', fetcher)


    /*数据请求拦截 与 loading加载*/
    if (!data) return <div>Loading...</div>
    if (error) return <div>报错了,刷新看看？...</div>

    return <animated.div style={props}>
        <div className={`${styles.container} mt-20 w-full`}>
            <main className={`${styles.main}`}>
                <h1 className='text-3xl md:text-4xl'>
                    这是服务器官网: <a>HuaYu!</a>
                </h1>
                <div className='text-3xl md:text-2xl mt-2 md:w-1/2'>服务器宣传语: <span
                    className='text-red-400 text-xs md:text-2xl'>{data.data.motd?.clean} </span></div>
                <div className='text-3xl md:text-4xl mt-10'>在线玩家</div>
                <div className='text-xl'>在线人数: {data.data.players?.online}</div>

                <div className='mt-2 flex-wrap w-5/6 '>
                    <Players sample={data.data.players?.sample}/>
                </div>

                <div className='mt-5 mb-5 w-full md:w-1/2 md:h-60 md:mt-10 md:mb-10'>
                    <Whitelist />
                </div>
            </main>
        </div>
    </animated.div>

}
