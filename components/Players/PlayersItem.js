export default function PlayersItem({sample=[]}) {
    return sample.map(item => {
        const path = `https://mc-heads.net/avatar/${item.name}/100`
        console.log(path)
        return <div key={item.id} className='flex  w-1/3 pt-5 pb-5 pl-36
                    '>
            <div className='w-10' >
                <img src={path} alt="Picture of the author"  />
            </div>
            <div className='pl-2 items-center text-2xl'>
                {item.name}
            </div>
        </div>

    })
}