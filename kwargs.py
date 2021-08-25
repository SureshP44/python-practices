def input_check(name, *arguments, **keywords):
    print('my name is ', name)
    print('*'*40)
    for args in arguments:
        print(args)
    print('*'*40)
    for kwd in keywords:
        print(kwd, keywords[kwd])
    
input_check('suresh','surya','pradeep',a=10,b=5)