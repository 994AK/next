// import {query} from "../../../lib/db";

export default async function postWhitelist(req, res) {
    if (req.method !== 'POST') return res.status(500).json({code: '2', msg: '请使用post请求'})

    console.log(req.body.id)
    try {
        // const querySql = 'SELECT * FROM whitelist'
        // const valuesParams = []
        // const data = await query({query: querySql, values: valuesParams})
        // res.status(200).json({code: '1', msg: '请求成功', data})
        res.status(200).json({code: '1', msg: '请求成功'})
    } catch (err) {
        console.log(err)
        res.status(500).json({code: '2', msg: err})
    }


    // res.status(200).json({code: '1', msg:'请求成功'})
}
