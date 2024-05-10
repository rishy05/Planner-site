from googleapiclient.discovery import build
import os
from dotenv import load_dotenv
import random


load_dotenv()
API_KEY = os.getenv("API_GOOGLE")
SEARCH_ENGINE_ID = os.getenv("GOOGLE_ENGINE")

service = build("customsearch", "v1", developerKey=API_KEY)


def get_image(q, n):

    img_1 = []
    if len(q.split(", ")) <= n:
        qq == q.split(", ")
    else:
        qq = random.sample(q.split(", "), k=n)
    print("Printing qq")
    print(qq)
    for query in qq:
        start = 1
        num = 1
        response = (
            service.cse()
            .list(
                q=query, cx=SEARCH_ENGINE_ID, searchType="image", start=start, num=num
            )
            .execute()
        )

        if "items" in response:
            for item in response["items"]:
                if "link" in item:
                    img_1.append(item["link"])
        else:
            print("No results found.")
    if len(img_1) != 0:
        return img_1
    else:
        return [None]


# print(get_image(["taj mahal", "marina beach", "great barrier reef"], 2))
