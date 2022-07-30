import {useSpring, animated} from 'react-spring'
import {useRouter} from 'next/router'
import {Card} from "../components/Card";
import styles from '../styles/Home.module.scss'

export default function Home() {
    const router = useRouter()
    const props = useSpring({to: {opacity: 1}, from: {opacity: 0}})

    function handleClickPage (path) {
      router.push(path);
    }

    return <animated.div style={props}>
        <div className={`${styles.container} mt-20 w-full`}>
            <main className={`${styles.main}`}>
                <h1 className={styles.title}>
                    这是服务器官网: <a>HuaYu!</a>
                </h1>
            </main>
            <div className="flex flex-row justify-center mt-10">
                <div className='flex w-5/6 flex-wrap justify-center '>
                    <Card title='服务器规则' handleClickPage={handleClickPage.bind(this,'/docs/serverRules')} />
                    <Card title='熊孩子uid' />
                    <Card
                        bgColor={'card-red'}
                        title='如何使用指令'
                        icon='CheckOutlined'
                    />
                    <Card
                        bgColor={'card-red'}
                        title='版本更新信息'
                        icon='CheckOutlined'
                    />
                </div>

            </div>
        </div>


    </animated.div>

}
