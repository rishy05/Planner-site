from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import os
import shutil
import json
from plan import get_plan, modify
from image_search import get_image
from search import get_searchh
from safety import get_crime
from pprint import pprint
from geo import get_coor
from plan import summarize

app = Flask(__name__)

cors = CORS(app)
import os

# Specify the folder path
folder_path = "data"


def delete_folder_contents(folder_path):
    # Check if the folder exists
    if os.path.exists(folder_path):
        # Iterate over each item in the folder
        for item in os.listdir(folder_path):
            # Create the full path to the item
            item_path = os.path.join(folder_path, item)
            # Check if it's a file and delete it
            if os.path.isfile(item_path):
                os.unlink(item_path)
                print("Deleted file:", item_path)
            # If it's a directory, delete it recursively
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)
                print("Deleted directory:", item_path)
    else:
        print("Folder does not exist:", folder_path)


# Check if the folder exists
if not os.path.exists(folder_path):
    # If it doesn't exist, create the folder
    os.makedirs(folder_path)
    print("Folder created:", folder_path)
else:
    # If it exists, print a message indicating it
    print("Folder already exists:", folder_path)


# T add <Origin city> <Destination city> <Number of People> <Number of days>
@app.route("/")
def hello():
    return "Hello there. Hope you are doing good!!"


@app.route("/plan", methods=["POST"])
def plan_gen():
    print("Original plan")

    origin = request.form.get("origin")
    desti = request.form.get("desti")
    vibe = request.form.get("vibe")
    num_days = request.form.get("num_days")

    result = get_plan(origin, desti, vibe, num_days)

    print(result)

    return jsonify({"message": f"{result[0]}", "places": result[1]})


@app.route("/places", methods=["POST"])
def get_places_img():
    place_names = request.form.get("place")
    print(place_names)
    l = get_image(place_names.split(","))

    return jsonify({"images": l})


@app.route("/search", methods=["POST"])
def get_search():
    city = request.form.get("city")
    c_l = get_searchh(city)

    return jsonify({"linkss": c_l})


@app.route("/safety", methods=["POST"])
def get_safety():
    cityy = request.form.get("city")
    print(cityy)
    ressss = get_crime(cityy)
    print(ressss)
    return jsonify({"Response": ressss})


@app.route("/modify", methods=["POST"])
def get_modify():
    print("Entering modification")
    ori_ite = request.form.get("ori_ite")
    sugg = request.form.get("sugg")

    mod = modify(ori_ite, sugg)

    return jsonify({"modified_ite": mod[0], "modified_places": mod[1]})


@app.route("/all", methods=["POST"])
def get_all():
    # place_names = request.form.get("place")
    data = request.get_json()
    origin = data.get("origin")
    desti = data.get("desti")
    vibe = data.get("vibe")
    num_days = data.get("num_days")
    namee = data.get("name")

    print(origin, desti, vibe, num_days)
    plan = get_plan(origin, desti, vibe, num_days)
    desc = plan[0]
    places = plan[1]
    iti = {}
    d = desc.split("Day ")
    print(d)
    for i in d:
        for j in i:
            if j == ".":
                i.replace(j, "\n")
    sum_list = summarize(d[1:])
    coo = get_coor(desti)

    iti["desc"] = d[1:]
    iti["Places"] = places
    img = get_image(places, int(num_days))
    iti["image_links"] = img
    iti["num"] = num_days
    iti["desti"] = desti
    iti["origin"] = origin
    iti["coor"] = coo
    iti["safety"] = get_crime(desti)
    iti["summarize"] = sum_list
    file_name = f"""{len(os.listdir("data")) + 1}.json"""
    file_path = os.path.join("data", file_name)
    with open(file_path, "w") as json_file:
        json.dump(iti, json_file, indent=4)
    return jsonify(iti)


@app.route("/info", methods=["POST"])
def get_infoo():
    ll = request.get_json()

    f = f"data/{list(os.listdir('data'))[-1]}"
    with open(f, "r") as file:
        d = json.load(file)

    delete_folder_contents("data")
    return jsonify(d)
