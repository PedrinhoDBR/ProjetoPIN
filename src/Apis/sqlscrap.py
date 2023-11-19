import pymysql
import csv

# Configurações do banco de dados
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'db': 'newimports',
}

# Nome do arquivo CSV
csv_file_path = r'C:\Users\pedri\Downloads\!programação\!PIN_BANCO\auxiliar\output.csv'

# Estabeleça a conexão com o banco de dados
conn = pymysql.connect(**db_config)
cursor = conn.cursor()

# Abra o arquivo CSV e leia as linhas
with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)
    
    # As colunas estão na primeira linha
    columns = next(csv_reader)
    
    # Mapeamento de colunas do CSV para colunas do banco de dados
    column_mapping = {
        'Memory:': 'Memory',
        'Graphics Card:': 'GraphicsCard',
        'CPU:': 'CPU',
        'File Size:': 'FileSize',
        'OS:': 'OS',
        'name': 'name',
        # Adicione mais mapeamentos conforme necessário
    }
    
    # Prepare o comando SQL de inserção
    placeholders = ', '.join(['%s' for _ in columns])
    insert_query = f"INSERT INTO auxiliargames ({', '.join(column_mapping.values())}) VALUES ({placeholders})"
    
    # Itere sobre as linhas do arquivo CSV e insira-as no banco de dados
    for row in csv_reader:
        # Mapeie as colunas do CSV para as colunas correspondentes do banco de dados
        mapped_row = [row[columns.index(column)] if column in columns else '' for column in column_mapping.keys()]
        cursor.execute(insert_query, mapped_row)

# Commit as

conn.commit()
conn.close()

print("Importação concluída com sucesso!")
