hashTable = ["", "", "abc", "def", "ghi", "jkl",
             "mno", "pqrs", "tuv", "wxyz"]
 
# A recursive function to print all
# possible words that can be obtained
# by input number[] of size n. The
# output words are one by one stored
# in output[]
 
 
def printWordsUtil(number, curr, output, n):
    if(curr == n):
      #  print(output,'print')
        temp = ''
        for i in range(len(output)):
            temp+=output[i]
        print(temp)
        return
 
    # Try all 3 possible characters
    # for current digir in number[]
    # and recur for remaining digits
    for i in range(len(hashTable[number[curr]])):
        #print('===current character===',hashTable[number[curr]][i])
        output.append(hashTable[number[curr]][i])
        printWordsUtil(number, curr + 1, output, n)
        output.pop()
        if(number[curr] == 0 or number[curr] == 1):
            return
 
# A wrapper over printWordsUtil().
# It creates an output array and
# calls printWordsUtil()
 
def letterCombinations(digits):
        d = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', 
             '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
        res = []
        def helper(pre, s):
            print('*****adfA****', pre)
            if len(s)==0:
                res.append(pre)
                return
            print(d[s[0]],'DS[0]')
            for val in d[s[0]]:
                #print('===VAL===', val)
                helper(pre+val, s[1:])
        if digits == "":
            return []
        helper('', digits)
        return res
 
 
# Driver function
if __name__ == '__main__':
    number = '234'
    #n = len(number)
    print(letterCombinations(number))