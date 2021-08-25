def insertElement(arr, element):
    if(len(arr) == 0):
        arr.append(element)
    else:
        arr.append(element)
        length = len(arr)-1
        while length > 0:
            if arr[length//2] <= arr[length]:
                temp = arr[length//2]
                arr[length//2] = arr[length]
                arr[length] = temp
                length = length//2
            else:
                break

def deleteRoot(arr):
    length = len(arr)-1
    if length == 0:
        return 0
    else:
        arr[0] = arr.pop()
        i = 0
        while i < len(arr):
            if i == 0:
                temp = arr[1]
                arr[1] = arr[0]
                arr[0] = temp
                i+=1
            else:
                j = i*2+1
                if j < len(arr):
                    temp = arr[j]
                    arr[j] = arr[i]
                    arr[i] = temp
                    i = i*2+1
                else:
                    break
    print(arr)      

arr = []
insertElement(arr, 50)
insertElement(arr, 45)
insertElement(arr, 35)
insertElement(arr, 33)
insertElement(arr, 16)
insertElement(arr, 25)
insertElement(arr, 34)
insertElement(arr, 12)
insertElement(arr, 10)
print('after insertion', arr)
print('delete root')
deleteRoot(arr)


