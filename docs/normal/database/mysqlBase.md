# mysql数据库

MySQL 是最流行的关系型数据库管理系统

## 1 安装

### 1.1 下载安装

1. MySQL 的安装同样建议采用解压版（目的是了解那些自动安装过程都做了哪些事） 

   下载地址<https://dev.mysql.com/downloads/mysql/>

2. 解压到纯英文路径

3. 解压目录添加 my.ini （可选） 

```
[mysqld]
# MySQL 安装目录，这里的路径可选
basedir=C:/Develop/mysql
# 数据文件所在目录，这里的路径可选
datadir=C:/Develop/mysql/data



添加my.ini文件内容，这里是配置MySQL文件
[mysqld]
# 设置默认字符集，只会影响新建数据库的默认字符集
character-set-server=utf8

```

4. 以**管理员身份**运行 CMD 执行以下命令，安装一个 MySQL 服务 

```
# 定位到安装目录下的 bin 文件夹
$ cd <MySQL安装目录>/bin
# 初始化数据所需文件以及获取一个临时的访问密码
$ mysqld ‐‐initialize ‐‐user=mysql ‐‐console
# 将 MySQL 安装为服务 可以指定服务名称
$ mysqld ‐‐install MySQL
```

### 1.2  进入数据库

```
//先要进入数据库的bin目录下
C:\Windows\system32>cd C:\Develop\mysql\bin

C:\Develop\mysql\bin>mysqld --initialize --user=mysql --console
2017-10-27T07:55:14.689417Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2017-10-27T07:55:15.021383Z 0 [Warning] InnoDB: New log files created, LSN=45790
2017-10-27T07:55:15.095580Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
2017-10-27T07:55:15.166801Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: 2ad3e9db-baec-11e7-b1fe-e03f49da4d50.
2017-10-27T07:55:15.171806Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.
2017-10-27T07:55:15.175824Z 1 [Note] A temporary password is generated for root@localhost: CsN2toUSm&dF

C:\Develop\mysql\bin>mysqld --install MySQL
Service successfully installed.

//启动数据库

C:\Develop\mysql\bin>net start MySQL
MySQL 服务正在启动 .
MySQL 服务已经启动成功。

//进入数据库
C:\Develop\mysql\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.19

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

//设置密码  注意：进入数据库之后的mysql命令都要加分号
mysql> set password for root@localhost = password('123456');
Query OK, 0 rows affected, 1 warning (0.00 sec)

//退出数据库
mysql> exit;
Bye

//登录
C:\Develop\mysql\bin>mysql -u root -p
Enter password: ******
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.19 MySQL Community Server (GPL)

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

//查看数据库
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> exit;
Bye

C:\Develop\mysql\bin>

```

### 1.3    删除服务

管理员身份运行cmd，任意目录下执行：

sc  delete  服务名称

然后再删除之前解压存放的文件即可

### 1.4 启动停止服务

方式一：计算机——右击管理——服务
方式二：通过管理员身份运行
net start 服务名（启动服务）
net stop 服务名（停止服务）

## 2 数据管理工具

### 2.1 命令行工具

一般如果只是简单操作数据库，推荐使用 MySQL 内置的命令行工具完成： 

通过命令行运行解压目录下 bin 目录中的 mysql.exe ： 

```
# 定位到 bin 目录
$ cd <解压目录>/bin
# 运行 mysql，‐u 指定数据库用户名，‐p 指定密码
$ mysql ‐u root ‐p wanglei
# 一般不建议在命令中填写密码，因为这样会暴露你的密码，一般只加一个 ‐p 但是不给值
$ mysql ‐u root ‐p
Enter password: # 这时会要求你输入密码
```

进入 MySQL 客户端的 REPL 环境过后，可以通过标准的 SQL 语句操作数据库。
常见的操作指令： 

```
mysql> show databases; ‐‐ 显示全部数据库
mysql> create database <db‐name>; ‐‐ 创建一个指定名称的数据库
mysql> use <db‐name>; ‐‐ 使用一个数据库，相当于进入指定的数据库
mysql> show tables; ‐‐ 显示当前数据库中有哪些表
mysql> create table <table‐name> (id int, name varchar(20), age int); ‐‐ 创建一个指定名称的数据
表，并添加 3 个列
mysql> desc <table‐name>; ‐‐ 查看指定表结构
mysql> source ./path/to/sql‐file.sql ‐‐ 执行本地 SQL 文件中的 SQL 语句
mysql> drop table <table‐name>; ‐‐ 删除一个指定名称的数据表
mysql> drop database <db‐name>; ‐‐ 删除一个指定名称的数据库
mysql> exit|quit; ‐‐ 退出数据库终端
```

查看服务器的版本
方式一：登录到mysql服务端
select version();
方式二：没有登录到mysql服务端
mysql --version
或
mysql --V

### 2.2 可视化管理工具

* 如果需要复杂的操作，推荐 Navicat Premium
  下载地址：http://www.navicat.com.cn/download/navicat-premium
  这是一个付费软件，可以免费试用 14 天 
* mysql workbench

## 3 常见命令

| 命令               |                    | 命令               |                        |
| ------------------ | ------------------ | ------------------ | ---------------------- |
| 查看所有数据库     | show databases；   | 打开指定的数据库   | use 数据库名；         |
| 查看当前库的所有表 | show tables；      | 查看其它库的所有表 | show tables from 库名; |
| 查看当前处于哪个表 | select database(); | 查看表结构         | desc 表明；            |
| 查看数据库版本     | select version();  |                    |                        |

## 4 sql语句

### 4.1 查询

#### 1 基础查询

基本结构

```
select
	字段列表
from
	表名列表
where
	条件列表
group by
	分组字段
having
	分组之后的条件
order by
	排序
limit
	分页限定
```

语法：
select 查询列表 from 表名;

特点：

* 查询列表可以是：表中的字段、常量值、表达式、函数
* 查询的结果是一个虚拟的表格

1.查询表中的单个字段

SELECT last_name FROM employees;

2.查询表中的多个字段

SELECT last_name,salary,email FROM employees;

3.查询表中的所有字段

 SELECT * FROM employees;

```
//如果字段和SQL关键字一样，可以采用``反引号包起来进行区分
```

```sql
#7.起别名
 /*
 ①便于理解
 ②如果要查询的字段有重名的情况，使用别名可以区分开来 
 */
 #方式一：使用as
SELECT 100%98 AS 结果;
SELECT last_name AS 姓,first_name AS 名 FROM employees;

#方式二：使用空格
SELECT last_name 姓,first_name 名 FROM employees;

#案例：查询salary，显示结果为 out put
SELECT salary AS "out put" FROM employees;

#8.去重
#案例：查询员工表中涉及到的所有的部门编号
SELECT DISTINCT department_id FROM employees;

#9.字段拼接

SELECT CONCAT('a','b','c') AS 结果;

SELECT 
	CONCAT(last_name,first_name) AS 姓名
FROM
	employees;
```

#### 2 条件查询

语法：
	select 
		查询列表
	from
		表名
	where
		筛选条件;

	分类：
	一、按条件表达式筛选
	简单条件运算符：> < = != <> >= <=
	
	二、按逻辑表达式筛选
	逻辑运算符：
	作用：用于连接条件表达式
		&& || !
		and or not
	    
	&&和and：两个条件都为true，结果为true，反之为false
	||或or： 只要有一个条件为true，结果为true，反之为false
	!或not： 如果连接的条件本身为false，结果为true，反之为false
	
	三、模糊查询
		like
		between and
		in
		is null

一、按条件表达式筛选

案例1：查询工资>12000的员工信息

SELECT 
	*FROM
	employees
WHERE
	salary>12000;		

案例2：查询部门编号不等于90号的员工名和部门编号

SELECT 
	last_name,
	department_id
FROM
	employees
WHERE
	department_id<>90;

二、按逻辑表达式筛选

案例1：查询工资z在10000到20000之间的员工名、工资以及奖金

SELECT
	last_name,
	salary,
	commission_pct
FROM
	employees
WHERE
	salary>=10000 AND salary<=20000;

案例2：查询部门编号不是在90到110之间，或者工资高于15000的员工信息

SELECT
	*
FROM
	employees
WHERE
	NOT(department_id>=90 AND  department_id<=110) OR salary>15000;

三、模糊查询

/*
like	
between and
in
is null|is not null

*/

**1.like**

/*
特点：
①一般和通配符搭配使用
	通配符：
	% 任意多个字符,包含0个字符
	_ 任意单个字符
*、

案例1：查询员工名中包含字符a的员工信息

select 
	*
from
	employees
where
	last_name like '%a%';#abc

案例2：查询员工名中第三个字符为e，第五个字符为a的员工名和工资

select
	last_name,
	salary
FROM
	employees
WHERE
	last_name LIKE '__n_l%';

案例3：查询员工名中第二个字符为_的员工名

SELECT
	last_name
FROM
	employees
WHERE
	last_name LIKE '_$_%' ESCAPE '$';

2.between and

/*
①使用between and 可以提高语句的简洁度
②包含临界值
③两个临界值不要调换顺序

*/

案例1：查询员工编号在100到120之间的员工信息

SELECT
	*
FROM
	employees
WHERE
	employee_id >= 120 AND employee_id<=100；



SELECT
	*
FROM
	employees
WHERE
	employee_id BETWEEN 120 AND 100;

3.in

/*
含义：判断某字段的值是否属于in列表中的某一项
特点：
	①使用in提高语句简洁度
	②in列表的值类型必须一致或兼容
	③in列表中不支持通配符	

案例：查询员工的工种编号是 IT_PROG、AD_VP、AD_PRES中的一个员工名和工种编号

SELECT
	last_name,
	job_id
FROM
	employees
WHERE
	job_id = 'IT_PROT' OR job_id = 'AD_VP' OR JOB_ID ='AD_PRES';



SELECT
	last_name,
	job_id
FROM
	employees
WHERE
	job_id IN( 'IT_PROT' ,'AD_VP','AD_PRES');

4、is null

/*
=或<>不能用于判断null值
is null或is not null 可以判断null值


*/

案例1：查询没有奖金的员工名和奖金率

SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct IS NULL;

案例1：查询有奖金的员工名和奖金率

SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct IS NOT NULL;
		

安全等于  <=>

案例1：查询没有奖金的员工名和奖金率

SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct <=>NULL;	

案例2：查询工资为12000的员工信息

SELECT
	last_name,
	salary
FROM
	employees

WHERE 
	salary <=> 12000;
	

is null pk <=>

IS NULL:仅仅可以判断NULL值，可读性较高，建议使用
<=>    :既可以判断NULL值，又可以判断普通的数值，可读性较低

## 5 数据库的管理

### 5.1  库的创建

/*
语法：
create database  [if not exists]库名;
*/

案例：创建库Books

CREATE DATABASE IF NOT EXISTS books ;

### 5.2 库的修改

RENAME DATABASE books TO 新库名;

更改库的字符集

ALTER DATABASE books CHARACTER SET gbk;

### 5.3 库的删除

DROP DATABASE IF EXISTS books;

## 6 表的管理

### 6.1 表的创建 

/*
语法：
create table 表名(
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	...
	列名 列的类型【(长度) 约束】


)


*/

案例：创建表Book

CREATE TABLE book(
	id INT,#编号
	bName VARCHAR(20),#图书名
	price DOUBLE,#价格
	authorId  INT,#作者编号
	publishDate DATETIME#出版日期



);


DESC book;

### 6.2 表的修改

/*
语法
alter table 表名 add|drop|modify|change column 列名 【列类型 约束】;

*/

①修改列名

ALTER TABLE book CHANGE COLUMN publishdate pubDate DATETIME;

②修改列的类型或约束

ALTER TABLE book MODIFY COLUMN pubdate TIMESTAMP;

③添加新列

ALTER TABLE author ADD COLUMN annual DOUBLE; 

④删除列

ALTER TABLE book_author DROP COLUMN  annual;

⑤修改表名

ALTER TABLE author RENAME TO book_author;

DESC book;

### 6.3 表的删除

DROP TABLE IF EXISTS book_author;

SHOW TABLES;

### 6.4 表的复制

INSERT INTO author VALUES
(1,'村上春树','日本'),
(2,'莫言','中国'),
(3,'冯唐','中国'),
(4,'金庸','中国');

SELECT * FROM Author;
SELECT * FROM copy2;
1. 仅仅复制表的结构

CREATE TABLE copy LIKE author;

2. 复制表的结构+数据

CREATE TABLE copy2 
SELECT * FROM author;

3. 只复制部分数据

CREATE TABLE copy3
SELECT id,au_name
FROM author 
WHERE nation='中国';

4. 仅仅复制某些字段

CREATE TABLE copy4 
SELECT id,au_name
FROM author
WHERE 0;

## 7 数据类型

### 7.1 整型

| 整数类型      | 字节 | 范围                                                         |
| ------------- | ---- | ------------------------------------------------------------ |
| Tinyint       | 1    | 有符号： -128~127 无符号： 0~255                             |
| Smallint      | 2    | 有符号： -32768~32767 无符号： 0~65535                       |
| Mediumint     | 3    | 有符号： -8388608~8388607 <br />无符号： 0~1677215           |
| Int、 integer | 4    | 有符号： - 2147483648~2147483647 <br />无符号： 0~4294967295 |
| Bigint        | 8    | 有符号： -9223372036854775808 ~9223372036854775807<br /> 无符号： 0~ 9223372036854775807*2+1 |

特点：

* 如果不设置无符号还是有符号，默认是有符号，如果想设置无符号，需要添加unsigned关键字

* 如果插入的数值超出了整型的范围,会报out of range异常，并且插入临界值

* 如果不设置长度，会有默认的长度

* 长度代表了显示的最大宽度，如果不够会用0在左边填充，但必须搭配zerofill使用！	

  小数：
  	浮点型
  	定点型
  字符型：
  日期型：
  Blob类型：

### 7.2 小数

| 浮点数类型            | 字节 | 范围                                                         |
| --------------------- | ---- | ------------------------------------------------------------ |
| float                 | 4    | ±1.75494351E-38~±3.402823466E+38                             |
| double                | 8    | ±2.2250738585072014E-308~ ±1.7976931348623157E+308           |
| 定点数类型            | 字节 | 范围                                                         |
| DEC(M,D) DECIMAL(M,D) | M+2  | 最大取值范围与double相同， 给定decimal的有效取值范围由M和D 决定 |

```
分类：
1.浮点型
float(M,D)
double(M,D)
2.定点型
dec(M，D)
decimal(M,D)

特点：

①
M：整数部位+小数部位
D：小数部位
如果超过范围，则插入临界值

②
M和D都可以省略
如果是decimal，则M默认为10，D默认为0
如果是float和double，则会根据插入的数值的精度来决定精度

③定点型的精确度较高，如果要求插入数值的精度较高如货币运算等则考虑使用
```

### 7.3 字符型

较短的文本：

char
varchar

其他：

binary和varbinary用于保存较短的二进制
enum用于保存枚举
set用于保存集合


较长的文本：
text
blob(较大的二进制)

特点：

| 写法       | M的意思                         | 特点           | 空间的耗费 | 效率 |
| ---------- | ------------------------------- | -------------- | ---------- | ---- |
| char(M)    | 最大的字符数，可以省略，默认为1 | 固定长度的字符 | 比较耗费   | 高   |
| varchar(M) | 最大的字符数，不可以省略        | 可变长度的字符 | 比较节省   | 低   |
|            |                                 |                |            |      |

### 7.4 日期

| 日期和时间类型 | 字节 | 最小值              | 最大值              |
| -------------- | ---- | ------------------- | ------------------- |
| date           | 4    | 1000-01-01          | 9999-12-31          |
| datetime       | 8    | 1000-01-01 00:00:00 | 9999-12-31 23:59:59 |
| timestamp      | 4    | 19700101080001      | 2038年的某个时刻    |
| time           | 3    | -838:59:59          | 838:59:59           |
| year           | 1    | 1901                | 2155                |

特点：

*  Timestamp支持的时间范围较小，取值范围：19700101080001——2038年的某个时间，Datetime的取值范围：1000-1-1 ——9999—12-31
* imestamp和实际时区有关，更能反映实际的日期，而datetime则只能反映出插入时的当地时区
*  timestamp的属性受Mysql版本和SQLMode的影响很大 

## 8 数据库完整性

8.1 约束

* 为了保证数据的一致性和完整性， SQL规范以约
  束的方式对表数据进行额外的条件限制。
* 约束是表级的强制规定
* 可以在创建表时规定约束（通过 CREATE
  TABLE 语句），或者在表创建之后也可以（通
  过 ALTER TABLE 语句） 

有以下六种约束:
– NOT NULL 非空约束，规定某个字段不能为空
– UNIQUE 唯一约束，规定某个字段在整个表中是唯一的
– PRIMARY KEY 主键(非空且唯一)
– FOREIGN KEY 外键
– CHECK 检查约束
– DEFAULT 默认值 

约束的添加分类：
	列级约束：
		六大约束语法上都支持，但外键约束没有效果
		
	表级约束：
		
		除了非空、默认，其他的都支持


​		
主键和唯一的大对比：

	保证唯一性  是否允许为空    一个表中可以有多少个   是否允许组合
	主键	√		×		     至多有1个           √，但不推荐
	唯一	√		√		     可以有多个          √，但不推荐
外键：
	1、要求在从表设置外键关系
	2、从表的外键列的类型和主表的关联列的类型要求一致或兼容，名称无要求
	3、主表的关联列必须是一个key（一般是主键或唯一）
	4、插入数据时，先插入主表，再插入从表
	删除数据时，先删除从表，再删除主表

```
#二、修改表时添加约束

/*
1、添加列级约束
alter table 表名 modify column 字段名 字段类型 新约束;

2、添加表级约束
alter table 表名 add 【constraint 约束名】 约束类型(字段名) 【外键的引用】;


*/
DROP TABLE IF EXISTS stuinfo;
CREATE TABLE stuinfo(
	id INT,
	stuname VARCHAR(20),
	gender CHAR(1),
	seat INT,
	age INT,
	majorid INT
)
DESC stuinfo;
#1.添加非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuname VARCHAR(20)  NOT NULL;
#2.添加默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT DEFAULT 18;
#3.添加主键
#①列级约束
ALTER TABLE stuinfo MODIFY COLUMN id INT PRIMARY KEY;
#②表级约束
ALTER TABLE stuinfo ADD PRIMARY KEY(id);

#4.添加唯一

#①列级约束
ALTER TABLE stuinfo MODIFY COLUMN seat INT UNIQUE;
#②表级约束
ALTER TABLE stuinfo ADD UNIQUE(seat);


#5.添加外键
ALTER TABLE stuinfo ADD CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id); 

#三、修改表时删除约束

#1.删除非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuname VARCHAR(20) NULL;

#2.删除默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT ;

#3.删除主键
ALTER TABLE stuinfo DROP PRIMARY KEY;

#4.删除唯一
ALTER TABLE stuinfo DROP INDEX seat;

#5.删除外键
ALTER TABLE stuinfo DROP FOREIGN KEY fk_stuinfo_major;

SHOW INDEX FROM stuinfo;
```

###8.2 标识列
又称为自增长列
含义：可以不用手动的插入值，系统提供默认的序列值

特点：
1、标识列必须和主键搭配吗？不一定，但要求是一个key
2、一个表可以有几个标识列？至多一个！
3、标识列的类型只能是数值型
4、标识列可以通过 SET auto_increment_increment=3;设置步长
可以通过 手动插入值，设置起始值

## 9 事务

### 9.1  定义

事务由单独单元的一个或多个SQL语句组成，这个执行单元要么全部执行，要么全部不执行。

MySQL引擎：

1、概念：在mysql中的数据用各种不同的技术存储在文件（或内存）中。
2、通过show engines；来查看mysql支持的存储引擎。
3、 在mysql中用的最多的存储引擎有： innodb，myisam ,memory 等。其中innodb支持事务，而myisam、 memory等不支持事务 

案例：转账

张三丰  1000
郭襄	1000

update 表 set 张三丰的余额=500 where name='张三丰'
意外
update 表 set 郭襄的余额=1500 where name='郭襄'

**示例**

```SQL
CREATE TABLE account (
		id INT PRIMARY KEY AUTO_INCREMENT,
		NAME VARCHAR(10),
		balance DOUBLE
	);
	-- 添加数据
	INSERT INTO account (NAME, balance) VALUES ('zhangsan', 1000), ('lisi', 1000);
	
	SELECT * FROM account;
		UPDATE account SET balance = 1000;
		-- 张三给李四转账 500 元
		
		-- 0. 开启事务
		START TRANSACTION;
		-- 1. 张三账户 -500
		
		UPDATE account SET balance = balance - 500 WHERE NAME = 'zhangsan';
		-- 2. 李四账户 +500
		-- 出错了...
		UPDATE account SET balance = balance + 500 WHERE NAME = 'lisi';
		
		-- 发现执行没有问题，提交事务
		COMMIT;
		
		-- 发现出问题了，回滚事务
		ROLLBACK;
```

### 9.2  特性

1. 原子性（Atomicity）
    原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。
2. 一致性（Consistency）
    事务必须使数据库从一个一致性状态变换到另外一个一致性状态。
3. 隔离性（Isolation）
    事务的隔离性是指一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
4. 持久性（Durability）
    持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来的其他操作和数据库故障不应该对其有任何影响 

### 9.3 开启事务

**事务的创建**
隐式事务：事务没有明显的开启和结束的标记
比如insert、update、delete语句

delete from 表 where id =1;

显式事务：事务具有明显的开启和结束的标记
前提：必须先设置自动提交功能为禁用

set autocommit=0;

步骤1：开启事务
set autocommit=0;
start transaction;可选的
步骤2：编写事务中的sql语句(select insert update delete)
语句1;
语句2;
...

步骤3：结束事务
commit;提交事务
rollback;回滚事务

### 9.4 事务的隔离

对于同时运行的多个事务, 当这些事务访问数据库中相同的数据时, 如果没有采取必要的隔离机制, 就会导致各种并发问题:

* 脏读: 对于两个事务 T1, T2, T1 读取了已经被 T2 更新但还没有被提交的字段.
  之后, 若 T2 回滚, T1读取的内容就是临时且无效的.
* 不可重复读: 对于两个事务T1, T2, T1 读取了一个字段, 然后 T2 更新了该字段.
  之后, T1再次读取同一个字段, 值就不同了.
* 幻读: 对于两个事务T1, T2, T1 从一个表中读取了一个字段, 然后 T2 在该表中插
  入了一些新的行. 之后, 如果 T1 再次读取同一个表, 就会多出几行.

数据库事务的隔离性: 

数据库系统必须具有隔离并发运行各个事务的能力,使它们不会相互影响, 避免各种并发问题.
 一个事务与其他事务隔离的程度称为隔离级别. 数据库规定了多种事务隔离级别, 不同隔离级别对应不同的干扰程度, 隔离级别越高, 数据一致性就越好, 但并发性越弱. 

**事务的隔离级别**

```
		               脏读		不可重复读	幻读
read uncommitted：       √		     √		√
read committed：         ×		     √		√
repeatable read：        ×		     ×		√
serializable	         ×            ×      ×

```

mysql中默认 第三个隔离级别 repeatable read
oracle中默认第二个隔离级别 read committed
查看隔离级别
select @@tx_isolation;
设置隔离级别
set session|global transaction isolation level 隔离级别;

```
演示：
set global transaction isolation level read uncommitted;
start transaction;
-- 转账操作
update account set balance = balance - 500 where id = 1;
update account set balance = balance + 500 where id = 2;
```

## 10 视图

### 10.1 定义

MySQL从5.0.1版本开始提供视图功能。一种虚拟存在的表，行和列的数据来自定义视图的查询中使用的表
，并且是在使用视图时动态生成的， 只保存了sql逻辑，不保存查询结果 

应用场景：
– 多个地方用到同样的查询结果
– 该查询结果使用的sql语句较复杂
• 示例：

```SQL
CREATE VIEW my_v1
AS
SELECT studentname,majorname
FROM student s
INNER JOIN major m
ON s.majorid=m.majorid
WHERE s.majorid=1; 
```

### 10.2 视图操作

1. 创建视图的语法：
   create [or replace] view view_name
   As select_statement
   [with|cascaded|local|check option]
2.  修改视图的语法：
   alter view view_name
   As select_statement
   [with|cascaded|local|check option] 

```
视图的可更新性和视图中查询的定义有关系，以下类型的
视图是不能更新的。
• 包含以下关键字的sql语句：分组函数、 distinct、 group by
、 having、 union或者union all
• 常量视图
• Select中包含子查询
• join
• from一个不能更新的视图
• where子句的子查询引用了from子句中的表
```

3. 删除视图的语法：
   用户可以一次删除一个或者多个视图，前提是必须有该视
   图的drop权限。
   drop view [if exists] view_name,view_name …[restrict|cascade] 
4. 查看视图的语法：
   show tables;
   如果需要查询某个视图的定义，可以使用show create view
   命令进行查看：
   show create view view_name \G 

### 10.3 好处

* 重用sql语句
* 简化复杂的sql操作，不必知道它的查询细节
* 保护数据，提高安全性 

### 10.4 视图和表

```
含义：虚拟表，和普通表一样使用
mysql5.1版本出现的新特性，是通过表动态生成的数据

视图	create view		只是保存了sql逻辑	增删改查，只是一般不能增删改

表	create table		保存了数据		增删改查

```

## 11 变量

###11.1 变量分类

系统变量：
	全局变量
	会话变量

自定义变量：
	用户变量
	局部变量

**系统变量**
说明：变量由系统定义，不是用户定义，属于服务器层面
注意：全局变量需要添加global关键字，会话变量需要添加session关键字，如果不写，默认会话级别
使用步骤：
1、查看所有系统变量
show global|【session】variables;
2、查看满足条件的部分系统变量
show global|【session】 variables like '%char%';
3、查看指定的系统变量的值
select @@global|【session】系统变量名;
4、为某个系统变量赋值
方式一：
set global|【session】系统变量名=值;
方式二：
set @@global|【session】系统变量名=值;

###11.2 全局变量

作用域：针对于所有会话（连接）有效，但不能跨重启
想要重启的配置依旧生效，需要修改配置文件

①查看所有全局变量

SHOW GLOBAL VARIABLES;

②查看满足条件的部分系统变量

SHOW GLOBAL VARIABLES LIKE '%char%';

③查看指定的系统变量的值

SELECT @@global.autocommit;

④为某个系统变量赋值

SET @@global.autocommit=0;
SET GLOBAL autocommit=0;

###11.3 会话变量

作用域：针对于当前会话（连接）有效

①查看所有会话变量

SHOW SESSION VARIABLES;

②查看满足条件的部分会话变量

SHOW SESSION VARIABLES LIKE '%char%';

③查看指定的会话变量的值

SELECT @@autocommit;
SELECT @@session.tx_isolation;

④为某个会话变量赋值

SET @@session.tx_isolation='read-uncommitted';
SET SESSION tx_isolation='read-committed';

###11.4 自定义变量
说明：变量由用户自定义，而不是系统提供的
使用步骤：
1、声明
2、赋值
3、使用（查看、比较、运算等）

1》用户变量

/*
作用域：针对于当前会话（连接）有效，作用域同于会话变量
*/

赋值操作符：=或:=

①声明并初始化

SET @变量名=值;
SET @变量名:=值;
SELECT @变量名:=值;

②赋值（更新变量的值）

方式一：

	SET @变量名=值;
	SET @变量名:=值;
	SELECT @变量名:=值;
方式二：

	SELECT 字段 INTO @变量名
	FROM 表;
③使用（查看变量的值）

SELECT @变量名;

2》局部变量

/*
作用域：仅仅在定义它的begin end块中有效
应用在 begin end中的第一句话
*/

①声明

DECLARE 变量名 类型;
DECLARE 变量名 类型 【DEFAULT 值】;

②赋值（更新变量的值）

方式一：

	SET 局部变量名=值;
	SET 局部变量名:=值;
	SELECT 局部变量名:=值;
方式二：

	SELECT 字段 INTO 具备变量名
	FROM 表;
③使用（查看变量的值）

SELECT 局部变量名;

案例：声明两个变量，求和并打印

用户变量

SET @m=1;
SET @n=1;
SET @sum=@m+@n;
SELECT @sum;

局部变量

DECLARE m INT DEFAULT 1;
DECLARE n INT DEFAULT 1;
DECLARE SUM INT;
SET SUM=m+n;
SELECT SUM;

用户变量和局部变量的对比

		作用域			定义位置		语法
用户变量	当前会话		会话的任何地方		加@符号，不用指定类型
局部变量	定义它的BEGIN END中 	BEGIN END的第一句话	一般不用加@,需要指定类型

## 12 存储过程

### 12.1 定义

含义：一组经过预先编译的sql语句的集合
好处：

```
1、提高了sql语句的重用性，减少了开发程序员的压力
2、提高了效率
3、减少了传输次数
```

分类：

```
1、无返回无参
2、仅仅带in类型，无返回有参
3、仅仅带out类型，有返回无参
4、既带in又带out，有返回有参
5、带inout，有返回有参
注意：in、out、inout都可以在一个存储过程中带多个
```

### 12.2 创建存储过程

语法：

```
create procedure 存储过程名(in|out|inout 参数名  参数类型,...)
begin
	存储过程体

end
```

类似于方法：

```
修饰符 返回类型 方法名(参数类型 参数名,...){

	方法体;
}
```

注意

```
1、需要设置新的结束标记
delimiter 新的结束标记
示例：
delimiter $

CREATE PROCEDURE 存储过程名(IN|OUT|INOUT 参数名  参数类型,...)
BEGIN
	sql语句1;
	sql语句2;

END $

2、存储过程体中可以有多条sql语句，如果仅仅一条sql语句，则可以省略begin end

3、参数前面的符号的意思
in:该参数只能作为输入 （该参数不能做返回值）
out：该参数只能作为输出（该参数只能做返回值）
inout：既能做输入又能做输出
```

调用存储过程

```
call 存储过程名(实参列表)
```

## 13 函数

### 13.1 创建函数

学过的函数：LENGTH、SUBSTR、CONCAT等
语法：

```
CREATE FUNCTION 函数名(参数名 参数类型,...) RETURNS 返回类型
BEGIN
	函数体

END
```

### 13.2 调用函数

```
SELECT 函数名（实参列表
```

### 函数和存储过程的区别

```
		关键字		调用语法	返回值			应用场景
函数		FUNCTION	SELECT 函数()	只能是一个		一般用于查询结果为一个值并返回时，当有返回值而且仅仅一个
存储过程	PROCEDURE	CALL 存储过程()	可以有0个或多个		一般用于更新
```

## 14 流程控制结构

## 15 数据库设计

### 15.1 表的关系

1. 多表之间的关系

   1. 分类：

      1. 一对一(了解)：
         * 如：人和身份证
         * 分析：一个人只有一个身份证，一个身份证只能对应一个人
      2. 一对多(多对一)：
         * 如：部门和员工
         * 分析：一个部门有多个员工，一个员工只能对应一个部门
      3. 多对多：
         * 如：学生和课程
         * 分析：一个学生可以选择很多门课程，一个课程也可以被很多学生选择

   2. 实现关系：

      1. 一对多(多对一)：
         * 如：部门和员工
         * 实现方式：在多的一方建立外键，指向一的一方的主键。
      2. 多对多：
         * 如：学生和课程
         * 实现方式：多对多关系实现需要借助第三张中间表。中间表至少包含两个字段，这两个字段作为第三张表的外键，分别指向两张表的主键
      3. 一对一(了解)：
         * 如：人和身份证
         * 实现方式：一对一关系实现，可以在任意一方添加唯一外键指向另一方的主键。

   3. 案例
      -- 创建旅游线路分类表 tab_category
      -- cid 旅游线路分类主键，自动增长
      -- cname 旅游线路分类名称非空，唯一，字符串 100
      CREATE TABLE tab_category (
      	cid INT PRIMARY KEY AUTO_INCREMENT,
      	cname VARCHAR(100) NOT NULL UNIQUE
      );

      -- 创建旅游线路表 tab_route
      /*
      rid 旅游线路主键，自动增长
      rname 旅游线路名称非空，唯一，字符串 100
      price 价格
      rdate 上架时间，日期类型
      cid 外键，所属分类
      */
      CREATE TABLE tab_route(
      	rid INT PRIMARY KEY AUTO_INCREMENT,
      	rname VARCHAR(100) NOT NULL UNIQUE,
      	price DOUBLE,
      	rdate DATE,
      	cid INT,
      	FOREIGN KEY (cid) REFERENCES tab_category(cid)
      );

      /*创建用户表 tab_user
      uid 用户主键，自增长
      username 用户名长度 100，唯一，非空
      password 密码长度 30，非空
      name 真实姓名长度 100
      birthday 生日
      sex 性别，定长字符串 1
      telephone 手机号，字符串 11
      email 邮箱，字符串长度 100
      */
      CREATE TABLE tab_user (
      	uid INT PRIMARY KEY AUTO_INCREMENT,
      	username VARCHAR(100) UNIQUE NOT NULL,
      	PASSWORD VARCHAR(30) NOT NULL,
      	NAME VARCHAR(100),
      	birthday DATE,
      	sex CHAR(1) DEFAULT '男',
      	telephone VARCHAR(11),
      	email VARCHAR(100)
      );

      /*
      创建收藏表 tab_favorite
      rid 旅游线路 id，外键
      date 收藏时间
      uid 用户 id，外键
      rid 和 uid 不能重复，设置复合主键，同一个用户不能收藏同一个线路两次
      */
      CREATE TABLE tab_favorite (
      	rid INT, -- 线路id
      	DATE DATETIME,
      	uid INT, -- 用户id
      	-- 创建复合主键
      	PRIMARY KEY(rid,uid), -- 联合主键
      	FOREIGN KEY (rid) REFERENCES tab_route(rid),
      	FOREIGN KEY(uid) REFERENCES tab_user(uid)
      );

### 15.2 数据库设计的范式

* 概念：设计数据库时，需要遵循的一些规范。要遵循后边的范式要求，必须先遵循前边的所有范式要求

  设计关系数据库时，遵从不同的规范要求，设计出合理的关系型数据库，这些不同的规范要求被称为不同的范式，各种范式呈递次规范，越高的范式数据库冗余越小。
  目前关系数据库有六种范式：第一范式（1NF）、第二范式（2NF）、第三范式（3NF）、巴斯-科德范式（BCNF）、第四范式(4NF）和第五范式（5NF，又称完美范式）。

* 分类：

  1. 第一范式（1NF）：每一列都是不可分割的原子数据项
  2. 第二范式（2NF）：在1NF的基础上，非码属性必须完全依赖于码（在1NF基础上消除非主属性对主码的部分函数依赖）
     * 几个概念：
       1. 函数依赖：A-->B,如果通过A属性(属性组)的值，可以确定唯一B属性的值。则称B依赖于A
          例如：学号-->姓名。  （学号，课程名称） --> 分数
       2. 完全函数依赖：A-->B， 如果A是一个属性组，则B属性值得确定需要依赖于A属性组中所有的属性值。
          例如：（学号，课程名称） --> 分数
       3. 部分函数依赖：A-->B， 如果A是一个属性组，则B属性值得确定只需要依赖于A属性组中某一些值即可。
          例如：（学号，课程名称） -- > 姓名
       4. 传递函数依赖：A-->B, B -- >C . 如果通过A属性(属性组)的值，可以确定唯一B属性的值，在通过B属性（属性组）的值可以确定唯一C属性的值，则称 C 传递函数依赖于A
          例如：学号-->系名，系名-->系主任
       5. 码：如果在一张表中，一个属性或属性组，被其他所有属性所完全依赖，则称这个属性(属性组)为该表的码
          例如：该表中码为：（学号，课程名称）
          * 主属性：码属性组中的所有属性
          * 非主属性：除过码属性组的属性

  3. 第三范式（3NF）：在2NF基础上，任何非主属性不依赖于其它非主属性（在2NF基础上消除传递依赖）

8 数据库的备份和还原

1. 命令行：
   * 语法：
     * 备份： mysqldump -u用户名 -p密码 数据库名称 > 保存的路径
     * 还原：
       1. 登录数据库
       2. 创建数据库
       3. 使用数据库
       4. 执行文件。source 文件路径
2. 图形化工具：