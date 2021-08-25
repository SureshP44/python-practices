def moveZerosToEnd(arr):
    count = 0
    for i in range(len(arr)):
        if arr[i]!=0:
            arr[count] = arr[i]
            count = count+1
    
    print('arr',arr)
    while count < len(arr):
        arr[count] = 0
        count = count+1
    print('arr1',arr)

def moveZerosToEndBySwap(arr):
    count = 0
    for i in range(len(arr)):
        if arr[i] != 0:
            temp = arr[i]
            arr[i] = arr[count]
            arr[count] = temp
            count = count+1

    print(arr) 

arr = [1, 2, 3, 4, 5, 0, 2, 4, 0, 5]
moveZerosToEndBySwap(arr)