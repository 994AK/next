import {useState} from "react";

const usePlayersStateEffect = (sample = []) => {
    const [sampleState, setSampleState] = useState(sample)
    const [playerState, setPlayerState] = useState([])

    document.querySelector('body').addEventListener('click', function (e) {
        sampleState.map(item => item.showState = false);
        setSampleState([...sampleState])
    })

    function handleClickImg(name) {
        fetch('api/minecraft/start/postStartInfo', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: name})
        })
            .then(response => response.json())
            .then(res => {
                if (res.code !== "1") return
                setPlayerState(res.data)
            });
    }

    function handleClickShowState(item) {
        sampleState.map(item => item.showState = false);
        sampleState.find(v => v.name === item.name).showState = true;
        setSampleState([...sampleState])
    }

    return {
        playerState,
        sampleState,
        handleClickShowState,
        handleClickImg,
    }
}


export default function PlayersItem({sample = []}) {

    const {playerState, sampleState, handleClickImg, handleClickShowState} = usePlayersStateEffect(sample)

    function handleClick(item, event) {
        event.stopPropagation()
        handleClickImg(item.name);
        handleClickShowState(item);
    }

    return sampleState.map(item => {
        const path = `https://mc-heads.net/avatar/${item.name}/100`
        return <div
            key={item.id}
            className='flex relative
                mt-5
                md:mt-0
                md:w-1/3 md:pt-5 md:pb-5 md:pl-36
                cursor-pointer
                '
            onClick={handleClick.bind(this, item)}
        >
            <div className='w-10'>
                <img src={path} alt="Picture of the author"/>
            </div>
            <div className='pl-2 items-center text-2xl'>
                {item.name}
            </div>

            {item.showState && <div className='
                absolute  top-16  md:w-1/2 md:h-52
                bg-black bg-opacity-80
                z-10
            '>
                {playerState.length === 0 &&
                    <div className='
                        flex md:w-full md:h-full
                        justify-center items-center
                        text-xl text-white
                    '>
                        玩家还没有统计数据
                    </div>
                }
                <div className='text-white'>
                    {playerState.map(item => {
                        return <div key={item.stat}>
                            <div>{item.stat === 'MOB_KILLS' && '总共击杀怪物:' + item.val} </div>
                            <div>{item.stat === 'z:pickaxe' && '总共挖掘:' + item.val} </div>
                            <div>{item.stat === 'z:axe' && '总共砍伐:' + item.val} </div>
                        </div>
                    })}
                </div>
            </div>}
        </div>

    })
}