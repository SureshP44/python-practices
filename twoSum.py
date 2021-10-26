def twoSum(nums, target):
    if len(nums) ==0:
        return 0
    end = len(nums)-1
    start = 0
    # orginalArr = nums[:]
    # nums.sort()
    #print(nums)
    while start < len(nums):
        if(nums[start]+nums[end] < target):
            start = start+1
        elif(nums[start]+nums[end] > target):
            end = end-1
        else:
            if start != end:
                # start = orginalArr.index(nums[start])
                # end = orginalArr.index(nums[end])
                res = []
                res.append(start)
                res.append(end)
                return res
            else:
                return 0
    return 0
   




l = [2,7,11,15]
result = twoSum(l, 9)
print(result)