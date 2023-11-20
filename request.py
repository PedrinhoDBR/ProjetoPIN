import requests
from bs4 import BeautifulSoup
from sys import stdin, stdout
import json
message = stdin.readline()
message = json.loads(message)
args = message['args']



url = 'https://www.techpowerup.com/'+ args[1] +'/?ajaxsrch='+args[0]
response = requests.get(url)
if response.status_code == 200:

    
    soup = BeautifulSoup(response.text, 'html.parser')

    cpus = []
    table = soup.find('table', class_='processors')

    header_row = table.find('thead').find('tr')

    column_names = [header.text.strip() for header in header_row.find_all('th')]

    data_rows = table.find_all('tr')[1:] 

    for row in data_rows:
        columns = row.find_all('td')

        if len(columns) == len(column_names):
            cpu_info = {column_names[i]: columns[i].text.strip() for i in range(len(column_names))}
            cpus.append(cpu_info)



    response_json = json.dumps(cpus)
    stdout.write(response_json)
    stdout.flush()


