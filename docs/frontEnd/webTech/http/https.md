# https学习笔记

## 1 加密算法

### 1.1 对称加密

简介：加密和解密使用同一个密钥

常见的算法： 

- DES：Data Encryption Standard; 
- 3DES：Triple DES; 
- AES：Advanced Encryption Standard; (128bits, 192bits, 256bits, 384bits) 

过程：

A主机将要发送的数据，用密钥加密得到密文。将密文发送至B主机，B主机用相同的密钥解密得到明文

| 优点 | 计算量小，加密和解密的速度比较快，适合加密比较大的数据       |
| ---- | ------------------------------------------------------------ |
| 缺点 | 1 密钥的传输容易泄露                 2 一个用户需要对应一个密钥，服务器管理密钥麻烦 |

### 1.2 单向加密

简介：即提出数据指纹；只能加密，不能解密；主要用来验证数据是否完整

过程：

A主机将要传输的数据进行一次单向加密，得到数据指纹。当接收方收到数据之后，也进行一次单向加密，如果得到的数据指纹相同，则可以认为数据在传输过程中没有被篡改。

特性 

- 定长输出 
- 雪崩效应；

算法 

- md5：Message Digest 5, 128bits 
- sha1：Secure Hash Algorithm 1, 160bits 
- sha224, sha256, sha384, sha512

MD5

- 压缩性：任意长度的数据，算出的MD5值长度都是固定的。

- 容易计算：从原数据计算出MD5值很容易。

- 抗修改性：对原数据进行任何改动，哪怕只修改1个字节，所得到的MD5值都有很大区别。

- 强抗碰撞：已知原数据和其MD5值，想找到一个具有相同MD5值的数据（即伪造数据）是非常困难的。

  #### MD5加盐

    加盐的方式也是多种多样

  - string+key（盐值key）然后进行MD5加密
  - 用string明文的hashcode作为盐，然后进行MD5加密
  - 随机生成一串字符串作为盐，然后进行MD5加密

### 1.3 非对称加密

非对称性加密，加密解密的过程使用不同的密钥。

密钥分为公钥与私钥： 

- 公钥：从私钥中提取产生；可公开给所有人；pubkey 
- 私钥：通过工具创建，使用者自己留存，必须保证其私密性；secret key；

特点：

公钥加密，私钥解密

私钥加密，公钥解密

而私钥一般只有一个，而公钥可以有多个主机同时拥有。

优点：加密和解密采用不同的密钥，数据传输安全、

缺点：

计算量大，加密解密的速度慢

公钥并不包含服务器的信息，使用非对称加密算法无法确保服务器身份的合法性，存在中间人攻击的风险，服务器发送给客户端的公钥可能在传送过程中被中间人截获并篡改

公钥是公开的，所以针对私钥加密的信息，黑客截获后可以使用公钥进行解密，获取其中的内容

用途

数字签名：一是能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名。二是数字签名能确定消息的完整性。因为数字签名的特点是它代表了文件的特征，文件如果发生改变，数字摘要的值也将发生变化。不同的文件将得到不同的数字摘要。 一次数字签名涉及到一个哈希函数、发送者的公钥、发送者的私钥。”； 
过程：将发送的数据进行一次hash，再用私钥对hash后的数据摘要加密，对方收到密文之后用公钥解密，然后再对数据进行一次hash比对。如果与数字摘要值相同，则数据是完整的。

密钥交换：发送方用对方公钥加密一个对称密钥，并发送给对方； 
过程：对称加密中有一个问题，就是如果密钥被截获了，这时候就算传输是密文，第三方也很容易就可以解密成。所以非对称加密也可以用来传送密钥，这样就可以保证密钥的安全。具体如下： 

数据加密：可以做到数据加密但是一般不用来传输数据，因为非对称加密过程，速度要比对称加密慢3个数量级。

常用算法： 

- RSA 
- DSA 
- ELGamal

密钥交换： IKE（Internet Key Exchange）

### 1.4 公钥加密

公钥加密，也就是非对称加密方式交换密钥，这种方式交换密钥有一个问题就是。假如有一个主机C，他截获了A和B的通信。C可以生成密钥对，当A向B请求B的公钥的时候，C伪装成B将自己的公钥给他，这时候A发送的密文，可以被C解开。因为A加密的公钥是C的公钥，这时候C还能冒充A去与B通信。所以A以为是在与B进行通信，但是其实是A和B同时与C进行通信，这时候C就可以对会话内容进行修改。这就是中间人攻击，解决的办法一般要依赖pki体系。后面会介绍。



PKI（Public Key Infrastructure） 
简介：PKI（Public Key Infrastructure）公钥基础设施。

原理 
解决上述身份验证问题的关键是确保获取的公钥途径是合法的，能够验证服务器的身份信息，为此需要引入权威的第三方机构CA(如沃通CA)。CA 负责核实公钥的拥有者的信息，并颁发认证”证书”，同时能够为使用者提供证书验证服务，即PKI体系(PKI基础知识)。 
基本的原理为，CA负责审核信息，然后对关键信息利用私钥进行”签名”，公开对应的公钥，客户端可以利用公钥验证签名。CA也可以吊销已经签发的证书。具体的流程如下



DH（Deffie-Hellman）
简介 
需要安全通信的双方可以用这个方法确定对称密钥。然后可以用这个密钥进行加密和解密。但是注意，这个密钥交换协议/算法只能用于密钥的交换，而不能进行消息的加密和解密。双方确定要用的密钥后，要使用其他对称密钥操作加密算法实际加密和解密消息。 
原理 

1. 有两个全局公开的参数，一个素数q和一个整数a,a是q的一个原根. 
2. 假设用户A和B希望交换一个密钥，用户A选择一个作为私有密钥的随机数XA(XA

### 1.5 前端加密

crypto-js.js前端加密库

<https://github.com/brix/crypto-js>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<script type="text/javascript" src="./crypto-js-3.1.9-1/crypto-js.js"></script>
<script type="text/javascript">
	var test = "一个测试";
	var pwd = "1234567891234567";//密码
	//MD5的哈希
	console.log(test+"---"+CryptoJS.MD5(test));
	//加密base64
	var encrypt=CryptoJS.AES.encrypt(test,pwd);
    console.log(test+"-加密--"+encrypt);
    //解密
	var decrypt=CryptoJS.AES.decrypt(encrypt,pwd).toString(CryptoJS.enc.Utf8);
	console.log(test+"-解密--"+decrypt);
	
	//加密更加完善的写法
   	var encryptResult;
   	encryptEvent();
    function encryptEvent() {
        var content = test;//明文
        var key = CryptoJS.enc.Utf8.parse(pwd); //密码必须为16位
        encryptResult = CryptoJS.AES.encrypt(content, key, {
            iv: CryptoJS.enc.Utf8.parse("1234"), //偏移量
            mode: CryptoJS.mode.CBC, //aes加密模式cbc
            padding: CryptoJS.pad.Pkcs7 //填充
        });
        console.log("加密--"+encryptResult);//密文
        
    }
   //解密更加完善的写法
    decryptEvent();
    function decryptEvent() {
        var content = String(encryptResult);//把object转化为string
        var key = CryptoJS.enc.Utf8.parse(pwd);//与加密密码一致
        var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
            iv: CryptoJS.enc.Utf8.parse("1234"),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
        console.log("解密--"+decryptResult)//明文
    }
</script>
</body>
</html>
```

## 2 https原理

## 3 搭建https

