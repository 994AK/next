export default function Dialog({children}) {
    return <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90
    flex justify-center items-center'>
        {children}
    </div>
}