import json

# some JSON:
with open("./res/thailand.json") as f:
    data = json.loads(f.read())
    print(len(data['features']))
    for i in range(len(data['features'])):
        box = data['features'][i]['bbox']
        print("'" + data['features'][i]['properties']['ADM1_TH'] + "'"+ " : { lng : " + str((box[0]+box[2])/2) + " , lat : " + str((box[1]+box[3])/2) + "} ,")
