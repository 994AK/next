import {useState} from "react";
import toast from 'react-hot-toast';

const useWhitelistFromEffect = (name, handleClickClosureWindow, resetForm) => {
    const [emailForm, setEmailForm] = useState({email: '', code: ''})

    // 默认不可输入
    const [showDisabled, setShowDisabled] = useState(true)

    // 校验
    const [validationFrom, setValidationFrom] = useState({
        email: {
            state: false,
            msg: ''
        },
        code: {
            state: false,
            msg: ''
        },
    })

    // 验证码
    const [codeMsg, setCodeMsg] = useState('发送验证码')


    // 验证码请求
    function postWhitelistCode(email, username) {
        // post 发送验证码
        fetch(process.env.FETCH_SEVER + 'api/minecraft/postWhitelistCode', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, username})
        }).then(data => {
            toast.success('QQ邮箱已发送成功了!请注意查收');
        })
    }

    // 提交表单请求
    function postWhitelist(username, email, code) {
        // post 发送验证码
        fetch(process.env.FETCH_SEVER + 'api/minecraft/postWhitelist', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, username, code})
        })
            .then(response => response.json())
            .then(res => {
                if (res.code === '2') return toast.error(res.msg)
                toast.success(res.msg);
                handleClickClosureWindow();
                //重置
                resetForm();
                setValidationFrom({
                    email: {
                        state: false,
                        msg: ''
                    },
                    code: {
                        state: false,
                        msg: ''
                    },
                })
            })
    }

    function validation(name, state, msg) {
        const validationObj = {...validationFrom}
        validationObj[name].state = state;
        validationObj[name].msg = msg;
        setValidationFrom(validationObj)
    }

    function handleChangeEmailForm(event) {
        const formEmail = {...emailForm}

        if (event.target.name === 'email') {
            formEmail.email = event.target.value
            setEmailForm(formEmail)
            validation('email', false)
        }

        if (event.target.name === 'code') {
            formEmail.code = event.target.value
            setEmailForm(formEmail)
            validation('code', false)
        }
    }

    // 验证码
    function handleClickCode() {
        const {email, username} = {...emailForm, username: name}
        const regex = /[1-9]\d{5,10}@qq\.com/

        const regexEmail = () => {
            validation('email', true, '请输入正确的QQ邮箱')
            setShowDisabled(true)
        }

        // 发送验证码逻辑
        const regexPass = () => {
            setCodeMsg('重新发送验证码')
            setShowDisabled(false)
            postWhitelistCode(email, username)
        }

        !regex.test(email) ? regexEmail() : regexPass()

    }

    function handleFromSubmit() {
        const {username, email, code} = {...emailForm, username: name} || {}

        if (!email) validation('email', true, '请输入QQ邮箱')

        if (!code) validation('code', true, '请先发送验证码')

        if (username && email && code) {
            postWhitelist(username, email, code)
        }
    }

    return {
        handleChangeEmailForm,
        handleClickCode,
        handleFromSubmit,
        validationFrom,
        showDisabled,
        emailForm,
        codeMsg
    }
}

export default function WhitelistFrom({handleClickClosureWindow, name, resetForm}) {

    const {
        handleChangeEmailForm,
        handleClickCode,
        handleFromSubmit,
        validationFrom,
        showDisabled,
        emailForm,
        codeMsg
    } = useWhitelistFromEffect(name, handleClickClosureWindow, resetForm)


    return (
        <div className='
        transition-all duration-300 ease-in-out
        h-2/5 md:w-1/3 md:h-2/5 rounded-xl bg-gray-800 text-white
        '>
            <div>
                <div onClick={handleClickClosureWindow} className='flex justify-end p-5'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="h-5 w-5 text-white cursor-pointer hover:text-neutral-200" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div className='text-xl md:text-3xl md:pt-5 text-center'> 填写以下信息</div>
                <div className='mt-5 flex items-center flex-col'>
                    <div className='flex justify-center flex-col'>
                        <label className='flex mt-3'>
                            <div className='text-right w-28 text-base md:ml-2 md:mt-2'>QQ邮箱：</div>
                            <div className='flex-1 flex flex-col md:h-16 '>
                                <input
                                    className='
                                    h-10
                                    md:w-44
                                    transition-all duration-500 ease-in-out
                                    focus:border-blue-700
                                    outline-none rounded-md pl-3 border-2 bg-gray-800 placeholder:text-white'
                                    name='email'
                                    placeholder='输入QQ邮箱'
                                    onChange={handleChangeEmailForm}
                                    value={emailForm.email || ''}
                                />
                                {validationFrom.email.state && <span className='text-red-600 md:mt-1 md:ml-3'>
                                    {validationFrom.email.msg}
                                </span>}

                            </div>
                        </label>
                        <label className='flex mt-5'>
                            <div className='text-right w-29 md:mt-2 md:text-base'>QQ邮箱验证码：</div>
                            <div className='flex-1 mr-3 flex flex-col md:h-16'>
                                <input
                                    className={`
                                    h-10
                                    md:w-44
                                    transition-all duration-500 ease-in-out
                                    focus:border-blue-700
                                    outline-none rounded-md pl-3 border-2 bg-gray-800 placeholder:text-white
                                    ${showDisabled && 'bg-neutral-700 placeholder:text-neutral-400'}`}
                                    placeholder='输入邮箱验证码'
                                    name='code'
                                    disabled={showDisabled}
                                    onChange={handleChangeEmailForm}
                                    value={emailForm.code || ''}
                                />

                                {validationFrom.code.state && <span className='text-red-600 md:mt-1 md:ml-3'>
                                    {validationFrom.code.msg}
                                </span>}

                            </div>
                            <div className='w-30 text-xs mt-1.5 pr-3 md:text-base md:mt-2 md:pr-0'
                                 onClick={handleClickCode}>
                                {codeMsg}
                            </div>
                        </label>
                        <div className='flex justify-center items-center mt-7'>
                            <button
                                onClick={handleFromSubmit}
                                className='w-28 h-10 border-2 border-gray-400 rounded-md hover:border-gray-600'>提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}