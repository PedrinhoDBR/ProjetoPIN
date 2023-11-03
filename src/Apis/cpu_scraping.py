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
csv_file_path  = r'C:\Users\pedri\Downloads\!programação\!PIN_BANCO\csv\steam_description_data.csv'

# Estabeleça a conexão com o banco de dados
conn = pymysql.connect(**db_config)
cursor = conn.cursor()
c = 0 
with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    # Itere sobre as linhas do arquivo CSV
    for row in csv_reader:
        steam_appid, detailed_description, about_the_game, short_description = row
        if steam_appid == '578080':
            # Consulta para encontrar o valor de 'appid' com base em 'steam_appid'
            # query = "SELECT appid FROM steamgames WHERE appid = %s"
            # cursor.execute(query, steam_appid)

            # result = cursor.fetchone()  # Recupere o valor correspondente de 'appid'

            # if result:
            appid = steam_appid
            # Insira as informações adicionais na linha correspondente
            update_query = "UPDATE steamgames SET detailed_description = %s, about_the_game = %s, short_description = %s WHERE appid = %s"
            cursor.execute(update_query, (detailed_description, about_the_game, short_description, appid))
            conn.commit()

conn.close()

print("Atualização concluída com sucesso!")