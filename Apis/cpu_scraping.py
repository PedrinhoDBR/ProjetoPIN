import requests
from bs4 import BeautifulSoup
from sqlalchemy import insert
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, create_engine

URL="mysql+mysqlconnector://root:root123@localhost/teste"
engine = create_engine(url=URL)

Base = declarative_base()

class Processor(Base):
    __tablename__ = "processor"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    codename = Column(String(150), nullable=False)
    cores = Column(String(150), nullable=False)
    clock = Column(String(150), nullable=False)
    socket = Column(String(150), nullable=False)
    process = Column(String(150), nullable=False)
    L3 = Column(String(150), nullable=False)
    TDP = Column(String(150), nullable=False)
    data = Column(String(150), nullable=False)

basedata = {
    "id" : 0,
    "name":"",
    "codename":"",
    "cores":"",
    "clock":"",
    "socket":"",
    "process":"",
    "L3":"",
    "TDP":"",
    "data":""
}

# URL to scrape
url = 'https://www.techpowerup.com/cpu-specs/'

# Send a GET request to the URL and parse the HTML content using BeautifulSoup
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find all the tables on the page
tables = soup.find_all('table')

# Loop through each table
for table in tables:
    # Find all the rows in the table
    rows = table.find_all('tr')
    #print(rows)
    # Loop through each row
    for row in rows:
        # Find the columns in the row
        cols = row.find_all('td')
        #print(f'colunas pae: {cols}')
       
        for indexdict, key in enumerate(basedata.keys()):
            for indexcol, info in enumerate(cols):
                if indexdict == indexcol:
                    basedata[key] = info.text
                elif key == 'id':
                    basedata[key] = 1

            
    insert(Processor).values(basedata)
    print('------------------------\n')

Base.metadata.create_all(engine)

    # Extract the CPU specification from the columns and print it
#    if len(cols) == 2:
#        spec_name = cols[0].text.strip()
#        spec_value = cols[1].text.strip()
#        print(f"{spec_name}: {spec_value}")
#                        match key:
#                        case 'name':
#                            p.name = info.text
#                        case 'codename':
#                            p.codename = info.text
#                        case 'cores':
#                            p.cores = info.text
#                        case 'clock':
#                            p.clock = info.text
#                        case 'socket':
#                            p.socket = info.text
#                        case 'process':
#                            p.process = info.text
#                        case 'L3':
#                            p.L3 = info.text
#                        case 'TDP':
#                            p.TDP = info.text
#                        case 'data':
#                            p.data = info.text
#

# Find the table header and get the CPU name
##    header = table.find('h3')
##    cpu_name = header.text.strip()
##    print(f"CPU: {cpu_name}")