# 算法

## 1 搜索算法

### 二分查找

#### 经典写法

复杂度log(n)

说明：查找的内容必须有序

```javascript
function find (arr,target) {
        var left=0,right=arr.length-1,mid


        while(left<=right){
          mid=Math.floor((left+right)/2)
          if (arr[mid]>target) {
            right=mid-1
          }else if(arr[mid]<target){
            left=mid+1
          }else {
            return mid
          }
        }
        return -1
    }

    var arr=[1,2,3,4,5,6,7,8,9,10]
    var b=find(arr,20)
    console.log(b)
```

#### floor函数

```javascript
var searchInsert = function(nums, target) {
   
    var l = -1, r = nums.length-1;
    //寻找小于target的最大索引
    
        while( l < r ){
            // 使用向上取整避免死循环
            var mid = Math.ceil((l+r)/2)
            if( nums[mid]>=target)
                {r = mid - 1;}
            else
                {l = mid;}
        }
        return l+1   
 }
```

#### ceil函数

#### 二分搜索树

## 2 双指针

| leetcode题号 | 题目 | 难度 |
| ------------ | ---- | ---- |
| 167          |      | 简单 |
| 633          |      | 简单 |
|              |      |      |

## 3 递归

#### 递归思想

## 递推

## 4 回溯

## 5 动态规划



1 最大子序和

```javascript
var maxSubArray = function(nums) {
     var res = nums[0];
        var sum = 0;
        for (var num of nums) {
            if (sum > 0)
                sum += num;
            else
                sum = num;
            res = Math.max(res, sum);
        }
        return res;
     
};
```



## 6 贪心算法

## 7 字符串

| 题号 | 题目                                           | 难度 | 备注     |
| ---- | ---------------------------------------------- | ---- | -------- |
| 3    | 无重复字符的最长子串                           | 中   | 滑动窗口 |
| 242  | 两个字符串包含的字符是否完全相同               | 简单 | hashmap  |
| 409  | 计算一组字符集合可以组成的回文字符串的最大长度 | 简单 | hashmap  |
| 205  | 字符串同构                                     | 简单 |          |

1 统计一个字符串中出现频率最高的字母/数字

**集合**

采用hashmap来表示，这是一个对象，对象的属性可以快速查到是否有key，将值变为对象的key

```javascript
let str = 'asdfghjklaqwertyuiopiaia';
const strChar = str => {
    let string = [...str],//
        maxValue = '',
        obj = {},
        max = 0;
    //下面这种高级的写法可以直接创立map
    //for(let item of str){
     //   obj[item]=(obj[item]||0)+1
   // }
    	string.forEach(value => {
        obj[value] = obj[value] == undefined ? 1 : obj[value] + 1
        if (obj[value] > max) {
            max = obj[value]
            maxValue = value
        }
    })
return maxValue;
}
console.log(strChar(str))    // a
```

2 给定两个字符串 *s* 和 *t* ，编写一个函数来判断 *t* 是否是 *s* 的字母异位词

```javascript
转数组排序之后转字符串
var isAnagram = function(s, t) {
    if(s.length!==t.length){
        return false;
    }
    var a=s.split('').sort(),
        b=t.split('').sort();
    return a.toString()===b.toString();
};
```

3 计算一组字符集合可以组成的回文字符串的最大长度

```javascript
使用长度为 256 的整型数组来统计每个字符出现的个数，每个字符有偶数个可以用来构成回文字符串。
因为回文字符串最中间的那个字符可以单独出现，所以如果有单独的字符就把它放到最中间
var longestPalindrome = function(s) {
    var map = {}
    for(let item of s){
        map[item]=(map[item]||0)+1

    }
    var count=0
    for(let item in map){
       count+=Math.floor((map[item]/2))*2 
    }
    if(count<s.length) count++
    
    return count
};
```

4 字符串同构

字符首次出现的位置一致就是同构

```
var isIsomorphic = function(s, t) {
    if(s.length!==t.length) return false
    for(var i=0;i<s.length;i++){
        if(s.indexOf(s[i])!==t.indexOf(t[i])) return false
    }
    return true
};
```

5 两个字符串的最长公共连续子串