# git学习笔记

## 1 环境安装

### 1.1 软件下载安装

Git 各平台安装包下载地址为：http://git-scm.com/downloads

git 管理工具sourcetree下载

https://www.sourcetreeapp.com/

**sourcetree使用教程**

官方教程：https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html

详细教程：掘金https://juejin.im/post/5b21d750e51d450688136ad3

### 1.2 配置

#### 1.2.1 用户信息配置

**git自带vim编辑器，在文件中可以用vim命令**

设置用户名和邮箱

```git
//全局配置
git config --global username "用户名"
git config --global user.email "邮箱"
//单个项目配置
git config --local username "用户名"
git config --local user.email "邮箱"
```

查看配置信息：

```
git config --list
```

####  1.2.2 Mac配置git 权限

给git 初始化仓库添加文件时，报错warning: xxxxxx:Permission defined

解决步骤：

* cd ~ 进入根目录

* ls -al 查看是否有.config文件

* 如果有，查看.config的文件权限是否为root，是则需要配置权限。

  ```
  运行命令sudo chown 用户名  .config
  ```

* 如果没有需要配置环境变量

* ```
  cd ~
  vim ~/.bash_profile
  i       //进入vim编辑状态
  export PATH="/usr/local/bin:$PATH" //这个路径是git的安装路径，执行 which git可以查看git安装路径
  然后给按照上面的步骤配置权限
  ```


### 1.3 终端机常用命令

| windows | macos/linux | 说明               |
| ------- | ----------- | ------------------ |
| cd      | cd          | 切换目录           |
| cd      | pwd         | 获取当前所在位置   |
| dir     | ls          | 列出当前的文件列表 |
| mkdir   | mkdir       | 创建新的目录       |
| 无      | touch       | 创建文件           |
| copy    | cp          | 复制文件           |
| move    | mv          | 移动文件           |
| del     | rm          | 删除文件           |
| cls     | clear       | 清除画面上的内容   |

> 查询配置信息

1. 列出当前配置：`git config --list`;
2. 列出repository配置：`git config --local --list`;
3. 列出全局配置：`git config --global --list`;
4. 列出系统配置：`git config --system --list`;

> 第一次使用git，配置用户信息

1. 配置用户名：`git config --global user.name "your name"`;
2. 配置用户邮箱：`git config --global user.email "youremail@github.com"`;

> 其他配置

1. 配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：`git config --global merge.tool vimdiff`;
2. 配置git命令输出为彩色的：`git config --global color.ui auto`;
3. 配置git使用的文本编辑器：`git config --global core.editor vi`;

### 1.4 配置ssh

报错：

```
Pushing to git@github.com:1563610087/todolist-react.git

Warning: Permanently added the RSA host key for IP address '192.30.253.113' to the list of known hosts.

git@github.com: Permission denied (publickey).

fatal: Could not read from remote repository.

需要设置ssh key
```

流程：

在 github 或者gitlab上添加 SSH key 的步骤： 

#### 1.4.1 检查是否存在ssh

* **运行 git Bash 客户端，输入如下代码：**

```
$ cd ~/.ssh
$ ls
```

是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，跳过步骤2，直接进入步骤3。

#### 1.4.2 创建ssh

* **创建一个 SSH key**

```
ssh-keygen -t rsa -C "your_email@example.com"
```

代码参数含义： 
-t 指定密钥类型，默认是 rsa ，可以省略。 
-C 设置注释文字，比如邮箱。 
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，因此，运行上面那条命令后会让你输入一个文件名，用于保存刚才生成的 SSH key 代码，如：

```
Generating public/private rsa key pair.
# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
```

当然，你也可以不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。

接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码）， 
当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码，直接提交到github上了，如：

Enter passphrase (empty for no passphrase): 

Enter same passphrase again:

接下来，就会显示如下代码提示，如：

```
Your identification has been saved in /c/Users/you/.ssh/id_rsa.
# Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```

#### 1.4.3 添加ssh公钥

添加你的 SSH key 到 github上面去** 

* 首先你需要拷贝 id_rsa.pub 文件的内容，vim 打开
* 登录你的github账号，从右上角的设置（ Account Settings ）进入，然后点击菜单栏的 SSH key 进入页面添加 SSH key。 
* 点击 Add SSH key 按钮添加一个 SSH key 。把你复制的 SSH key 代码粘贴到 key 所对应的输入框中，记得 SSH key 代码的前后不要留有空格或者回车。当然，上面的 Title 所对应的输入框你也可以输入一个该 SSH key 显示在 github 上的一个别名。默认的会使用你的邮件名称。

* 测试一下该SSH key 
  首先要给github bash输入一下代码

```
$ ssh -T git@github.com
```


当你输入以上代码时，会有一段警告代码，如：

```
The authenticity of host 'github.com (207.97.227.239)' can't be established.

RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.

Are you sure you want to continue connecting (yes/no)?
```

## 2 git原理

### 2.1 git工作流程

一般工作流程如下：

- 克隆 Git 资源作为工作目录。
- 在克隆的资源上添加或修改文件。
- 如果其他人修改了，你可以更新资源。
- 在提交前查看修改。
- 提交修改。
- 在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

下图展示了 Git 的工作流程：

![img](https://www.runoob.com/wp-content/uploads/2015/02/git-process.png)

### 2.2 基本原理

git的通用操作流程如下图（来源于网络）



![git操作通用流程](https://user-gold-cdn.xitu.io/2018/4/25/162fcc0987bf1c0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



主要涉及到四个关键点：

1. 工作区：本地电脑存放项目文件的地方，比如learnGitProject文件夹；
2. 暂存区（Index/Stage）：在使用git管理项目文件的时候，其本地的项目文件会多出一个.git的文件夹，将这个.git文件夹称之为版本库。其中.git文件夹中包含了两个部分，一个是暂存区（Index或者Stage）,顾名思义就是暂时存放文件的地方，通常使用add命令将工作区的文件添加到暂存区里；
3. 本地仓库：.git文件夹里还包括git自动创建的master分支，并且将HEAD指针指向master分支。使用commit命令可以将暂存区中的文件添加到本地仓库中；
4. 远程仓库：不是在本地仓库中，项目代码在远程git服务器上，比如项目放在github上，就是一个远程仓库，通常使用clone命令将远程仓库拷贝到本地仓库中，开发后推送到远程仓库中即可；

### 2.3 工作区、暂存区、版本库



![git几个核心区域间的关系](https://user-gold-cdn.xitu.io/2018/4/25/162fcc0e7e711dc7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 图中左侧为工作区，右侧为版本库。在版本库中标记为 "index" 的区域是暂存区（stage/index），标记为 "master" 的是 master 分支所代表的目录树。
- 图中我们可以看出此时 "HEAD" 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。
- 图中的 objects 标识的区域为 Git 的对象库，实际位于 ".git/objects" 目录下，里面包含了创建的各种对象及内容。
- 当对工作区修改（或新增）的文件执行 **git add** 命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。
- 当执行提交操作（git commit）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。
- 当执行 **git reset HEAD** 命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。
- 当执行 **git rm --cached ** 命令时，会直接从暂存区删除文件，工作区则不做出改变。
- 当执行 **git checkout .** 或者 **git checkout -- ** 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。
- 当执行 **git checkout HEAD .** 或者 **git checkout HEAD ** 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。

日常开发时代码实际上放置在工作区中，也就是本地的XXX.java这些文件，通过add等这些命令将代码文教提交给暂存区（Index/Stage），也就意味着代码全权交给了git进行管理，之后通过commit等命令将暂存区提交给master分支上，也就是意味打了一个版本，也可以说代码提交到了本地仓库中。另外，团队协作过程中自然而然还涉及到与远程仓库的交互。

因此，经过这样的分析，git命令可以分为这样的逻辑进行理解和记忆：

1. git管理配置的命令；

   **几个核心存储区的交互命令：**

2. 工作区与暂存区的交互；

3. 暂存区与本地仓库（分支）上的交互；

4. 本地仓库与远程仓库的交互。

## 3 git基本操作

### 3.1 创建目录

创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录：

```
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
```

`pwd`命令用于显示当前目录。在我的Mac上，这个仓库位于`/Users/michael/learngit`

### 3.2 git初始化

```git
$ git init
```

通过`git init`命令把这个目录变成Git可以管理的仓库

### 3.3 添加文件到git仓库

#### 3.3.1 操作流程

1. 第一步，用命令`git add`告诉Git，改动的文件添加到暂缓区：

   ```bash
   //添加单个文件
   git add readme.txt
   //添加整个文件夹
   git add 文件夹/
   //添加所有改动的文件
   git add --all
   ```

2. 第二步，用命令`git commit`告诉Git，将暂缓区的文件提交到本地仓库：

   ```
   $ git commit -m "wrote a readme file"
   [master (root-commit) eaadf4e] wrote a readme file
    1 file changed, 2 insertions(+)
    create mode 100644 readme.txt
   ```

   `git commit`命令，`-m`后面输入的是本次提交的说明，可以输入任意内容，一般是说明此次文件的改动，这样你就能从历史记录里方便地找到改动记录

3. 查看历史提交信息：如下
   `git log`

```
PS F:\前端\gitTest> git log
commit 9d6b558e4f7a405999bdc17af17a1ceb5e1dd46b (HEAD -> master)
Author: jiange <1563610087@qq.com>
Date:   Sun Nov 1 11:26:50 2020 +0800
```

commit后面的9d6b558e4f7a405999bdc17af17a1ceb5e1dd46b是采用sha-1算法生成的，每次提交都会生成这样的字符串标识唯一的提交记录

​	` git log --oneline`

```bash
//这个命令可以将提交记录简化成1行
PS F:\前端\gitTest> git log --oneline
013b449 (HEAD -> master) 增加样式
6d320c2 第一次改动
9d6b558 项目初始化2
44703f6 项目初始化
```

#### 3.3.2 **git commit常见操作**

**1 修改上一次commit中的提交的说明内容**

```
git commit --amend -m "要修改的内容"
```

```JavaScript
//执行命令前，最新的提交信息为：增加样式
PS F:\前端\gitTest> git log --oneline
013b449 (HEAD -> master) 增加样式
6d320c2 第一次改动
9d6b558 项目初始化2
44703f6 项目初始化

//执行命令后，最新的提交信息：修改主页样式，同时也改变了上一次提交的sha-1字符串，由013b449变为ad7705b
PS F:\前端\gitTest> git commit --amend -m "修改主页样式"
[master ad7705b] 修改主页样式
 Date: Sun Nov 1 11:50:01 2020 +0800
 1 file changed, 3 insertions(+)
 create mode 100644 index.css
```

**2 删除上一次的commit**

**3 追加一个文件到最近的commit**

刚进行了commit，发现还有一个文件忘记提交，想把这个文件加到最近的一个commit，而不是在重新commit一次

操作：

文件如果还是untracked状态，先将文件add进缓存区

然后执行命令

```
git commit --amend --no-edit
```

### 3.4 git查询历史记录

查询某个人的提交记录

```
git log --oneline --author="jiange"
```

查询提交的信息包含某些关键字

```
git log --oneline --grep="关键字"
```

通过sourceTree可以直接搜索，在主界面-search-进行搜索

### 3.5 版本回退

想要删除上一次commit的内容，可以采用reset版本回退

```
git reset [--soft | --mixed | --hard] [HEAD]
```

共有三种模式：

| 模式               | mixed        | soft       | hard     |
| ------------------ | ------------ | ---------- | -------- |
| commit拆除来的文件 | 放回工作目录 | 放回暂缓区 | 直接删除 |

* mixed
  --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。这种方式会重置暂缓区的内容，即把暂缓区的文件给删除，但是不会影响工作区的内容。

* soft

  soft不会删除工作区和暂缓区，将上次的内容退回到暂缓区

* hard

  回退到之前的某个版本，并将这个版本之后的所有改动和提交都删除，这个模式**谨慎使用**

回退方式有两种，一种是**相对回退**，以当前为基准，往前回退多个个版本，还有一种是**绝对回退**，回退到指定版本

**相对回退：**

```java
//退到上一个版本
git reset  HEAD^ 
//退到前两个版本
git reset  HEAD^^

HEAD 说明：
HEAD 表示当前版本
HEAD^ 上一个版本
HEAD^^ 上上一个版本
以此类推...

可以使用 ～数字表示
HEAD~0 表示当前版本
HEAD~1 上一个版本
HEAD^2 上上一个版本
以此类推...
```

**绝对回退：**

```
//指定要回退的版本sha-1码
git reset  ffb97b5
```

**版本回退撤销**

以上所有操作都可以进行版本回退的撤销，包括hard模式

版本回退之后又想撤销，回到没有回退的状态

```shell
git reset --hard id
这里的id是通过git log查看到的版本id，可以写一部分即可
```

如果忘记版本id，通过下面指令查看

```shell
git reflog
```

### 3.6 撤销修改

```
git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

该命令就是回到还未add和commit的状态

* 查看文件内容

  ```java
  cat 文件名
  ```

添加到缓存去后撤销，即执行add还没执行commit

```ja
git reset HEAD 文件名
```

####总结

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)一节，不过前提是没有推送到远程库。

### 3.7 删除文件

一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用`rm`命令删了：

```
$ rm test.txt
```

这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了：

```
$ git status
```

现在你有两个选择：

* 一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：

```
$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master d46f35e] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

现在，文件就从版本库中被删除了。

* 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

```
$ git checkout -- test.txt
```

`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”

#### 总结

命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容

## 4 git常用命令

### 4.1 工作区命令

**清理工作区中未添加到暂缓区的文件，即untracked文件**

git clean -n

是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒

git clean -f

删除当前目录下所有没有track过的文件. 他不会删除.gitignore文件里面指定的文件夹和文件, 不管这些文件有没有被track过

git clean -f 

删除指定路径下的没有被track过的文件

git clean -df

删除当前目录下没有被track过的文件和文件夹

git clean -xf

删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件

git reset --hard和git clean -f是一对好基友. 结合使用他们能让你的工作目录完全回退到最近一次commit的时候

git clean对于刚编译过的项目也非常有用. 如, 他能轻易删除掉编译后生成的.o和.exe等文件. 这个在打包要发布一个release的时候非常有用

### 4.2 git配置命令

> 查询配置信息

1. 列出当前配置：`git config --list`;
2. 列出repository配置：`git config --local --list`;
3. 列出全局配置：`git config --global --list`;
4. 列出系统配置：`git config --system --list`;

> 第一次使用git，配置用户信息

1. 配置用户名：`git config --global user.name "your name"`;
2. 配置用户邮箱：`git config --global user.email "youremail@github.com"`;

> 其他配置

1. 配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：`git config --global merge.tool vimdiff`;
2. 配置git命令输出为彩色的：`git config --global color.ui auto`;
3. 配置git使用的文本编辑器：`git config --global core.editor vi`;

### 4.3 工作区上的操作命令

> 新建仓库

1. 将工作区中的项目文件使用git进行管理，即创建一个新的本地仓库：`git init`；
2. 从远程git仓库复制项目：`git clone <url>`，如：git clone git://github.com/wasd/example.git;克隆项目时如果想定义新的项目名，可以在clone命令后指定新的项目名：`git clone git://github.com/wasd/example.git mygit`；

> 提交

1. 提交工作区所有文件到暂存区：`git add .`
2. 提交工作区中指定文件到暂存区：`git add <file1> <file2> ...`;
3. 提交工作区中某个文件夹中所有文件到暂存区：`git add [dir]`;

> 撤销

1. 删除工作区文件，并且也从暂存区删除对应文件的记录：`git rm <file1> <file2>`;
2. 从暂存区中删除文件，但是工作区依然还有该文件:`git rm --cached <file>`;
3. 取消暂存区已经暂存的文件：`git reset HEAD <file>...`;
4. 撤销上一次对文件的操作：`git checkout --<file>`。要确定上一次对文件的修改不再需要，如果想保留上一次的修改以备以后继续工作，可以使用stashing和分支来处理；
5. 隐藏当前变更，以便能够切换分支：`git stash`；
6. 查看当前所有的储藏：`git stash list`；
7. 应用最新的储藏：`git stash apply`，如果想应用更早的储藏：`git stash apply stash@{2}`；重新应用被暂存的变更，需要加上`--index`参数：`git stash apply --index`;
8. 使用apply命令只是应用储藏，而内容仍然还在栈上，需要移除指定的储藏：`git stash drop stash{0}`；如果使用pop命令不仅可以重新应用储藏，还可以立刻从堆栈中清除：`git stash pop`;
9. 在某些情况下，你可能想应用储藏的修改，在进行了一些其他的修改后，又要取消之前所应用储藏的修改。Git没有提供类似于 stash unapply 的命令，但是可以通过取消该储藏的补丁达到同样的效果：`git stash show -p stash@{0} | git apply -R`；同样的，如果你沒有指定具体的某个储藏，Git 会选择最近的储藏：`git stash show -p | git apply -R`；

> 更新文件

1. 重命名文件，并将已改名文件提交到暂存区：`git mv [file-original] [file-renamed]`;

> 查新信息

1. 查询当前工作区所有文件的状态：`git status`;
2. 比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内容：git diff；指定文件在工作区和暂存区上差异比较：`git diff <file-name>`;

### 4.4  暂存区上的操作命令

> 提交文件到版本库

1. 将暂存区中的文件提交到本地仓库中，即打上新版本：`git commit -m "commit_info"`;
2. 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：`git commit -a -m "commit_info"`;
3. 提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交：`git commit --amend`;

> 查看信息

1. 比较暂存区与上一版本的差异：`git diff --cached`;
2. 指定文件在暂存区和本地仓库的不同：`git diff <file-name> --cached`;
3. 查看提交历史：git log；参数`-p`展开每次提交的内容差异，用`-2`显示最近的两次更新，如`git log -p -2`;

> 打标签

Git 使用的标签有两种类型：**轻量级的（lightweight）和含附注的（annotated）**。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

1. 列出现在所有的标签：`git tag`;
2. 使用特定的搜索模式列出符合条件的标签，例如只对1.4.2系列的版本感兴趣：`git tag -l "v1.4.2.*"`;
3. 创建一个含附注类型的标签，需要加`-a`参数，如`git tag -a v1.4 -m "my version 1.4"`;
4. 使用git show命令查看相应标签的版本信息，并连同显示打标签时的提交对象：`git show v1.4`;
5. 如果有自己的私钥，可以使用GPG来签署标签，只需要在命令中使用`-s`参数：`git tag -s v1.5 -m "my signed 1.5 tag"`;
6. 验证已签署的标签：git tag -v ，如`git tag -v v1.5`;
7. 创建一个轻量级标签的话，就直接使用git tag命令即可，连`-a`,`-s`以及`-m`选项都不需要，直接给出标签名字即可，如`git tag v1.5`;
8. 将标签推送到远程仓库中：git push origin ，如`git push origin v1.5`；
9. 将本地所有的标签全部推送到远程仓库中：`git push origin --tags`;

> 分支管理

1. 创建分支：`git branch <branch-name>`，如`git branch testing`；
2. 从当前所处的分支切换到其他分支：`git checkout <branch-name>`，如`git checkout testing`；
3. 新建并切换到新建分支上：`git checkout -b <branch-name>`;
4. 删除分支：`git branch -d <branch-name>`；
5. 将当前分支与指定分支进行合并：`git merge <branch-name>`;
6. 显示本地仓库的所有分支：`git branch`;
7. 查看各个分支最后一个提交对象的信息：`git branch -v`;
8. 查看哪些分支已经合并到当前分支：`git branch --merged`;
9. 查看当前哪些分支还没有合并到当前分支：`git branch --no-merged`;
10. 把远程分支合并到当前分支：`git merge <remote-name>/<branch-name>`，如`git merge origin/serverfix`；如果是单线的历史分支不存在任何需要解决的分歧，只是简单的将HEAD指针前移，所以这种合并过程可以称为快进（Fast forward），而如果是历史分支是分叉的，会以当前分叉的两个分支作为两个祖先，创建新的提交对象；如果在合并分支时，遇到合并冲突需要人工解决后，再才能提交；
11. 在远程分支的基础上创建新的本地分支`：git checkout -b <branch-name> <remote-name>/<branch-name>`，如`git checkout -b serverfix origin/serverfix`;
12. 从远程分支checkout出来的本地分支，称之为跟踪分支。在跟踪分支上向远程分支上推送内容：`git push`。该命令会自动判断应该向远程仓库中的哪个分支推送数据；在跟踪分支上合并远程分支：`git pull`；
13. 将一个分支里提交的改变移到基底分支上重放一遍：`git rebase <rebase-branch> <branch-name>`，如`git rebase master server`，将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线；如果想把基于一个特性分支上的另一个特性分支变基到其他分支上，可以使用`--onto`操作：`git rebase --onto <rebase-branch> <feature branch> <sub-feature-branch>`，如`git rebase --onto master server client`；使用rebase操作应该遵循的原则是：**一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作**；

### 4.5 本地仓库上的操作

1. 查看本地仓库关联的远程仓库：`git remote`；在克隆完每个远程仓库后，远程仓库默认为`origin`;加上`-v`的参数后，会显示远程仓库的`url`地址；
2. 添加远程仓库，一般会取一个简短的别名：`git remote add [remote-name] [url]`，比如：`git remote add example git://github.com/example/example.git`;
3. 从远程仓库中抓取本地仓库中没有的更新：`git fetch [remote-name]`，如`git fetch origin`;使用fetch只是将远端数据拉到本地仓库，并不自动合并到当前工作分支，只能人工合并。如果设置了某个分支关联到远程仓库的某个分支的话，可以使用`git pull`来拉去远程分支的数据，然后将远端分支自动合并到本地仓库中的当前分支；
4. 将本地仓库某分支推送到远程仓库上：`git push [remote-name] [branch-name]`，如`git push origin master`；如果想将本地分支推送到远程仓库的不同名分支：`git push <remote-name> <local-branch>:<remote-branch>`，如`git push origin serverfix:awesomebranch`;如果想删除远程分支：`git push [romote-name] :<remote-branch>`，如`git push origin :serverfix`。这里省略了本地分支，也就相当于将空白内容推送给远程分支，就等于删掉了远程分支。
5. 查看远程仓库的详细信息：`git remote show origin`；
6. 修改某个远程仓库在本地的简称：`git remote rename [old-name] [new-name]`，如`git remote rename origin org`；
7. 移除远程仓库：`git remote rm [remote-name]`；

## 5 文件忽略

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。如下例：

```
# 忽略某个文件，直接写文件名，例如
a.html
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt
```

## 6 分支操作

### 6.1 分支基本操作

```javascript
//查看当前所有分支
git branch
//创建分支
git branch 分支名
//更改分支名称
git branch -m 要改的分支名 改后的分支名
//删除分支
git branch -d 分支名
//强行删除未完全合并的分支
git branch -D 分支名
//切换分支
git checkout 分支名
```

#### 6.1.1 创建分支

* 创建远程分支
* 创建本地分支
  git branch 分支名

#### 6.2.1 查看分支

* 查看远程分支
  git branch -a 
  这个命令查看所有分支，本地和远程，带有remote的就是远程分支
* 查看本地分支
  git branch

#### 6.3.1 删除分支

* 删除远程分支

```
查看所有分支：git branch -a 
结果如下：
* master
  remotes/origin/master
  remotes/origin/todolist-2
  
  下面这两个表示远程分支
  remotes/origin/master
  remotes/origin/todolist-2
  删除远程分支
  git push origin --delete todolist-2
  再执行git branch -a可看到删除的分支已经没有了
  
```

* 删除本地分支

```
git branch -d <name>
注意：如果现在正处于该分支上，就不能删除，切换到其他分支就可以了
```

创建分支：`git branch 分支名`

切换分支：`git checkout 分支名

创建+切换分支：`git checkout -b 分支名

合并某分支到当前分支：`git merge 分支名

git切换分支时，如果有未untracked文件，切换分支这个文件是不会随着分支切换而改变**

### 6.2 分支合并

分支合并有两种方式，一种是merge，一种是rebase

### 6.3 合并冲突

### 6.4 合并取消

merge合并方式

```
git reset --hard head^
```

rebase合并方式

方案1：

通过reflog查看rebase之前的最近一次提交记录

通过reset回到指定版本

方案2：

使用ORIG_HEAD，这个是在git文件夹中能看到，作用是记录最近一次危险操作前的head位置。危险操作包括merge、rebase、reset

```
git reset --hard ORIG_HEAD
```

### 6.5 更改commit

更改commit有三种方式

| 指令   | 修改历史记录 | 说明                                                         |
| ------ | ------------ | ------------------------------------------------------------ |
| reset  | 是           | 把当前的状态设置为某个指定的commit状态，通常适用于尚未推出去的commit |
| rebase | 是           | 不管是新增，改动、删除commit，都很方便，但通常适用于尚未推出去的commit |
| revert | 是           | 新增一个commit来取消另一个commit的内容，原来的commit依旧会保留在历史记录中，通常适用于已经推出去的commit内容 |

### 6.5 从历史commit创建分支

## 7 远程分支

### 7.1 连接远程仓库

```
git remote add origin git@github.com:michaelliao/learngit.git
```

添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库

查看连接的远程地址：

```javascript
git remote -v
```

### 7.2 推送文件到远程库

```shell
 git push -u origin master
```

把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

### 7.3 克隆远程仓库

克隆github已经存在的远程仓库

不指定分支名

```
git clone git@github.com:账户名/仓库名.git
```

指定分支名

git clone -b 分支名 地址

git clone -b dev_jk http://10.1.1.11/service/tmall-service.git

## 8 git开发流程

```
进入项目文件夹
git init //项目初始化，创建一个git仓库
git add 文件夹名/文件名  //添加文件到git仓库
git commit -m "提交的时候输入的内容" //提交文件到git仓库
git remote add origin git@github.com:michaelliao/learngit.git //连接远程仓库
git push -u origin master //推送当前分支到远程仓库

更新git 分支
1. 切换到分支（这个分支为自己从哪个分支里面创建的分支）git checkout feature/twoway-qzj 
2. git pull 拉取分支的最新内容
3. 切换回自己的分支，在自己的分支上执行 git merge --no-ff feature/twoway，意思是将feature/twoway合并到自己的分支
```

