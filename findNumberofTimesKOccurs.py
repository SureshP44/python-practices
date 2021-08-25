def findIndex(arr, k , left, right):
    if(right < left):
        return -1
    mid = (right + left) // 2
    if arr[mid] > k:
        findIndex(arr, k, left, mid -1)
    elif arr[mid] < k:
        findIndex(arr, k, mid+1, right)
    else:
        print(mid)
        return mid

def findFrequency(arr, k):
    position = findIndex(arr, k, 0, len(arr)-1)
    print(position)
    left = position
    right = position

    if position != -1:
        while True:
            if arr[left] == k:
                left = left-1
            else:
                break
        
        while True:
            if arr[right] == k:
                right = right+1
            else:
                break
    print('total occurences of {0}, is {1}', k, right-left+1)
        

arr = [4, 4, 5, 23, 23, 23, 23, 23, 67]
findFrequency(arr, 23)