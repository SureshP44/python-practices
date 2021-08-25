def partition(arr, left, right):
    pivot = arr[right]
    i = left-1
   
    for j in range(left, right):
        if(arr[j] <= pivot):
            i = i+1
            temp = arr[j]
            arr[j] = arr[i]
            arr[i] = temp
          
    temp = arr[right]
    arr[right] = arr[i+1]
    arr[i+1] = temp
    return i+1

def quickSort(arr, left, right):
    if(left < right):
        pivot = partition(arr, left, right)
        quickSort(arr, left, pivot-1)
        quickSort(arr, pivot+1, right)
        return arr


arr = [1, 4, 2, 6, 3, 7, 9, 23, 8]
print(len(arr))
arr1 = quickSort(arr, 0, len(arr)-1)
print(arr1)