# nginx

## 1 介绍

### 1.1 什么是nginx

Nginx是一款高性能的http 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。由俄罗斯的程序设计师Igor Sysoev所开发，官方测试nginx能够支支撑5万并发链接，并且cpu、内存等资源消耗却非常低，运行非常稳定。

### 1.2 应用场景

1、http服务器。Nginx是一个http服务可以独立提供http服务。可以做网页静态服务器。

2、虚拟主机。可以实现在一台服务器虚拟出多个网站。例如个人网站使用的虚拟主机。

3、反向代理，负载均衡。当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。

## 2 安装

### 2.1 下载

windows下载：<http://nginx.org/en/download.html>

解压

![1556594053769](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1556594053769.png)

### 2.2 启动

(1)直接双击nginx.exe，双击后一个黑色的弹窗一闪而过

(2)打开cmd命令窗口，切换到nginx解压目录下，输入命令 nginx.exe 或者 start nginx ，回车即可

### 2.3 检查启动是否成功

直接在浏览器地址栏输入网址 http://localhost:80，回车，出现以下页面说明启动成功

![1556594259780](C:\Users\哈哈\AppData\Roaming\Typora\typora-user-images\1556594259780.png)

### 2.4  nginx命令

```javascript
//测试配置文件格式是否正确
//nginx -t
启动
//nginx
重启
//nginx -s reload
停止
//nginx -s stop
```





## 3 配置文件

配置文件：conf/nginx.conf

**1. 全局块**

该部分配置主要影响Nginx全局，通常包括下面几个部分：

* 配置运行Nginx服务器用户（组）
* worker process数
* Nginx进程PID存放路径
* 错误日志的存放路径
* 配置文件的引入

**2. events块**

该部分配置主要影响Nginx服务器与用户的网络连接，主要包括：

* 设置网络连接的序列化
* 是否允许同时接收多个网络连接
* 事件驱动模型的选择
* 最大连接数的配置

**3. http块**

* 定义MIMI-Type
* 自定义服务日志
* 允许sendfile方式传输文件
* 连接超时时间
* 单连接请求数上限

**4. server块**

* 配置网络监听
* 基于名称的虚拟主机配置
* 基于IP的虚拟主机配置

**5. location块**

* location配置
* 请求根目录配置
* 更改location的URI
* 网站默认首页配置

## 4 配置虚拟主机

## 5 反向代理

### 5.1 原理

反向代理（Reverse Proxy）实际运行方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器

![img](http://hi.csdn.net/attachment/201108/28/0_1314499568QMyS.gif)

反向代理服务器接受用户的请求，并根据请求，将请求发送给不同的服务器，再将从服务器中获取的结果返回给用户。对于用户来说，并不知道自己访问的服务器是反向代理服务器

### 5.2 用途

* 保证内网的安全，可以使用反向代理提供WAF功能，阻止web攻击大型网站，通常将反向代理作为公网访问地址，Web服务器是内网。
* 负载均衡，通过反向代理服务器来优化网站的负载

![img](https://images2015.cnblogs.com/blog/305504/201611/305504-20161112124423530-566240666.png)

## 6 负载均衡



### 7 mac安装

```
openssl
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

==> nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
```

