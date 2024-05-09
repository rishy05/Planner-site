import os
from discord.ext import commands
import discord
import requests
import shutil
from dotenv import load_dotenv
import json

load_dotenv()
from pprint import pprint


token = os.getenv("TOKEN")

intents = discord.Intents.all()
intents.members = True

client = commands.Bot(command_prefix="T ", intents=intents)


def check(message):
    return message.author != client.user


@client.event
async def on_ready():
    print("ready")


@client.command()
async def helpp(ctx):

    await ctx.channel.send(
        "Use the command 'T add <Origin city> <Destination city> <Number of People> <Number of days>' enter theneeded values without the symbol '<>'"
    )


# T add <Origin city> <Destination city> <Number of People> <Number of days>
# http://127.0.0.1:8080
@client.command()
async def add(ctx):
    travel = {}
    await ctx.message.channel.send("Hold on our AI is generating an itineray for you.")
    use = ctx.message.content.split()
    print(use)
    """    origin = request.form.get("origin")
    desti = request.form.get("desti")
    num_peo = request.form.get("num_peo")
    num_days = request.form.get("num_days")"""
    info = {"origin": use[2], "desti": use[3], "num_peo": use[4], "num_days": use[5]}

    res = requests.post("http://127.0.0.1:8080/plan", data=info)
    msgg = res.json()["message"]

    await ctx.channel.send(msgg)

    await ctx.channel.send(
        f"\n\nIf you are satisfied with this intenerary reply to this message 'Yes'\n. If not satisfied then describe the changes you want\n1. Entire itinerary\n2. Specific day changes."
    )
    repl = await client.wait_for("message", check=check, timeout=60.0)
    print(repl.content)
    if repl.content == "yes":
        print("Yessssssssssssssss")

    if repl.content != "yes":
        da = {"ori_ite": msgg, "sugg": repl.content}
        rr = requests.post("http://127.0.0.1:8080/modify", data=da)
        msgg = rr.json()["modified_ite"]
        pl = rr.json()["modified_places"]
        await ctx.channel.send(msgg)
    pl = {"place": res.json()["places"]}
    pprint(res.json()["places"])
    imgg = requests.post("http://127.0.0.1:8080/places", data=pl)
    i_l = imgg.json()["images"]
    for linkk in i_l:
        await ctx.channel.send(linkk)
    d_s = {"city": use[3]}
    searchh = requests.post("http://127.0.0.1:8080/search", data=d_s)
    ss = searchh.json()["linkss"]
    await ctx.channel.send("Here are some additional links for your reference.")
    for ii in ss:
        await ctx.channel.send(ii)
    ff = open(f"task.json", "w")

    for i in msgg.split("Day "):
        if i != "":
            travel[f"Day {i[:2]}"] = i[2:]
    safe_d = {"city": use[3]}
    safety = requests.post("http://127.0.0.1:8080/safety", data=safe_d)

    sas_rat = safety.json()["Response"]
    await ctx.channel.send(sas_rat)
    travel["places_mentioned"] = pl
    travel["images"] = i_l
    travel["additional_links"] = ss
    travel["Safety_Rating"] = sas_rat

    ff.write(json.dumps(travel))
    ff.close()

    await ctx.channel.send(file=discord.File("task.json"))


client.run(token)
