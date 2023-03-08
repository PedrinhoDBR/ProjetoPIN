import requests

app_id = 570 # Dota 2's app ID on Steam
api_url = f'https://store.steampowered.com/api/appdetails?appids={app_id}&l=brazilian'

response = requests.get(api_url)
data = response.json()

# Get the minimum and recommended system requirements
NomeDoJogo = data[str(app_id)]['data']['name']
rec_reqs = data[str(app_id)]['data']['pc_requirements']
fulldata = data[str(app_id)]['data']

print(NomeDoJogo)
#print(f'Recommended Requirements: {rec_reqs}')