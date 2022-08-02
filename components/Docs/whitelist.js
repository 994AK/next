import {useState} from "react";
import Dialog from "../dialog";
import WhitelistFrom from './whitelistFrom'

// From表单相关逻辑
const useFromUseEffect = () => {
    // 表单
    const [form, setForm] = useState({username: ''})

    //校验
    const [check, setCheck] = useState(false)

    // 窗口
    const [showWindow, setShowWindow] = useState(false)

    //重置
    function resetForm() {
        setForm({username: ''})
    }

    function handleChangInput(event) {
        if (event.target.name === 'username') {
            setCheck(false)
            setForm({
                username: event.target.value
            })
        }
    }

    function handleClickOneWindow() {
        if (!form.username) return setCheck(true)
        setShowWindow(true);
    }

    function handleClickClosureWindow() {
        setShowWindow(false);
    }

    return {
        handleChangInput,
        handleClickOneWindow,
        handleClickClosureWindow,
        showWindow,
        resetForm,
        form,
        check
    }
}

export default function Whitelist() {

    const {
        handleChangInput,
        handleClickOneWindow,
        handleClickClosureWindow,
        showWindow,
        form,
        resetForm,
        check
    } = useFromUseEffect()

    return (
        <div>
            <div className='pt-5 pb-10 md:pt-10 md:pb-10
            flex flex-col justify-center items-center  border-2 border-neutral-100
            '>
                <h1 className='text-3xl'>白名单申请!</h1>
                <div className='flex mt-2'>
                    <div className='h-10'>
                        <input
                            onChange={handleChangInput}
                            name='username'
                            value={form.username}
                            type='type'
                            placeholder='请输入游戏ID'
                            className={`
                            transition duration-500 ease-in-out 
                            outline-none h-10 pl-3 border-2 
                            rounded-md cursor-pointer 
                            focus:border-blue-700
                            ${check && 'border-red-500 '}`}
                        ></input>
                    </div>
                    <div>
                        <button
                            onClick={handleClickOneWindow}
                            type='submit'
                            className='ml-2  h-10  w-20 rounded-md bg-purple-600 text-white hover:bg-purple-800'
                        >提交
                        </button>
                    </div>
                </div>
                {check && <div className='mt-2 text-red-600'>您还没有输入游戏ID</div>}
            </div>

            {/* 对话框 */}
            {showWindow && <Dialog>
                <WhitelistFrom
                    handleClickClosureWindow={handleClickClosureWindow}
                    resetForm={resetForm}
                    name={form.username}
                />
            </Dialog>}
        </div>)
}