def fibonacci(n):
    n = int(n)
    a, b = 0, 1
    while a < n:
        a, b = b, a+b
        print(a, end=' ')
       
n = input('enter n')
fibonacci(n)