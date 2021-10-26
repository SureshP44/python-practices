class Base1:
    def __init__(self):
        print('in base 1')
    def add(self):
        print('adding in base1')
class Base2():
    def __init__(self):
        print('in base 2')
    def add(self):
        print('adding in base2')

class Derived(Base1, Base2):
    def __init__(self):
        print('in derived')
    def add(self):
        print('adding in derived')
        super(Base2).add()



der = Derived()
der.add()
