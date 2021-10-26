#   Given a sorted array of distinct integers and a target value,
#   return the index if the target is found.
#   If not, return the index where it would be if it were inserted in order.
#   You must write an algorithm with O(log n) runtime complexity.
count = 0
def binarySearch(nums, left, right, target, mid):
    mid_1 = mid
    #print('mid_1', mid_1)
    if right >= left:
        mid = (left+right)//2
        mid_1 = mid
        if(nums[mid] == target):
           # print('found',mid)
            return mid
        elif(nums[mid] > target):
            #print('greater', mid)
            binarySearch(nums, left, mid-1, target, mid)
        else:
            print('lesser', mid)
            binarySearch(nums, mid+1, right , target, mid)
    
    return 0
def searchInsertPosition(nums, target):
    position = binarySearch(nums, 0, len(nums), target,  0)
    print(position,'position found')
    return position

nums = [1,3,5,6]
target = 5
pos = binarySearch(nums,  0, len(nums), target,  0)
print(pos)