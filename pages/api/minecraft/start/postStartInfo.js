import {query} from "../../../../lib/startDB";

export default async function postStartInfo(req,res) {
    if(req.method !== 'POST') return res.status(500).json({code: '2', msg: '请使用post请求'})

    const codeSql = `
        SELECT b.name, a.stat,a.val FROM 
            stats as a INNER JOIN player as b 
        ON  a.uuid = b.uuid 
        WHERE (a.stat = 'z:pickaxe' OR a.stat = 'z:axe' OR a.stat = 'MOB_KILLS') 
        AND b.name = '${req.body.username}' ORDER BY a.val DESC
    `

    const valuesParams = []
    const data = await query({query: codeSql, values: valuesParams})

    res.status(200).json({code: '1', msg: '返回玩家挖掘,砍伐数据', data: data})

}