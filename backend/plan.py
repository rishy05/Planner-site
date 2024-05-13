import os

from groq import Groq

from dotenv import load_dotenv

from time import sleep

from pprint import pprint

load_dotenv()

mod = "mixtral-8x7b-32768"


gr_key = os.getenv("GROQ_API_KEY")

client = Groq(
    api_key=gr_key,
)


def get_plan(origin, desti, vibe, num_days):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""You are my itinerary planner. I will give you the details and give me the best possible itinerary for each day. Here are the details 1. Strating city: {origin} 2. Destination: {desti} 3. Number of Days: {num_days}, 4. Vibe of the trip: {vibe} Make sure it's less than 2000 characters in length (very important). Make it very simple. This is all the information you need to create an itinerary. Should be in this general formatt(Day 1: Paris

Morning: Visit Eiffel Tower and take a river cruise on the Seine
Afternoon: Explore the Louvre Museum
Evening: Dine at Montmartre and watch a cabaret show at Moulin Rouge

Day 2: Paris to Moscow

Morning: Take a flight from Charles de Gaulle Airport to Moscow
Afternoon: Check-in at your hotel and rest
Evening: Visit Red Square and St. Basil's Cathedral

Day 3: Moscow

Morning: Explore the Kremlin and its cathedrals
Afternoon: Visit the State Historical Museum
Evening: Watch a ballet performance at the Bolshoi Theatre

Day 4: Moscow

Morning: Take a stroll in Gorky Park
Afternoon: Visit the Tretyakov Gallery
Evening: Have a traditional Russian dinner and prepare for departure). this is just an example of the format. Make it very very detailed and provide as much as information as possible. minimum 5000 characters.""",
            }
        ],
        model=mod,
    )
    msgg = chat_completion.choices[0].message.content
    sleep(2)
    chat_completion_2 = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Return {int(num_days)+4} number of prominent monument or place name from this text, except for city names from this text and return it in this format in python string separated by commas format. Just the string nothing else, no need for a variable name. no need to add the python format. here is the text {msgg}. Here is an example of a good itinerary ",
            }
        ],
        model=mod,
    )
    pl = chat_completion_2.choices[0].message.content

    return [msgg, pl]


def modify(ini_ite, speci, sugg):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""This is the itinerary you produced {ini_ite} and the user wants changes at this part {speci} and the suggestion is {sugg}. Just return the changed part and not the entire thing. No need for any broiler plate texts before the response just the changed plan at that specific place.""",
            }
        ],
        model=mod,
    )
    msgg = chat_completion.choices[0].message.content
    sleep(2)
    chat_completion_2 = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""I will give you a text. Summarize it to 1 lines. Here is the text {msgg}. just return the summarized text alone no need for any other broiler plat text.""",
            }
        ],
        model=mod,
    )
    pl = chat_completion_2.choices[0].message.content
    print(msgg)
    print(pl)
    return [msgg, pl]


def summarize(msgg):
    sum_txt = []
    for i in msgg:
        if i != "":
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": f"""I will give you a text. Summarize it to 1 lines. Here is the text {i}. just return the summarized text alone no need for any other broiler plat text.""",
                    }
                ],
                model=mod,
            )
            summ = chat_completion.choices[0].message.content
            sum_txt.append(summ)

    pprint(sum_txt)
    return sum_txt


def places(txt):
    chat_completion_2 = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Return One prominent monument or place name from this text, except for city names from this text and return it in this format in python string separated by commas format. Just the string nothing else, no need for a variable name. no need to add the python format. here is the text {txt}. Remember just one prominent place and nothing more.",
            }
        ],
        model=mod,
    )
    pl = chat_completion_2.choices[0].message.content

    return pl


# pprint(get_plan("chennai", "madurai", "Cultural", "3"))
