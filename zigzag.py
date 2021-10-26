def zigzag(str, numRows):
    matrix = [['' for i in range(len(str))] for j in range(len(str))]
    print(matrix)
    row = 0
    down = False
    for i in range(len(str)):
        print(i)
        matrix[row][i] = str[i]

        if(row == 0):
            down = True
        elif(row == numRows-1):
            down = False
        
        if(down== True):
            row = row +1
        else:
            row = row -1
    
    result = ""
    for i in range(len(str)):
        for j in range(len(str)):
            result+= matrix[i][j]
    return result

    # for j in range(n):
    #     for i in range(n):
    #         print('---------')
    #         for l in range(3):
    #             print(matrix[l][:])
    #             print('\n')
    #         print('---------')
    #         if(stringIndex +1 < len(str)):
    #             matrix[i][j] = str[stringIndex]
    #             stringIndex +=1
    #         else:
    #             return matrix


        
        # i = n-1
        # start = j
        # stop = n-2+start+1
        # print('start', start)
        # print('stop',stop)
        # print('i',i)
        # for k in range(stop):
        #     print(k)
        #     i-=1
        #     j+=1
        #     if(stringIndex +1 < len(str)):
        #         matrix[i][j] = str[stringIndex+1]
        #         stringIndex +=1
        #     else:
        #         return matrix
        

        
        

    



res = zigzag('suresh', 3)
print(res)