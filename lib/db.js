import mysql from 'mysql2/promise'

export async function query({query,values=[]}) {
    //创建链接
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    })

    try {
        const [results] = await con.execute(query,values);
        con.end();//关闭链接
        return results;
    } catch (err) {
        throw Error(err.message)
        return { err };
    }



    // res.status(200).json({code: '1', msg:'请求成功'})
}