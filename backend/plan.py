import os

from groq import Groq

from dotenv import load_dotenv

from time import sleep

load_dotenv()

mod = "llama3-70b-8192"


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
Evening: Have a traditional Russian dinner and prepare for departure). this is just an example of the formatt.""",
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
                "content": f"Return one prominent monument or place name from each day, remember just one from each day for example if there are 4 days in the entire itinerary then you should only return 1 prominent place so in total you will return 4 places for 4 days, except for city names from this text and return it in this format in python string separated by commas format. Just the string nothing else, no need for a variable name. no need to add the python format. here is the text {msgg}. Here is an example of a good itinerary ",
            }
        ],
        model=mod,
    )
    pl = chat_completion_2.choices[0].message.content
    print(msgg)
    return [msgg, pl]


def modify(ini_ite, sugg):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""You have already generated an amazing Itinerary, but the user wants some changes. Here is the original itinerary {ini_ite}. Here are the changes user wants {sugg}. Just send the modified itinerary no need for any other texts just the itinerary. If the change is specific to some specific day, change only that day and not disturb other days and combine it with the original. This how it should look in the end an example (Day 1: Paris

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
Evening: Have a traditional Russian dinner and prepare for departure). this is just an example of the formatt.). This is just an example.""",
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
                "content": f"""Return one prominent monument or place name from each day, remember just one from each day for example if there are 4 days in the entire itinerary then you should only return 1 prominent place so in total you will return 4 places for 4 days, except for city names from this text and return it in this format in python string separated by commas format. Just the string nothing else, no need for a variable name. no need to add the python format. here is the text {msgg}""",
            }
        ],
        model=mod,
    )
    pl = chat_completion_2.choices[0].message.content

    return [msgg, pl]