import requests
import pandas as pd



def get_country(city):

    url = "https://countriesnow.space/api/v0.1/countries/population/cities"
    data = {"city": city}

    response = requests.post(url, json=data)
    return response.json()


def get_city_crime(city):
    df = pd.read_csv("crime_data\city_crime.csv")

    if city in df["City"].to_list():
        safety_index = df.loc[df["City"] == city.lower(), "Safety Index"].values[0]

        return f"{city}: {safety_index}"
    else:
        s = "Not available"
        country = get_country(city)
        safety_index_country = df_country.loc[
            df_country["country"] == city, "safety"
        ].values[0]
        if safety_index_country != "":
            s = safety_index
        return f"{country}: {s}"


print(get_country("mohali"))
