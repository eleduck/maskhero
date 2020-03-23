#!/usr/bin/python

import os
import json
import logging

def collect_requirements(country):
  #logging.info("Collecting %s" % country)

  res = []
  for filename in os.listdir(country):
    if filename.endswith(".geo.json"):
      #logging.info(" - %s", filename)
      with open(os.path.join(country, filename), 'r') as load_file:
        load_dict = json.load(load_file)
        if 'features' not in load_dict or len(load_dict) < 1:
          return
        res.append({country: load_dict['features']})

  return res

def update_country_index(country, requirements):
  res = {}
  country_request = {
    'applicants': 0,
    'beneficiaries': 0,
    'masks_requested': 0,
    'masks_delivered': 0
  }

  for request in requirements:
    if country in request.keys():
      for item in request[country]:
        country_request['applicants'] += 1
        country_request['beneficiaries'] += item['properties']['需要援助人数']
        country_request['masks_requested'] += item['properties']['需求数量']
        country_request['masks_delivered'] += item['properties']['收到数量']
  res[country] = country_request
  return res

def append_world_index(requirements):
  if not requirements or requirements == {}:
    return
  for k, v in requirements.items():
    world_summary['applicants'] += v['applicants']
    world_summary['beneficiaries'] += v['beneficiaries']
    world_summary['masks_requested'] += v['masks_requested']
    world_summary['masks_delivered'] += v['masks_delivered']

def update_readme(country, summary):
  if not summary or country not in summary and country != 'World':
    return
  if country == 'World':
    item = summary
  else:
    item = summary[country]
  base_str = '|{country}|{applicants}|{beneficiaries}|{masks_requested}|{masks_delivered}|\n'

  readme_str['readme'] += base_str.format(country=country, applicants=item['applicants'], beneficiaries=item['beneficiaries'], masks_requested=item['masks_requested'], masks_delivered=item['masks_delivered'])
  os.system("cp Scripts/README_tpl.md README.md")
  with open('README.md', 'a+') as load_file:
    load_file.write(readme_str['readme'])


if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)

  countries = ["Canada", "American"]

  world_summary = {
    "name": "World",
    "applicants": 0,
    "beneficiaries": 0,
    "masks_requested": 0,
    "masks_delivered": 0
  }
  world_requirments = []

  readme_str = {'readme': ''}

  for country in countries:
    country_requirements = collect_requirements(country)
    logging.info(country_requirements)
    country_summary = update_country_index(country, country_requirements)
    #logging.info(country_summary)
    append_world_index((country_summary))
    #logging.info(world_summary)
    world_requirments.extend(country_requirements)
    #logging.info(world_requirments)
    update_readme(country, country_summary)
  update_readme('World', world_summary)
  #logging.info(readme_str['readme'])
