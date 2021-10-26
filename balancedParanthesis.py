def balancedParam(s):
    if len(s) == 0:
        return False
    l1 = []
    l2 = []
    for i in range(len(s)):
        l1.append(s[i])
    print(l1)
    for i in range(len(l1)):
        if(l1[i]== '{' or l1[i]== '[' or l1[i]== '(' or l1[i]=='<'):
            print('appended')
            l2.append(l1[i])
        else:
            try:
                if(l1[i] == ')' and l2[-1] == '('):
                    l2.pop()
                    if(i == len(l1)-1) and len(l2):
                        print('l2',l2)
                        return True
                    else:
                        pass
                elif(l1[i] == '}' and l2[-1] == '{'):
                    l2.pop()
                    if(i == len(l1)-1) and len(l2):
                        print('l2-1',l2)
                        return True
                    else:
                        pass
                elif(l1[i] == ']' and l2[-1] == '['):
                    l2.pop()
                    if(i == len(l1)-1) and not(len(l2)):
                        print('l2-2',l2)
                        return True
                    else:
                        pass
                elif(l1[i] == '>' and l2[-1] == '<'):
                    l2.pop()
                    if(i == len(l1)-1) and len(l2):
                        print('l2-3',l2)
                        return True
                    else:
                        pass
                else:
                   return False
            except:
                return False

str = '([]'
res = balancedParam(str)
print(res)
