import {Col, Row, Menu} from 'antd';
import styles from './header.module.css'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'

export const Header = ({title}) => {
    const router = useRouter()
    console.log(router.pathname.split('/')[1]);

    const items = [
        {
            label: '首页',
            key: 'home',
        },
        {
            label: '指令',
            key: 'instruction',
        },
        {
            label: '公告',
            key: 'server',
        }
    ]

    const [current, setCurrent] = useState(router.pathname.split('/')[1] || 'home');

    const onClick = (e) => {
        setCurrent(e.key);
        if(e.key === 'home') {
            return  router.push('/')
        }
        router.push('/' + e.key)
    };

    return (
        <Row>
            <Col className={styles.col} justify="center" span={8}>
               <div className={styles.title}>{title}</div>
            </Col>
            <Col className={styles.col} span={8}>
                <Menu className={styles.menu} mode="horizontal" onClick={onClick} selectedKeys={[current]}  items={items} />
            </Col>
            <Col className={styles.col} span={8}>

            </Col>
        </Row>
    )
}