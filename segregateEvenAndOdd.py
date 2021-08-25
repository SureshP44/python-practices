def segregateEvenAndOdd(arr):
    count = 0
    for i in range(len(arr)):
        if arr[i] % 2 == 0:
            temp = arr[i]
            arr[i] = arr[count]
            arr[count] = temp
            count = count+1
    print(arr)

arr = [1, 2, 4, 6, 5, 13, 24]
segregateEvenAndOdd(arr)
