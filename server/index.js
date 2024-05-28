import fs from 'fs'
import path from 'path';
import express from 'express'
import {promisify } from 'util'
import { v4 as uuid } from 'uuid';
import childProcess from 'child_process';
import fileUpload from 'express-fileupload'


// 服务根目录
const rootPath = process.cwd();

const app = express();

// 使用static中间件： 把www文和uploads件夹作为静态资源服务器来访问
app.use(express.static('www/dist'))
app.use('/upload', express.static('upload'));
// 使用express-fileupload中间件
app.use(fileUpload({defParamCharset: "utf8" }));

// 定义路由
app.get('/', (req, res) => {
    res.render('index');
})

// 定义路由
app.get('/test', (req, res) => {
    res.send('<h1>你好，世界</h1>')
})

app.post('/resigner', async(req, res) => {

    // 创建一个目录 根据时间戳+随机数
    const dirName = `${new Date().getTime()}_${uuid()}`; // 创建的临时目录名
    const dirPath = path.join(rootPath, 'upload', dirName) // 创建该目录
    fs.mkdirSync(dirPath)

    // 接收和保存文件
    const file = req.files.file;
    const filePath = path.join(dirPath, file.name);
    await promisify(file.mv)(filePath);

    // 重新签名后的文件地址
     const signalFilePath = path.join(dirPath, '白名单-' + file.name);
     // 返回给前端的下载地址
     const dowonloadPath = path.join('/upload', dirName, '白名单-' + file.name);


    // 操作shell
    childProcess.exec('chmod 777 ./shell/re-signer.sh')
    const stdout = childProcess.execFileSync('./shell/re-signer.sh', [filePath, signalFilePath, dirPath], { encoding: 'utf-8' });
    res.json({
        msg: '处理完成',
        code: 0,
        data: {
            dowonload: dowonloadPath
        }
    });
})


app.listen(3000, () => console.log('服务已经启动： http://127.0.0.1:3000'))