export default function PlayersItem({sample = []}) {
    const sampleArr = sample.map(item => {
        return  {
            ...item,
            showUser:  false
        }
    });
    return sampleArr.map(item => {
        const path = `https://mc-heads.net/avatar/${item.name}/100`
        return <div key={item.id} className='flex
           mt-5
           md:mt-0
           md:w-1/3 md:pt-5 md:pb-5 md:pl-36'>
            <div className='w-10'>
                <img src={path} alt="Picture of the author"/>
            </div>
            <div className='pl-2 items-center text-2xl'>
                {item.name}
            </div>

            {item.showUser && <div>123123123</div>}
        </div>

    })
}