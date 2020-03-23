#!/usr/bin/python

import os
import json
import logging
import re


def collect_requirements(country):
    logging.info("Collecting %s" % country)

    requirements = []
    for filename in os.listdir(country):
        if filename.endswith(".geo.json"):
            logging.info(" - %s", filename)
            f = open(f"{country}/{filename}", "r")
            data = json.loads(f.read())
            requirements += data["features"]

    return requirements


def update_country_index(country, requirements):
    logging.info("Updating index file of %s" % country)
    with open(f"{country}/index.geojson", "w") as f:
        f.write(geojson_file_template(requirements))
    return {
        "name": country,
        "applicants": len(
            set(map(lambda r: r["properties"]["申请人"], requirements))
        ),
        "beneficiaries": sum(
            map(lambda r: r["properties"]["需要援助人数"], requirements)
        ),
        "masks_requested": sum(
            map(lambda r: r["properties"]["需求数量"], requirements)
        ),
        "masks_delivered": sum(
            map(lambda r: r["properties"]["收到数量"], requirements)
        ),
    }


def update_world_index(requirements):
    return update_country_index("World", requirements)


def geojson_file_template(requirements):
    return json.dumps({"type": "FeatureCollection", "features": requirements})


def update_total_summary_in_readme(summary):
    logging.info("Updating README.md file")
    links = "\n".join(
        list(
            map(
                lambda s: f"- [{s['name']}]({s['name']}/index.geojson)",
                summary,
            )
        )
    )

    tds = "\n".join(
        list(
            map(
                lambda s: f"<tr><td>{s['name']}</td><td>{s['applicants']}</td><td>{s['beneficiaries']}</td><td>{s['masks_delivered']}</td><td>{s['masks_requested']}</td></tr>",
                summary,
            )
        )
    )
    table = f"""
<table>
<tr><th>地区</th><th>申请人数</th><th>援助人数</th><th>需求口罩总数</th><th>收到口罩总数</th></tr>
{tds}
</table>
    """
    with open("README.md", "r+") as f:
        content = f.read()
        new_content = re.sub(
            "## 各国同胞请求.*?##",
            f"## 各国同胞请求\n\n{links}\n\n##",
            content,
            flags=re.S,
        )
        new_content = re.sub(
            "## 各地区支援情况和请求统计.*?##",
            f"## 各地区支援情况和请求统计\n\n{table}\n\n##",
            new_content,
            flags=re.S,
        )
        f.seek(0)
        f.write(new_content)
        f.truncate()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    countries = ["Canada", "Singapore"]

    world_requirements = []
    total_summary = []
    for country in countries:
        country_requirements = collect_requirements(country)
        country_summary = update_country_index(country, country_requirements)
        total_summary.append(country_summary)
        world_requirements.extend(country_requirements)

    world_summary = update_world_index(world_requirements)
    total_summary.append(world_summary)
    update_total_summary_in_readme(total_summary)
