import {query} from "lib/db";
import {Rcon} from "rcon-client"
import {runMiddleware} from "lib/cors";

import Cors from 'cors'

const cors = Cors({
    methods: ['POST','GET', 'HEAD'],
})

/*
* 1. 先查询他输入的code与数据库一样
* 2. 如果一样就给他过
* 3. 把信息录入到数据库。
* 4. 执行RCON启动白名单
*
* */

async function querySql(email) {
    // 查询数据库匹配code
    const codeSql = `SELECT code FROM emailauth WHERE email='${email}';`
    const valuesParams = []
    const data = await query({query: codeSql, values: valuesParams})
    return data[0].code
}

async function insert(username, email) {
    // 先查询是否存在
    const codeSql = `SELECT email FROM whitelist  WHERE email='${email}';`
    const valuesParams = []
    const data = await query({query: codeSql, values: valuesParams})

    if (data.length > 0) {
        // 存在了
        return 0
    } else {
        // 不存在 就插入
        try {
            const insertSql = `INSERT INTO whitelist (username,email) VALUES ('${username}','${email}');`
            await query({query: insertSql})
            console.log('添加数据库成功')
            return 1
        } catch (err) {
            console.log(err);
        }
    }

}

async function deleteCode(email) {
    const deleteCodeSql = `DELETE from emailauth WHERE email='${email}';`
    await query({query: deleteCodeSql})
    console.log('code删除成功')
}


export default async function postWhitelist(req, res) {
    if (req.method !== 'POST') return res.status(500).json({code: '2', msg: '请使用post请求'})

    await runMiddleware(req,res,cors)

    const rcon = await Rcon.connect({
        host: process.env.RCON_HOST, port: process.env.RCON_PORT, password: process.env.RCON_PASS
    })

    const {username, email, code} = req.body

    try {
        // 查询code
        const sqlCode = await querySql(email, code)

        // 匹配
        if (sqlCode === code) {
            const start = await insert(username, email)
            if (start) {
                let responses = await Promise.all([
                    rcon.send(`qwl add ${username}`),
                    rcon.send(`me ${username} 添加了白名单！又来了一位！`),
                ])
                for (const response of responses) {
                    console.log(response)
                }
                await rcon.end()
                await deleteCode(email)
                res.status(200).json({code: '1', msg: '白名单添加成功', data: {username, email}})
            } else  {
                res.status(200).json({code: '2', msg: '该邮箱已添加过白名单', data: null})
            }
        } else {
            res.status(200).json({code: '2', msg: '验证码不正确哦！请检查QQ邮件的正确验证码', data: null})
        }

        // const querySql = 'SELECT * FROM whitelist'
        // const valuesParams = []
        // const data = await query({query: querySql, values: valuesParams})
        // res.status(200).json({code: '1', msg: '请求成功', data})

    } catch (err) {
        console.log(err)
        res.status(500).json({code: '2', msg: err})
    }


    // res.status(200).json({code: '1', msg:'请求成功'})
}
