import {createTransport} from 'nodemailer'
import {query} from "../../../lib/db";
import {runMiddleware} from "../../../lib/cors";

import Cors from 'cors'

const cors = Cors({
    methods: ['POST','GET', 'HEAD'],
})

async function mysql(username, email, codeName) {
    /*
    *  先查询他是否插入过了这条数据
    * */
    const querySql = `SELECT email from emailauth WHERE email='${email}';`
    const valuesParams = []
    const data = await query({query: querySql, values: valuesParams})
    if(data.length === 0) {
        // 首次插入
        const insert = `INSERT INTO emailauth (username,email,code) VALUES ('${username}','${email}','${codeName}');`
        await query({query: insert, values: []})
        console.log('插入成功')
    } else {
        // 多次插入
        const update = `UPDATE emailauth set code='${codeName}' WHERE email='${email}';`
        await query({query: update, values: []})
        console.log('更新成功')
    }

}

export default async function postWhitelistCode(req, res) {
    if (req.method !== 'POST') return res.status(500).json({code: '2', msg: '请使用post请求'})

    await runMiddleware(req,res,cors)

    try {
        const {username, email} = req.body || {};

        if (!username || !email) res.status(400).json({code: 2, msg: '检查参数是否完整'})

        //验证码
        let codeName = Math.random().toString().substr(2, 4)

        //插入数据库
        await mysql(username, email, codeName);

        let transporter = createTransport({
            service: "QQ",
            auth: {
                // 发件人邮箱账号
                user: '2943522391@qq.com',
                //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
                pass: 'dmyoxypllojwdghf'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Hi,${username},HuaYu服务器邀请函🥰" <2943522391@qq.com>`, // 发件人
            to: `${email}`, // 收件人
            subject: `您的验证码:${codeName}`, // Subject line
            text: "🙂感谢您来游玩本服!", // plain text body
            html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
<head>

<title>HuaYu服务器</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0 " />
<meta name="format-detection" content="telephone=no"/>
<style type="text/css">
body {
margin: 0 !important;
padding: 0 !important;
-webkit-text-size-adjust: 100% !important;
-ms-text-size-adjust: 100% !important;
-webkit-font-smoothing: antialiased !important;
}
img {
border: 0 !important;
outline: none !important;
}
p {
Margin: 0px !important;
Padding: 0px !important;
}
table {
border-collapse: collapse;
mso-table-lspace: 0px;
mso-table-rspace: 0px;
}
td, a, span {
border-collapse: collapse;
mso-line-height-rule: exactly;
}
.ExternalClass * {
line-height: 100%;
}
.defaultlink a {
color: inherit !important;
text-decoration: none !important;
}
span.MsoHyperlink {
mso-style-priority: 99;
color: inherit;
}
span.MsoHyperlinkFollowed {
mso-style-priority: 99;
color: inherit;
}
.grey a {
color: #3e5c5a;
text-decoration: none;
}
.grey1 a {
color: #9b9b9b;
text-decoration: none;
}
.blue a {
color: #153643;
text-decoration: none;
}
.blue2 a {
color: #00335b;
text-decoration: underline;
}
.blue1 a {
color: #0079c8;
text-decoration: none;
}
.blue3 a {
color: #00335b;
text-decoration: underline;
}
.red a {
color: #cf1326;
text-decoration: none;
}
.black a {
color: #000000;
text-decoration: none;
}
.black1 a {
color: #000000;
text-decoration: none;
}
.black2 a {
color: #383838;
text-decoration: none;
}
.pink a {
color: #b96955;
text-decoration: none;
}
.pink2 a {
color: #ba6956;
text-decoration: none;
}
.pink1 a {
color: #b96955;
text-decoration: underline;
}
.white a {
color: #ffffff;
text-decoration: none;
}
.white1 a {
color: #ffffff;
text-decoration: underline;
}
 @media only screen and (min-width:480px) and (max-width:639px) {
.main_table {
width: 100% !important;
}
.wrapper {
width: 100% !important;
}
.side {
padding-left:15px !important;
padding-right:15px !important;
}
.hide {
display: none !important;
}
.img {
width: 100% !important;
height: auto !important;
max-width: none !important;
}
.center {
text-align: center !important;
}
.height {
height: 30px !important;
}
.height100 {
height: 100px !important;
}
.top {
padding-top: 20px !important;
}
.padbtm {
padding-bottom: 10px !important;
}
.top15 {
padding-top: 10px !important;
}
.pad {
padding: 0 10px !important;
}
.mobile_show {
display: table !important;
float: none !important;
width: 100% !important;
overflow: visible !important;
height: auto !important;
}
.pad0 {
padding: 0px !important;
}
.br {
display:block !important;
}
.hauto {
height: auto !important;
}
}
 @media screen and (max-width: 479px) {
.main_table {
width: 100% !important;
}
.wrapper {
width: 100% !important;
}
.hide {
display: none !important;
}
.img {
width: 100% !important;
height: auto !important;
max-width: none !important;
}
.w15 {
width: 15px !important;
}
.w10 {
width: 10px !important;
}
.center {
text-align: center !important;
}
.height {
height: 30px !important;
}
.hauto {
height: auto !important;
}
.top {
padding-top: 20px !important;
}
.padbtm {
padding-bottom: 10px !important;
}
.top15 {
padding-top: 10px !important;
}
.br {
display:block !important;
}
.pad {
padding: 0 10px !important;
}
.pad0 {
padding: 0px !important;
}
.mobile_show {
display: table !important;
float: none !important;
width: 100% !important;
overflow: visible !important;
height: auto !important;
}
.side {
padding-left: 15px !important;
padding-right: 15px !important;
}
}
.img {
width: 100% !important;
height: auto !important;
}
.img {
width: 100% !important;
height: auto !important;
}
#MessageViewBody, #MessageWebViewDiv {
width: 100% !important;
}
</style>
</head>
<body style="margin:0px; padding:0px;" bgcolor="#153643">
<table width="100%" border="0" style="table-layout:fixed;" align="center" cellspacing="0" cellpadding="0" bgcolor="#153643">
  <tr>
    <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="main_table" style="width:650px;" bgcolor="#ffffff">
        <!--Header-->
        <tr>
          <td align="center" valign="top" bgcolor="#62ae92"><table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="25" style="height:25px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top"><table width="600" align="center" style="width:600px;" class="wrapper" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" valign="middle"><table width="95" align="left" class="wrapper" style="width:95px;margin-bottom: 20px;" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="center" valign="middle" ><a href="#" target="_blank" style="text-decoration:none;color:#000000; "><img src="https://avataaars.io/?avatarStyle=Transparent&topType=NoHair&accessoriesType=Round&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown" alt=" " width="110" height="110" border="0" style="width:110px;height: auto;font-size: 14px;color: #000000;display: block;max-width:110px;"></a></td>
                          </tr>
                        </table>
                        <table width="470" align="right" class="wrapper" style="width:470px;" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:33px;line-height:36px;color: #153643;text-align:left;font-weight:bold;">HuaYu &amp;<br class="hide" />
                              服务器</td>
                          </tr>
                          <tr>
                            <td align="left" valign="top" class="white side" style="font-family: Arial, sans-serif;font-size:15px;line-height:17px;color: #ffffff;text-align:left; letter-spacing:3px; ">这是腐竹深思熟虑写的一封信<br class="hide" />
                              </td>
                          </tr>
                        </table></td>
                    </tr>
                  </table></td>
              </tr>
              <tr>
                <td height="25" style="height:25px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
            </table></td>
        </tr>
        <!--//Header-->
        <!--Module1-->
        <tr>
          <td align="center" valign="top" bgcolor="#aec2c9"><table width="600" class="wrapper" style="width:600px;" align="center" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="30" style="height:30px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:24px;line-height:28px;color: #153643;text-align:left;font-weight:bold;">在6月13号成立了HuaYu...</td>
              </tr>
              <tr>
                <td height="15" style="height:15px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="justify" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:16px;line-height:22px;color: #153643;text-align:justify; "> 因此开启了第一个周目,也是最后一个周目。<br />
                  <br />
                   自我介绍下:我是66a,老玩家都认识我，我酷爱编程也喜欢与玩家一起玩耍，很快您也会了解到我是个什么样的腐竹！
<br />

<div style="margin-top: 20px;">来说说服务器吧，服务器有许多玩家，有红石大佬、生存大佬、建筑大佬；</div>
<div style="margin-top: 20px;">不要在服务器使用外挂,虽然只是进监狱，但是我特别不推荐您开；服务器中避免不了熊孩子，熊孩子没有警告，熊孩子只能被HuaYu拒之门外,体验到此结束;</div>
<div style="margin-top: 20px;">服务器有什么？</div>
<div>1.fly！fly！fly！全天飞行！</div>
<div>2.结婚，与你喜欢的人结婚再好不过了</div>
<div>3.全天区块保护，再也不怕你家被熊</div>
<div>3.箱子保护，再也不怕你家被熊</div>
</td>
              </tr>
        <!--//Module1-->
        <!--Module2-->
        <tr>
          <td align="center" valign="top" bgcolor="#aec2c9"><table width="600" class="wrapper" style="width:600px;" align="center" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="30" style="height:30px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:24px;line-height:28px;color: #153643;text-align:left;font-weight:bold;"> 玩家建筑物一起看看吧！ </td>
              </tr>
              <tr>
                <td height="15" style="height:15px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="justify" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:16px;line-height:22px;color: #153643;text-align:justify;font-size: 20px ">极光镇<br></td>
              </tr>
              <tr>
                <td height="15" style="height:15px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="middle" class="side"><a href="#" target="_blank" style="text-decoration:none;color:#000000; "><img src="https://server-1305316893.cos.ap-nanjing.myqcloud.com/images/%E5%BB%BA%E7%AD%91%E5%9B%BE%E7%89%87/D0F1B3C9921152335C4AA0D6AE598CA7.png" alt=" " width="370" height=" " border="0" class="img" style="width:370px;height: auto;font-size: 14px;color: #000000;display: block;max-width:370px;font-weight:bold; "></a></td>
                </tr>
                <tr>
                <td align="center" valign="middle" class="side"><a href="#" target="_blank" style="text-decoration:none;color:#000000; "><img src="https://server-1305316893.cos.ap-nanjing.myqcloud.com/images/%E5%BB%BA%E7%AD%91%E5%9B%BE%E7%89%87/32F895F6963A4EC068289270C7526F24.png" alt=" " width="370" height=" " border="0" class="img" style="width:370px;height: auto;font-size: 14px;color: #000000;display: block;max-width:370px;font-weight:bold; "></a></td>
                </tr>
                <tr>
                <td align="center" valign="top" class="black side" style="font-family: Arial, sans-serif;font-size:12px;line-height:22px;color: #000000;text-align:center; ">极光镇的玩家共同建筑</td>
                </tr>
<tr>
                <td align="justify" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:16px;line-height:22px;color: #153643;text-align:justify;font-size: 20px ">花街柳巷<br></td>
              </tr>
              <tr>
                <td height="15" style="height:15px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
<td align="center" valign="middle" class="side"><a href="#" target="_blank" style="text-decoration:none;color:#000000; ">
<img src="https://server-1305316893.cos.ap-nanjing.myqcloud.com/images/%E5%BB%BA%E7%AD%91%E5%9B%BE%E7%89%87/C7FCD415C575E7033DD111FF764880AB.png" alt=" " width="370" height=" " border="0" class="img" style="width:370px;height: auto;font-size: 14px;color: #000000;display: block;max-width:370px;font-weight:bold; "></a></td>
</tr>
<tr>
<td align="center" valign="middle" class="side"><a href="#" target="_blank" style="text-decoration:none;color:#000000; ">
<img src="https://server-1305316893.cos.ap-nanjing.myqcloud.com/images/%E5%BB%BA%E7%AD%91%E5%9B%BE%E7%89%87/0EC5DC69530E27E3785AA6FA914598CD.png" alt=" " width="370" height=" " border="0" class="img" style="width:370px;height: auto;font-size: 14px;color: #000000;display: block;max-width:370px;font-weight:bold; "></a></td>
              </tr>
              <tr>
                <td align="center" valign="top" class="black side" style="font-family: Arial, sans-serif;font-size:12px;line-height:22px;color: #000000;text-align:center; ">花街柳巷的玩家共同建筑</td>
</tr>

<tr>
                <td height="30" style="height:30px;line-height:1px;font-size:1px;" >&nbsp;</td>
              </tr>
              <tr>
                <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:24px;line-height:28px;color: #153643;text-align:left;font-weight:bold;">这些只是服务器的冰山一角...</td>
</tr>
<tr>
                <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:24px;line-height:28px;color: #153643;text-align:left;font-weight:bold;">等您的加入,给服务器带来更多的可能！</td>
</tr>
<tr>
                <td align="left" valign="top" class="blue side" style="font-family: Arial, sans-serif;font-size:24px;line-height:28px;color: #153643;text-align:left;font-weight:bold;">您的验证码是：<b style="color:red">${codeName}</b></td>
              </tr>
            </table></td>
</tr>



        <!--Footer text-->
        <tr>
          <td align="center" valign="top" bgcolor="#44525f"><table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="20">&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top" class="black side" style="font-family: Arial, sans-serif;font-size:14px;line-height:19px;color: #ffffff;text-align:center; ">&reg; HuaYu 2022</td>
              </tr>
              <tr>
                <td height="20" class="height">&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top"><table width="95" align="center" style="width:95px;" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    </tr>
                  </table></td>
              </tr>

            </table></td>
        </tr>
        <!--//Footer text-->
      </table></td>
  </tr>
</table>
</body>
</html>`, // html body
        });


        res.status(200).json({code: 1, msg: '请求成功,注意查收'})
    } catch (err) {
        console.log(err)
    }


}