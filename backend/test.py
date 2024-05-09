import requests
from bs4 import BeautifulSoup
from pprint import pprint

# URL of the website
url = "https://www.numbeo.com/crime/in/Chennai"

# Send a GET request to the URL
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")

# Find the specific element
element = soup.find("td", {"class": "indexValueTd", "style": "text-align: right"})

if element:
    print(element)
else:
    print("Element not found")
