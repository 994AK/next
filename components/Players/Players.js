import PlayersItem from "./PlayersItem";

export default function Players({sample=[]}) {
    return (
        <div className='flex w-full flex-wrap' >{
            <PlayersItem sample={sample} />
        }</div>
    )
}