from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import os
import shutil
import json
from plan import get_plan, modify
from image_search import get_image
from search import get_searchh
from safety import get_crime

app = Flask(__name__)

cors = CORS(app)


# T add <Origin city> <Destination city> <Number of People> <Number of days>
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
    print(origin, desti, vibe, num_days)
    plan = get_plan(origin, desti, vibe, num_days)
    desc = plan[0]
    places = plan[1]
    iti = {}
    d = desc.split("Day ")

    for i in d:
        if i != "":
            iti[f"Day {i[:2]}"] = i[2:]
    iti["Places"] = places
    img = get_image(places)

    iti["image_links"] = img
    return jsonify(iti)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
