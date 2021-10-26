def climbingStairs(n):
    start = 1
    start2 = 1
    l= []
    for i in range(n):
        res = start+start2
        start = start2
        start2 = res
        l.append(res)
    return len(l)


print(climbingStairs(10))

