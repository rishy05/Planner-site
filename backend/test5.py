import os
import json

f = os.listdir("data")[-1]
# Open the JSON file
with open(f"data/{f}", "r") as file:
    # Load the JSON data
    data = json.load(file)
print(data)
