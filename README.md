### 如何安装Express

1. 网上下载直接安装node
2. npm install -g cnpm
3. cnpm install -g express-generator
4. express 文件夹名/项目的名字

# MY FIRST WEB PROJECT

client端：
    js -> 逻辑
    html -> 内容
    css -> 样式

Server端根据url的path, routing相应的文件发送给客户端


前端框架：Bootstrap，React, vue
后端框架：express, koa, koa2(异步改同步), egg(阿里巴巴)
终极大统一框架（不成熟）：meteoer

<p> 是paragraph

正常loop是用in, 取index
对数组可以用of, 取值


# Mongodp的启用流程：
1. 建立一个存储数据的文件夹：sudo mkdir /data/db
2. 启动 server 在文件夹建立一个基本的目录结构: sudo mongod
3. 通过 mongo 访问data base: 默认会启动在 27017端口， mysql是3306

一个网站的compoment 可以看成一个collection (eg. user, post)

# mongoose: 用javaScript 去调用mongo的一个库 （mLab）
cnpm是包管理器，node_modules是包管理器装的所有包的地方
安装：cnpm install --save mongoose

1. mongoose.Schema: doc的模板
2. mongoose.model: 把这个Schema变成一个可以调用的类


# bash.profile 规定了全局变量 (eg. CONDA)
bash.profile: ~/.bassh.profile
全局变量：无论在哪个目录都能够调用全局变量值里面的应用
    全局变量值：应用的路径
    例如，mongod -> 在 “/Users/zengzijian/mongodb-macos-x86_64-enterprise-4.2.1/bin”下去找我的mongod文件
