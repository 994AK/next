// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {status} from "minecraft-server-util";
import {runMiddleware} from "../../lib/cors";
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

export default async function handler(req, res) {
    const data = await status('159.75.79.184', 25565)

    await runMiddleware(req,res,cors)

    try {
        res.status(200).json({ code:'1', state:'请求成功', data: data })
    } catch (err) {
        res.status(500).json({ code:'2', state:'请求成功', msg:err })
    }


}
