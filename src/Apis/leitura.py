with open('jogosID.txt','r') as file:
    for line in file:
        id = line.split("-")[1].strip()
        if id.isdigit():
            print(id)
        else:
            print(line.split("-")[2].strip())
