import sys
import requests

# app_id = 570 # Dota 2's app ID on Steam
app_id = sys.argv[1]
api_url = f'https://store.steampowered.com/api/appdetails?appids={app_id}&l=brazilian'

response = requests.get(api_url)
data = response.json()

# Get the minimum and recommended system requirements
min_reqs = data[str(app_id)]['data']['pc_requirements']
rec_reqs = data[str(app_id)]['data']['pc_requirements']

print(f'Minimum Requirements: {min_reqs}')
print(f'Recommended Requirements: {rec_reqs}')