import {useSpring, animated} from 'react-spring'
import { useRouter } from 'next/router'


export default function SlugPages() {
    const router = useRouter()
    console.log(router.query.slug);


    const props = useSpring({to: {opacity: 1}, from: {opacity: 0}})

    return <animated.div style={props}>

    </animated.div>


}