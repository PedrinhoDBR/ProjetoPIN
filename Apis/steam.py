import sys
import json
import requests

# app_id = 570 # Dota 2's app ID on Steam
app_id = sys.argv[1]
api_url = f'https://store.steampowered.com/api/appdetails?appids={app_id}&l=english'

response = requests.get(api_url)
data = response.json()

# Get the minimum and recommended system requirements
min_reqs = data[str(app_id)]['data']['pc_requirements']['minimum']
header_image = data[str(app_id)]['data']['header_image']
print(f'{min_reqs}/imagem{header_image}')