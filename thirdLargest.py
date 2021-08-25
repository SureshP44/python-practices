def thirdLargest(arr):
    first = -1
    second = 0
    maximum = -1000
    for i in range(len(arr)):
        if arr[i]>maximum:
            maximum = arr[i]
            second = first
            first = arr[i]
    
    print(first)
    print(second)

arr = [1, 2, 4, 3,5, 9, 23, 34, 20]
thirdLargest(arr)