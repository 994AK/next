import PlayersItem from "./PlayersItem";

export default function Players({sample=[]}) {
    return (
        <div className='flex
        flex-col
        md:w-full md:flex-wrap md:flex-row ' >{
            <PlayersItem sample={sample} />
        }</div>
    )
}