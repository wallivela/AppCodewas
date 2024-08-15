import pandas as pd
import json
import os

# Ruta del archivo Excel
file_path = 'C:\\Users\\walte\\Desktop\\EMPRESA\\desarrolplanilladecuadre\\AppCodewas\\facturas\\FacturasReturnDelivery.xlsx'
df = pd.read_excel(file_path)

# Cambiar los nombres de las columnas para que coincidan con los nombres en el archivo Excel
df = df.rename(columns={
    'Nombre': 'nombre',
    'Producto': 'producto',
    'Nombre.1': 'nombre_producto',
    'Tipo': 'tipo',
    'Cantidad': 'cantidad',
    'Bodega': 'bodega',
    'Vlr sin iva': 'vlr_sin_iva',
    'Vlr con iva': 'vlr_con_iva',
    'Factura': 'factura',
    'Vlr Factura': 'vlr_factura'
})

# Filtrar las columnas necesarias
df = df[['cliente', 'nombre', 'producto', 'nombre_producto', 'tipo', 'cantidad', 'bodega', 'vlr_sin_iva', 'vlr_con_iva', 'factura', 'vlr_factura']]

# Crear carpeta 'data' si no existe
os.makedirs('data', exist_ok=True)

# Guardar el dataframe como un archivo JSON
json_data = df.to_dict(orient='records')  # Convertir el DataFrame a una lista de diccionarios
with open('data/data.json', 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False, indent=4)  # Agregar indentación para legibilidad
