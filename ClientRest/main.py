import requests
import pprint

# Get todos los datos
response = requests.get("http://localhost:3000/datos")
pprint.pprint(response.json())

# find
response = requests.get("http://localhost:3000/datos/find/61b0cd51dd7414b5b301dd57")
pprint.pprint(response.json())

# Post add
response = requests.post('http://localhost:3000/datos/add', json = {"hola":"adios", "numero":4})
pprint.pprint(response.json())

# Post edit
response = requests.post('http://localhost:3000/datos/edit/61b0e489c5a28036bc1ae7a5', json = {"hola":"pepe", "numero2":3})
pprint.pprint(response.json())

input('Presiona ENTER para salir.')