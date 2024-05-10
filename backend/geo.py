import requests
import os
from dotenv import load_dotenv


load_dotenv()

key = os.getenv("API_GEOCODING")


def get_coor(city):
    try:
        api_url = (
            "https://api.api-ninjas.com/v1/geocoding?city={}&country=India".format(city)
        )
        response = requests.get(api_url + city, headers={"X-Api-Key": key})
        if response.status_code == requests.codes.ok:
            print([response.json()[0]["latitude"], response.json()[0]["longitude"]])
            return [response.json()[0]["latitude"], response.json()[0]["longitude"]]
        else:
            print("Error:", response.status_code, response.text)
    except:
        return [9.285877, 64.296427]


# print(get_coor("madurai"))
