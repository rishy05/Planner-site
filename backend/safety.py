import requests
from bs4 import BeautifulSoup
from pprint import pprint
import re


def extract_number(input_string):
    pattern = r">([\d\.]+)<"
    match = re.search(pattern, input_string)
    if match:
        return str(match.group(1))
    else:
        return None


def get_crime(city):
    city = city[0].upper() + city[1:]
    print(city)
    response = requests.get(f"https://www.numbeo.com/crime/in/{city}")
    response_alt = requests.get(f"https://www.numbeo.com/crime/in/{city}-India")
    safety = None

    soup = BeautifulSoup(response.content, "html.parser")
    element = soup.find("td", {"class": "indexValueTd", "style": "text-align: right"})
    flag = None
    if element is not None:
        flag = element
    else:
        soup = BeautifulSoup(response_alt.content, "html.parser")
        element = soup.find(
            "td", {"class": "indexValueTd", "style": "text-align: right"}
        )
        flag = element

    # soup = BeautifulSoup(response_alt.content, "html.parser")

    if flag:
        try:
            safety = extract_number(str(flag))
            return safety
        except:
            return None
    else:
        return None
