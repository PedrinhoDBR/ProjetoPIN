# import requests
# from sqlalchemy import insert
# from sqlalchemy.orm import declarative_base
# from sqlalchemy import Column, Integer, String, create_engine

# URL="mysql+mysqlconnector://root:1234@localhost/teste"
# engine = create_engine(url=URL)

# Base = declarative_base()

import pymysql
import csv
# Configurações do banco de dados
db_config = {
    'host': 'localhost', #3306
    'user': 'root',
    'password': '1234',
    'db': 'newimports',
}

# Nome do arquivo TXT
csv_file_path  = r'C:\Users\pedri\Downloads\!programação\!PIN_BANCO\steam_requirements_data.csv'

# Estabeleça a conexão com o banco de dados
conn = pymysql.connect(**db_config)
cursor = conn.cursor()

# Abra o arquivo CSV e leia as linhas
# with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
#     csv_reader = csv.reader(csv_file)
    
#     # As colunas estão na primeira linha
#     columns = next(csv_reader)
    
#     # Prepare o comando SQL de inserção
#     placeholders = ', '.join(['%s' for _ in columns])
#     insert_query = f"INSERT INTO steamgames ({', '.join(columns)}) VALUES ({placeholders})"
    
#     # Itere sobre as linhas do arquivo CSV e insira-as no banco de dados
#     for row in csv_reader:
#         cursor.execute(insert_query, row)

# # Commit as alterações e feche a conexão
# conn.commit()
# conn.close()

# print("Importação concluída com sucesso!")
batch_size = 100
c = 0

with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)
    batch = []
    # Itere sobre as linhas do arquivo CSV
    for row in csv_reader:

        steam_appid, pc_requirements, mac_requirements, linux_requirements, minimum, recommended = row
        c += 1
        if c >= 10:
            if int(float(steam_appid)) > 310460 :
                # # Consulta para encontrar o valor de 'appid' com base em 'steam_appid'
                # query = "SELECT appid FROM steamgames WHERE appid = %s"
                # cursor.execute(query, steam_appid)

                # result = cursor.fetchone()  # Recupere o valor correspondente de 'appid'

                # if result:
                appid = steam_appid
                print('ATUAL: '+ steam_appid)
                
                batch.append((pc_requirements, mac_requirements, linux_requirements, minimum, recommended, appid))
                if len(batch) >= batch_size:
                # Insira as informações nas colunas correspondentes
                    update_query = "UPDATE steamgames SET pc_requirements = %s, mac_requirements = %s, linux_requirements = %s, minimum = %s, recommended = %s WHERE appid = %s"
                    cursor.executemany(update_query, batch)
                    print('Commit: '+ steam_appid)
                    conn.commit()
                    batch = []

conn.close()

print("Atualização concluída com sucesso!")